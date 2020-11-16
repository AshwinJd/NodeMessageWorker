const registerAMQPTopicWorker = require('./appmodules/messageBroker/amqp/registerAMQPTopicWorker');
const { workflowProcessor } = require("./appmodules/workflowProcessor");
const config = require('./config');
const logger = require('./applogger');

function registerWorkers() {
  logger.debug("Registering workflow processors..!");
  console.log("workflowProcessor", workflowProcessor);
  registerAMQPTopicWorker(workflowProcessor,
    config.AMQP.AMQP_URL,
    config.AMQP.TOPIC_EXCHANGE,
    config.AMQP.WORKFLOW_CATEGORY.QUEUE_PREFIX,
    config.EVENT_NAMES.NEW_EVENT_PROCESS_LOGGED,
    (err) => {
      if (err) {
        logger.fatal(`Error in workflow processor, ERROR::${JSON.stringify(err)} aborting...!`);
        process.exit(-1);
      } else {
        logger.info("Workflow process registered..!");
      }
    });
}


module.exports = registerWorkers;
