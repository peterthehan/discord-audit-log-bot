const { clientMap, colors } = require('../config');

module.exports = class AuditLogEmbedBuilder {
  constructor() {
    this.color = '';
    this.user = null;
    this.channel = null;
    this.body = '';
    this.link = '';
    this.image = '';
    this.footer = '';
  }

  setColor(color) {
    this.color = color;
    return this;
  }

  setUser(user) {
    this.user = user;
    return this;
  }

  setChannel(channel) {
    this.channel = channel;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  setLink(link) {
    this.link = link;
    return this;
  }

  setImage(image) {
    this.image = image;
    return this;
  }

  setFooter(footer) {
    this.footer = footer;
    return this;
  }

  _getColor() {
    return this.color in colors ? colors[this.color] : null;
  }

  _getTitle() {
    if (!this.user) return '';
    const user = `${this.user} (${this.user.tag})`;
    return !this.channel ? user : `${user} | ${this.channel}`;
  }

  _getBody() {
    return this.body;
  }

  _getLink() {
    return !this.link ? '' : `[[link]](${this.link})`;
  }

  _getDescription() {
    const description = `${this._getTitle()}\n${this._getBody()} ${this._getLink()}`.trim();
    return !description ? null : description;
  }

  _getImage() {
    return !this.image ? null : { url: this.image };
  }

  _getDisplayAvatarUrl() {
    return !this.user ? null : { icon_url: this.user.displayAvatarURL() };
  }

  _getClients() {
    return (this.user && this.user.presence && this.user.presence.clientStatus
      ? Object.keys(this.user.presence.clientStatus)
      : []
    )
      .map(client => clientMap[client])
      .join('');
  }

  _getFooterText() {
    if (!this.footer) return null;
    const clients = this._getClients();
    return { text: !clients ? this.footer : `${this.footer} | ${clients}` };
  }

  _getFooter() {
    const icon_url = this._getDisplayAvatarUrl();
    const text = this._getFooterText();
    return !icon_url && !text ? null : { ...icon_url, ...text };
  }

  build() {
    return {
      embed: {
        timestamp: Date.now(),
        color: this._getColor(),
        description: this._getDescription(),
        image: this._getImage(),
        footer: this._getFooter()
      }
    };
  }
};
