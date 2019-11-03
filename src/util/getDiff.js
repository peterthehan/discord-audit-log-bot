const jsdiff = require('diff');

const markdownRegExp = /\*|~~/g;

const applyStyle = (string, style) => `${style}${string}${style}`;

const getSmallestString = strings =>
  strings.reduce((smallestString, currentString) =>
    currentString.length < smallestString.length
      ? currentString
      : smallestString
  );

module.exports = (oldString, newString) => {
  const diffs = [jsdiff.diffWordsWithSpace, jsdiff.diffLines].map(
    diffFunction =>
      diffFunction(
        oldString.replace(markdownRegExp, ''),
        newString.replace(markdownRegExp, '')
      ).reduce((diffString, part) => {
        diffString += applyStyle(
          part.value,
          part.added ? '***' : part.removed ? '~~' : ''
        );

        return diffString;
      }, '')
  );

  return getSmallestString(diffs);
};
