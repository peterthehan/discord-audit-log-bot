const jsdiff = require('diff');

const markdownRegExp = /\*|~~/g;

const _applyStyle = (string, style) => `${style}${string}${style}`;

module.exports = (oldString, newString) =>
  jsdiff
    .diffWordsWithSpace(
      oldString.replace(markdownRegExp, ''),
      newString.replace(markdownRegExp, '')
    )
    .reduce((diffString, part) => {
      diffString += _applyStyle(
        part.value,
        part.added ? '***' : part.removed ? '~~' : ''
      );

      return diffString;
    }, '');
