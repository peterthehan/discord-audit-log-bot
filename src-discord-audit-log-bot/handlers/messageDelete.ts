import { Message, MessageEmbed } from "discord.js";
import { getConfig } from "../util/getConfig";
import { getElapsedTimeInSeconds } from "../util/getElapsedTimeInSeconds";
import { getImageUrls } from "../util/getImageUrls";
import { getTitle } from "../util/getTitle";
import { humanizeChannelType } from "../util/humanizeChannelType";
import { humanizeElapsedTime } from "../util/humanizeElapsedTime";
import { sendWebhookMessage } from "../util/sendWebhookMessage";

module.exports = async (
  message: Message,
  isBulkDelete = false
): Promise<void> => {
  if (message.author.bot || !message.guild) {
    return;
  }

  const config = getConfig(message.guild);
  if (!config || config.ignoreChannelIds.has(message.channelId)) {
    return;
  }

  const elapsedTime = getElapsedTimeInSeconds(message.createdAt);
  if (elapsedTime < config.deleteTimeThreshold) {
    return;
  }

  const embeds = getImageUrls(message).map((imageUrl, index) => {
    return index === 0
      ? new MessageEmbed()
          .setColor(config.negativeColor)
          .setDescription(
            [
              getTitle(message.author, message.channel),
              message.content,
              message.stickers.map((sticker) => `<${sticker.name}>`).join(" "),
            ]
              .filter(Boolean)
              .join("\n")
          )
          .setImage(imageUrl)
          .setURL(message.url)
          .setFooter(
            `${
              isBulkDelete ? "Bulk deleted" : "Deleted"
            } message in ${humanizeChannelType(
              message.channel
            )} after ${humanizeElapsedTime(elapsedTime)}`,
            message.author.displayAvatarURL()
          )
          .setTimestamp()
      : new MessageEmbed().setImage(imageUrl).setURL(message.url);
  });

  sendWebhookMessage(message.guild, config, { embeds });
};
