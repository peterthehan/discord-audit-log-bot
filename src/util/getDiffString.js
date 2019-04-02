const jsdiff = require('diff');
const applyStyle = require('./applyStyle');

module.exports = (oldMessage, newMessage) => {
  if (
    ['~~', '*'].some(style =>
      `${oldMessage.content}${newMessage.content}`.includes(style)
    )
  ) {
    return `Old: ${oldMessage.content}\nNew: [${newMessage.content}](${
      newMessage.url
    })`;
  }

  const diff = jsdiff
    .diffWordsWithSpace(oldMessage.content, newMessage.content)
    .reduce(
      (diffString, part) =>
        (diffString += applyStyle(
          part.value,
          part.added ? '**' : part.removed ? '~~' : ''
        )),
      ''
    );

  return `${diff} [[link]](${newMessage.url})`;
};
