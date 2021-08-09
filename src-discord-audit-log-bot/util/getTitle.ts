import {
  NewsChannel,
  TextBasedChannels,
  TextChannel,
  ThreadChannel,
  User,
} from "discord.js";

function getTitle(
  user: User,
  channel: TextBasedChannels | undefined = undefined
): string {
  if (!channel) {
    return `${user} (${user.tag})`;
  }

  channel = channel as TextChannel | NewsChannel | ThreadChannel;

  return `${user} (${user.tag}) | ${channel} (${channel.name})`;
}

export { getTitle };
