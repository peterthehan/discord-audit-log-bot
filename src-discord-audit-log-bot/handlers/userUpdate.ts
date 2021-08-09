import { Guild, MessageEmbed, User } from "discord.js";
import configs from "../config.json";
import { getConfig } from "../util/getConfig";
import { getTitle } from "../util/getTitle";
import { sendWebhookMessage } from "../util/sendWebhookMessage";

module.exports = async (oldUser: User, newUser: User): Promise<void> => {
  if (oldUser.bot || newUser.bot || oldUser.equals(newUser)) {
    return;
  }

  const oldAvatarUrl = oldUser.displayAvatarURL();
  const newAvatarUrl = newUser.displayAvatarURL();

  const hasNewTag = oldUser.tag !== newUser.tag;
  const hasNewDisplayAvatarUrl = oldAvatarUrl !== newAvatarUrl;

  configs
    .map((config) => newUser.client.guilds.resolve(config.guildId))
    .filter((guild) => guild?.members.resolve(newUser.id))
    .forEach((guild) => {
      guild = guild as Guild;
      const config = getConfig(guild);
      if (!config) {
        return;
      }

      const embeds = [];

      if (hasNewTag) {
        embeds.push(
          new MessageEmbed()
            .setColor(config.neutralColor)
            .setDescription(
              `${getTitle(newUser)}\n${oldUser.tag} ➡️ ${newUser.tag}`
            )
            .setFooter("Changed tag", newAvatarUrl)
            .setTimestamp()
        );
      }

      if (hasNewDisplayAvatarUrl) {
        embeds.push(
          ...[oldAvatarUrl, newAvatarUrl].map((imageUrl, index) => {
            return index === 0
              ? new MessageEmbed()
                  .setColor(config.neutralColor)
                  .setDescription(`${getTitle(newUser)}\nOld ➡️ New`)
                  .setImage(imageUrl)
                  .setURL(newAvatarUrl)
                  .setFooter("Changed avatar", newAvatarUrl)
                  .setTimestamp()
              : new MessageEmbed().setImage(imageUrl).setURL(newAvatarUrl);
          })
        );
      }

      if (!embeds.length) {
        return;
      }

      sendWebhookMessage(guild, config, { embeds });
    });
};
