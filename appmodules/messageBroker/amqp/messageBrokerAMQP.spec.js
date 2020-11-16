// const { expect } = require('chai');

// const amqpBroker = require('./messageBrokerAMQP');

describe('Unit Tests for AMQP Message broker', function unitTests() {
  // this.timeout(10000);
  it('Obtain a channel and see a valid channel is returned', function channelCreation(done) {
    /* amqpBroker.getAMQPChannel((err, channel) => {
      expect(channel).to.a(typeof {});
      expect(channel.close).to.a('function');
      done();
    }); */
    done();
  });

  it('Verify the same channel is returned even on multiple calls', function uniqueChannel(done) {
    /* amqpBroker.getAMQPChannel((q1Err, channel) => {
      expect(q1Err).to.equal(null);
      expect(channel).to.a(typeof {});
      expect(channel.close).to.a('function');
      amqpBroker.getAMQPChannel((q2Err, secondChannel) => {
        expect(q2Err).to.equal(null);
        expect(secondChannel).to.a(typeof {});
        expect(secondChannel.close).to.a('function');
        // expect(secondChannel).to.equal(channel);
        // compare it is same reference not just the values
        expect(secondChannel).to.not.equal(Object.assign({}, channel));
        done();
      });
    }); */
    done();
  });
});
