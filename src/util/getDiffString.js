const jsdiff = require('diff');

module.exports = (oldMessage, newMessage) => {
  if (`${oldMessage.content}${newMessage.content}`.includes('~~')) {
    return `Old: ${oldMessage.content}\nNew: [${newMessage.content}](${
      newMessage.url
    })`;
  }

  const diff = jsdiff
    .diffWordsWithSpace(oldMessage.content, newMessage.content)
    .reduce(
      (diffString, part) =>
        (diffString += part.removed ? `~~${part.value}~~` : part.value),
      ''
    );

  return `${diff} [[link]](${newMessage.url})`;
};
