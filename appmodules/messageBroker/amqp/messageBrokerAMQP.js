const async = require('async');
const amqp = require('amqplib/callback_api');
const logger = require('../../../applogger');

// Declaring at module level, as they are used as private variable at module instance level
let amqpConnection;
let amqpChannel;

function getAMQPConnection(AMQP_URL, done) {
  if (amqpConnection) {
    done(null, amqpConnection);
  } else {
    logger.debug('Creating new connection with ', AMQP_URL);
    amqp.connect(AMQP_URL, (err, newConnection) => {
      if (err) {
        amqpConnection = undefined;
        logger.error("Unable to obtain AMQP connection, ERROR::", err);
        done(err);
      } else {
        logger.debug('AMQP connected ..!');
        amqpConnection = newConnection;
        done(null, amqpConnection);
      }
    });
  }
} // end of getAMQPConnection

// This is a internal method, do not expose it outside the module
function createNewChannel(done) {
  if (!amqpConnection) {
    done(new Error('No connection to create channel..!'));
  }

  amqpConnection.createChannel(done);
} // end of createNewChannel

function getAMQPChannel(AMQP_URL, done) {
  if (amqpChannel) {
    done(null, amqpChannel);
  } else {
    async.series({
      conn: async.apply(getAMQPConnection, AMQP_URL),
      chnl: createNewChannel,
    }, (err, results) => {
      if (err) {
        logger.error('Error in obtaining AMQP channel, ERROR::', err);
        done(err);
      } else {
        amqpChannel = results.chnl; // take only the createNewChannel
        done(null, amqpChannel);
      }
    });
  }
} // end of getAMQPChannel

module.exports = {
  // getAMQPConnection,
  getAMQPChannel,
};
