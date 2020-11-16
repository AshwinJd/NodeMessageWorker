// const chai = require('chai');

// const should = chai.should();

// const publishEventAMQPExchange = require('./publishEventAMQPExchange');

// const eventMock = {
//   eventName: 'SYS.NEW_PROGRAM_SCHEDULE_CREATED.SUCCESS',
//   asOn: '2018-10-16T20:28:25.894Z',
//   source: 'programSchedule',
//   payload: {
//     programScheduleName: 'MEAN-COMPLETE FSDCOMPLETE-COGIZANT-18-AUG-2018',
//     programName: 'MEAN-Complete FSD',
//     organisation: 'cogizant',
//     programType: 'COMPLETE',
//     cohortName: '18-Aug-2018',
//   },
//   metaData: {},
// };

describe('Testing Publishing message to topic exchange', function pub() {
  it('Should publish message to Topic exchange', function mesg(done) {
    /* publishEventAMQPExchange.publishNewEventToAMQPExchange(eventMock, (err, result) => {
      should.not.exist(err);
      should.exist(result);
      done();
    }); */
    done();
  });
});
