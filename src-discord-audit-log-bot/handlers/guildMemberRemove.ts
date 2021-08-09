import { GuildMember, MessageEmbed } from "discord.js";
import { getConfig } from "../util/getConfig";
import { getTimestampFormat } from "../util/getTimestampFormat";
import { getTitle } from "../util/getTitle";
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
      .setFooter("Left the server", member.user.displayAvatarURL())
      .setTimestamp(),
  ];

  sendWebhookMessage(member.guild, config, { embeds });
};
