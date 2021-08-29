import { Client, MessageEmbed } from "discord.js";
import configs from "../config.json";
import { getConfig } from "../util/getConfig";
import { sendWebhookMessage } from "../util/sendWebhookMessage";

module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  configs
    .map((config) => client.guilds.resolve(config.guildId))
    .forEach((guild) => {
      if (!guild) {
        return;
      }

      const config = getConfig(guild);
      if (!config) {
        return;
      }

      const embeds = [
        new MessageEmbed()
          .setColor(config.defaultColor)
          .setDescription(
            "Made with ❤ by [peterthehan](https://github.com/peterthehan)"
          ),
      ];

      sendWebhookMessage(guild, config, { embeds });
    });
};
