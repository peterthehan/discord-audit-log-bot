import { GuildMember, MessageEmbed } from "discord.js";
import { getConfig } from "../util/getConfig";
import { getElapsedTimeInSeconds } from "../util/getElapsedTimeInSeconds";
import { getTimestampFormat } from "../util/getTimestampFormat";
import { getTitle } from "../util/getTitle";
import { humanizeElapsedTime } from "../util/humanizeElapsedTime";
import { sendWebhookMessage } from "../util/sendWebhookMessage";

module.exports = async (member: GuildMember): Promise<void> => {
  const config = getConfig(member.guild);
  if (!config) {
    return;
  }

  const embeds = [
    new MessageEmbed()
      .setColor(config.negativeColor)
      .setDescription(
        `${getTitle(member.user)}\nJoined server: ${getTimestampFormat(
          member.joinedAt
        )}`
      )
      .setFooter(
        `Left the server after ${humanizeElapsedTime(
          getElapsedTimeInSeconds(member.joinedAt)
        )}`,
        member.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp(),
  ];

  sendWebhookMessage(member.guild, config, { embeds });
};
