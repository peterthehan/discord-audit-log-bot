import { Guild, Snowflake } from "discord.js";
import configs from "../config.json";
import { Config } from "../types";

const configMap: Map<Snowflake, Config> = new Map();
configs.forEach((config) => {
  const newConfig = {
    ...config,
    ignoreChannelIds: new Set(config.ignoreChannelIds),
  } as Config;
  configMap.set(config.guildId, newConfig);
});

function getConfig(guild: Guild): Config | undefined {
  if (!configMap.has(guild.id)) {
    return;
  }

  return configMap.get(guild.id);
}

export { getConfig };
