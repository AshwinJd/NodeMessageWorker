const config = {
	AMQP: {
		AMQP_URL: (process.env.AMQP_URL || 'amqp://guest:guest@localhost'),
		TOPIC_EXCHANGE: "sampleexchange",
		WORKFLOW_CATEGORY: {
			QUEUE_PREFIX: "TQ_event"
		}
	}
}

module.exports = config;
