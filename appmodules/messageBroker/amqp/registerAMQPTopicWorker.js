const lodash = require('lodash');
const async = require('async');
const logger = require('../../../applogger');
const amqpMessageBroker = require('./messageBrokerAMQP');

function consumeCommandMessage(msgBuffer, eventsProcessor, done) {
  logger.debug(`Got new message with topic ${msgBuffer.fields.routingKey} with data as ${msgBuffer.content.toString()}`);

  const parsedMessageObj = JSON.parse(msgBuffer.content.toString());
  eventsProcessor.processNewTopicMessage(parsedMessageObj, (err, result) => {
    if (err) {
      logger.error(`Processing of message ended in error: ${JSON.stringify(err)}`);
    }
    logger.debug(`Processing of message ended successfully..!`);
    done(err, result);
  });
}

function registerWorkerToTopicQueue(eventsProcessor, exchange, queueNamePrefix, topicPattern, channel, done) {
  channel.assertExchange(exchange, 'topic', { durable: false });
  channel.assertQueue(`TQ-${queueNamePrefix}-${(lodash.camelCase(topicPattern)) ? lodash.camelCase(topicPattern) : 'ALL'}`, { durable: true },
    (ampQErr, result) => {
      if (ampQErr) {
        logger.error('Error in wiring with queue ERROR::', ampQErr);
        done(ampQErr);
      } else {
        channel.bindQueue(result.queue, exchange, topicPattern);

        // channel.prefetch(1);

        channel.consume(result.queue, (msg) => {
          consumeCommandMessage(msg, eventsProcessor,
            (porcErr, procResult) => {
              if (porcErr) {
                logger.error('Error in processing message ', porcErr);
                done(porcErr);
              } else {
                logger.debug('Done consuming with result ', procResult);
                channel.ack(msg);
              }
            });
        }); // end of channel.consume
      }
    });
}

function registerAMQPTopicWorker(eventsProcessor, AMQP_URL, exchange, queueNamePrefix, topicPattern, done) {
  async.waterfall([
    async.apply(amqpMessageBroker.getAMQPChannel, AMQP_URL),
    async.apply(registerWorkerToTopicQueue, eventsProcessor, exchange, queueNamePrefix, topicPattern),
  ], (err, result) => {
    if (err) {
      logger.error(`Failed in registering AMQP Topic worker for ${exchange}::${topicPattern} ERROR::${err}`);
    } else {
      logger.debug(`Successfully done registering AMQP Topic worker for ${exchange}::${topicPattern}, RESULT::${result}`);
    }
    if (done) done(err, result);
  });
}

module.exports = registerAMQPTopicWorker;
