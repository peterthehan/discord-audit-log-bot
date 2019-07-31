const AuditLogEmbedBuilder = require('./AuditLogEmbedBuilder');

module.exports = class VoiceFactory {
  constructor(user, oldChannel, newChannel, humanizedElapsedTimeText) {
    this.auditLogEmbedBuilder = new AuditLogEmbedBuilder().setUser(user);
    this.oldChannel = oldChannel;
    this.newChannel = newChannel;
    this.humanizedElapsedTimeText = humanizedElapsedTimeText;
  }

  createAuditLogEmbed(state) {
    switch (state) {
      case 'JOIN':
        return this.auditLogEmbedBuilder
          .setColor('positiveColor')
          .setBody(this.newChannel)
          .setFooter('Joined voice');
      case 'LEAVE':
        return this.auditLogEmbedBuilder
          .setColor('negativeColor')
          .setBody(this.oldChannel)
          .setFooter(`Left voice${this.humanizedElapsedTimeText}`);
      case 'CHANGE':
        return this.auditLogEmbedBuilder
          .setColor('neutralColor')
          .setBody(`${this.oldChannel} ➡️ ${this.newChannel}`)
          .setFooter(`Changed voice${this.humanizedElapsedTimeText}`);
    }

    return this.auditLogEmbedBuilder;
  }
};
