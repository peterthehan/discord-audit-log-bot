const jsdiff = require('diff');
const applyStyle = require('./applyStyle');

module.exports = (oldMessage, newMessage) => {
  const markdownRegExp = /\*|~~/g;
  const diff = jsdiff
    .diffWordsWithSpace(
      oldMessage.content.replace(markdownRegExp, ''),
      newMessage.content.replace(markdownRegExp, '')
    )
    .reduce((diffString, part) => {
      diffString += applyStyle(
        part.value,
        part.added ? '***' : part.removed ? '~~' : ''
      );

      return diffString;
    }, '');

  return `${diff} [[link]](${newMessage.url})`;
};
