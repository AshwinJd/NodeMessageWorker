const async = require('async');
const logger = require('../../../applogger');
const amqpMessageBroker = require('./messageBrokerAMQP');

function publishMessageToTopicQueue(eventMessage, exchangeName, topicPattern, channel, done) {
  const bufferMessage = Buffer.from(JSON.stringify(eventMessage));
  channel.assertExchange(exchangeName, 'topic', { durable: false });
  channel.publish(exchangeName, topicPattern, bufferMessage);
  done(null, true);
}

function publishAMQPTopicExchange(eventsMessage, AMQP_URL, exchange, topicPattern, done) {
  async.waterfall([
    async.apply(amqpMessageBroker.getAMQPChannel, AMQP_URL),
    async.apply(publishMessageToTopicQueue, eventsMessage, exchange, topicPattern),
  ], (err, result) => {
    if (err) {
      logger.error(`Failed in publish message to AMQP Topic for ${exchange}::${topicPattern} ERROR::${err}`);
    } else {
      logger.debug(`Successfully done publish message to AMQP Topic for ${exchange}::${topicPattern}, RESULT::${result}`);
    }
    if (done) done(err, result);
  });
}

module.exports = publishAMQPTopicExchange;
