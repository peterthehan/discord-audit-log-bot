import { Message } from "discord.js";

const IMAGE_CONTENT_TYPE = "image";

function getImageUrls(message: Message): string[] {
  return !message.attachments.size
    ? [""]
    : message.attachments
        .filter((attachment) =>
          Boolean(attachment.contentType?.startsWith(IMAGE_CONTENT_TYPE))
        )
        .map((attachment) => attachment.proxyURL)
        .slice(0, 4);
}

export { getImageUrls };
