import { Collection, Message, Snowflake } from "discord.js";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const messageDelete = require("./messageDelete");

module.exports = async (
  messages: Collection<Snowflake, Message>
): Promise<void> => {
  messages.forEach((message) => messageDelete(message, true));
};
