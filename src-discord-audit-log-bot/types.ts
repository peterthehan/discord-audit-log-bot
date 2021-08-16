import { ColorResolvable, Snowflake } from "discord.js";

export interface Config {
  defaultColor: ColorResolvable;
  positiveColor: ColorResolvable;
  neutralColor: ColorResolvable;
  negativeColor: ColorResolvable;
  deleteTimeThreshold: number;
  updateTimeThreshold: number;
  guildId: Snowflake;
  logChannelId: Snowflake;
  ignoreChannelIds: Set<Snowflake>;
}
