import { Message, MessageEmbed } from "discord.js";
import { getConfig } from "../util/getConfig";
import { getDiff } from "../util/getDiff";
import { getElapsedTimeInSeconds } from "../util/getElapsedTimeInSeconds";
import { getImageUrls } from "../util/getImageUrls";
import { getTitle } from "../util/getTitle";
import { humanizeChannelType } from "../util/humanizeChannelType";
import { humanizeElapsedTime } from "../util/humanizeElapsedTime";
import { sendWebhookMessage } from "../util/sendWebhookMessage";

module.exports = async (
  oldMessage: Message,
  newMessage: Message
): Promise<void> => {
  if (
    newMessage.author.bot ||
    !newMessage.guild ||
    oldMessage.content === newMessage.content
  ) {
    return;
  }

  const config = getConfig(newMessage.guild);
  if (!config || config.ignoreChannelIds.has(newMessage.channelId)) {
    return;
  }

  const elapsedTime = getElapsedTimeInSeconds(newMessage.createdAt);
  if (elapsedTime < config.updateTimeThreshold) {
    return;
  }

  const embeds = getImageUrls(newMessage).map((imageUrl, index) => {
    return index === 0
      ? new MessageEmbed()
          .setColor(config.neutralColor)
          .setDescription(
            `${getTitle(newMessage.author, newMessage.channel)}\n${getDiff(
              oldMessage.content,
              newMessage.content
            )} [[link]](${newMessage.url})`
          )
          .setImage(imageUrl)
          .setURL(newMessage.url)
          .setFooter(
            `Updated message in ${humanizeChannelType(
              newMessage.channel
            )} after ${humanizeElapsedTime(elapsedTime)}`,
            newMessage.author.displayAvatarURL()
          )
          .setTimestamp()
      : new MessageEmbed().setImage(imageUrl).setURL(newMessage.url);
  });

  sendWebhookMessage(newMessage.guild, config, { embeds });
};
