const {
  colors: { positive, neutral, negative }
} = require('../config');
const AuditLogEmbedBuilder = require('./AuditLogEmbedBuilder');
const Time = require('./Time');

const voiceCache = {};

module.exports = class VoiceFactory {
  constructor(user, oldChannel, newChannel) {
    this.user = user;
    this.oldChannel = oldChannel;
    this.newChannel = newChannel;
    this.elapsedTime = null;
  }

  _setElapsedTime(state) {
    const key = `${['START', 'STOP'].includes(state) ? 'streaming' : 'voice'}${
      this.user.id
    }`;

    if (['JOIN', 'START'].includes(state)) {
      this.elapsedTime = null;
      voiceCache[key] = Date.now();
      return;
    }

    if (key in voiceCache) {
      this.elapsedTime = new Time(voiceCache[key]).getHumanizedElapsedTime();
      delete voiceCache[key];
    }

    if (state === 'CHANGE') {
      voiceCache[key] = Date.now();
    }
  }

  _getActivityDescription(channel) {
    if (!this.user.presence.activities.length) {
      return channel;
    }

    const activity = this.user.presence.activities.find(
      activity => activity.type !== 'CUSTOM_STATUS'
    );
    if (!activity) {
      return channel;
    }

    const activityType = `${activity.type[0]}${activity.type
      .slice(1)
      .toLowerCase()}`;

    return `${channel}: ${activityType} ${activity.name}`;
  }

  createAuditLogEmbed(state) {
    this._setElapsedTime(state);
    const builder = new AuditLogEmbedBuilder().setUser(this.user);

    switch (state) {
      case 'JOIN':
        return builder
          .setColor(positive)
          .setBody(this.newChannel)
          .setFooter('Joined voice');
      case 'LEAVE':
        return builder
          .setColor(negative)
          .setBody(this.oldChannel)
          .setFooter(
            this.elapsedTime
              ? `Left voice after ${this.elapsedTime}`
              : 'Left voice'
          );
      case 'CHANGE':
        return builder
          .setColor(neutral)
          .setBody(`${this.oldChannel} ➡️ ${this.newChannel}`)
          .setFooter(
            this.elapsedTime
              ? `Changed voice after ${this.elapsedTime}`
              : 'Changed voice'
          );
      case 'START':
        return builder
          .setColor(positive)
          .setBody(this._getActivityDescription(this.newChannel))
          .setFooter('Started streaming');
      case 'STOP':
        return builder
          .setColor(negative)
          .setBody(this._getActivityDescription(this.oldChannel))
          .setFooter(
            this.elapsedTime
              ? `Stopped streaming after ${this.elapsedTime}`
              : 'Stopped streaming'
          );
    }

    return builder;
  }
};
