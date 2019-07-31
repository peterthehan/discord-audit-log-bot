const getListeningActivity = require('../util/getListeningActivity');
const getStreamingActivity = require('../util/getStreamingActivity');

module.exports = class ActivityFactory {
  constructor(state, activity) {
    this.state = state;
    this.activity = activity;
  }

  getActivity(activityType) {
    switch (activityType) {
      case 'LISTENING':
        return getListeningActivity(this.state, this.activity);
      case 'STREAMING':
        return getStreamingActivity(this.state, this.activity);
    }

    return null;
  }
};
