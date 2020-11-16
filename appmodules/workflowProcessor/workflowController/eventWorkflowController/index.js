const logger = require("../../../../applogger");
const handleWorkflowJob = require("../../workflowJobs/eventWorkflowLoggingProcessor/handleEventWorkflowLogging");


function processNewTopicMessage(eventMessage, done) {
  try {
    logger.debug("Recieved an event", eventMessage);
    handleWorkflowJob.handleEventWorkflowLogging(eventMessage, done);
  } catch (error) {
    done(null, "Failed with error");
  }
}

module.exports = {
  processNewTopicMessage,
};
