const jsdiff = require('diff');

const markdownRegExp = /\*|~~/g;

const _applyStyle = (string, style) => `${style}${string}${style}`;

module.exports = (oldMessage, newMessage) =>
  jsdiff
    .diffWordsWithSpace(
      oldMessage.content.replace(markdownRegExp, ''),
      newMessage.content.replace(markdownRegExp, '')
    )
    .reduce((diffString, part) => {
      diffString += _applyStyle(
        part.value,
        part.added ? '***' : part.removed ? '~~' : ''
      );

      return diffString;
    }, '');
