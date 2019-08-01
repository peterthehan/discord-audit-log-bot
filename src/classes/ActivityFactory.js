const getListeningActivity = require('../util/getListeningActivity');
const getStreamingActivity = require('../util/getStreamingActivity');

module.exports = class ActivityFactory {
  constructor(activityState) {
    this.state = activityState.state;
    this.activity = activityState.activity;
  }

  createAuditLogEmbed(type) {
    switch (type) {
      case 'LISTENING':
        return getListeningActivity(this.state, this.activity);
      case 'STREAMING':
        return getStreamingActivity(this.state, this.activity);
    }

    return null;
  }
};
