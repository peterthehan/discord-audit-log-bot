import { ColorResolvable } from "discord.js";

export interface Config {
  defaultColor: ColorResolvable;
  positiveColor: ColorResolvable;
  neutralColor: ColorResolvable;
  negativeColor: ColorResolvable;
  deleteTimeThreshold: number;
  updateTimeThreshold: number;
  guildId: string;
  logChannelId: string;
  ignoreChannelIds: Set<string>;
}
