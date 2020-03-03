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
    if (state === 'JOIN') {
      this.elapsedTime = null;
      voiceCache[this.user.id] = Date.now();
      return;
    }

    if (this.user.id in voiceCache) {
      this.elapsedTime = new Time(
        voiceCache[this.user.id]
      ).getHumanizedElapsedTime();
      delete voiceCache[this.user.id];
    }

    if (state === 'CHANGE') {
      voiceCache[this.user.id] = Date.now();
    }
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
    }

    return builder;
  }
};
