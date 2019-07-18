const jsdiff = require('diff');
const applyStyle = require('./applyStyle');
const getHyperlink = require('./getHyperlink');

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

  return `${diff} ${getHyperlink(newMessage.url)}`;
};
