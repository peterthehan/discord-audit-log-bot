import { TextBasedChannels } from "discord.js";

function humanizeChannelType(channel: TextBasedChannels): string {
  return `${channel.type
    .toLowerCase()
    .replace("guild_", "")
    .replace(/_/g, " ")} channel`;
}

export { humanizeChannelType };
