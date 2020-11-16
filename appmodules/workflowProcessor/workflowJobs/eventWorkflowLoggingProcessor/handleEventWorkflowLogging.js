const logger = require("../../../../applogger");

function handleEventWorkflowLogging(eventPayload, done) {
  logger.debug("Data inside workflow job service:: ", eventPayload);
  done(null, eventPayload);
}

module.exports = {
  handleEventWorkflowLogging,
};
