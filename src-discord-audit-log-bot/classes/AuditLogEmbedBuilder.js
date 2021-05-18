const { clientMap } = require("../config");

module.exports = class AuditLogEmbedBuilder {
  constructor() {
    this.color = null;
    this.user = null;
    this.channel = null;
    this.body = null;
    this.link = null;
    this.images = null;
    this.footer = null;
    this.timestamp = Date.now();
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

  setImages(images) {
    this.images = images;
    return this;
  }

  setFooter(footer) {
    this.footer = footer;
    return this;
  }

  _getColor() {
    return this.color;
  }

  _getDescription(index) {
    if (!this.user) {
      return null;
    }

    const title = [`${this.user} (${this.user.tag})`, this.channel]
      .filter(Boolean)
      .join(" | ");
    const link = this.link ? `[[link]](${this.link})` : "";

    return (index === 0
      ? `${title}\n${this.body} ${link}`
      : `${title}\n${link}`
    ).trim();
  }

  _getImages() {
    if (!this.images || !this.images.length) {
      return [{}];
    }

    return this.images.map((url) => ({ image: { url } }));
  }

  _getFooter(index, length) {
    if (!this.footer) {
      return null;
    }

    const pages = length === 1 ? "" : `${index + 1} of ${length}`;
    const clients = Object.keys(
      (this.user && this.user.presence.clientStatus) || {}
    )
      .map((client) => clientMap[client])
      .join("");

    return {
      icon_url: this.user && this.user.displayAvatarURL(),
      text: [this.footer, pages, clients].filter(Boolean).join(" | "),
    };
  }

  _getTimestamp() {
    return this.timestamp;
  }

  build() {
    return this._getImages().map((image, index, images) => ({
      color: this._getColor(),
      description: this._getDescription(index),
      ...image,
      footer: this._getFooter(index, images.length),
      timestamp: this._getTimestamp(),
    }));
  }
};
