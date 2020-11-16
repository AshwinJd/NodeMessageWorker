const config = require('./appconfig');

// Environment agnostic config can be added below
config.STATUS_MSG = {
  STATUS_400: {
    msg: 'Bad request.. Can you please try later or contact Admin !!',
  },
  INTERNAL_ERROR_500: {
    msg: 'Internal Error.. Sorry for any inconvenience. Can you please try later !! Thank you',
  },
};

config.EVENT_NAMES = {
  NEW_EVENT_PROCESS_LOGGED: 'SYS.EVENT_LOGGED.SUCCESS',
}

module.exports = config;
