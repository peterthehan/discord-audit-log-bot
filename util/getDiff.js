const { diffWordsWithSpace, diffLines } = require("diff");

const markdownRegExp = /\*|~~/g;

const applyStyle = (string, style) => `${style}${string}${style}`;

const getSmallestString = (strings) =>
  strings.reduce((smallestString, currentString) =>
    currentString.length < smallestString.length
      ? currentString
      : smallestString
  );

module.exports = (oldString, newString) => {
  oldString = oldString.replace(markdownRegExp, "");
  newString = newString.replace(markdownRegExp, "");

  const diffs = [diffWordsWithSpace, diffLines].map((diffFunction) =>
    diffFunction(oldString, newString).reduce((diffString, part) => {
      diffString += applyStyle(
        part.value,
        part.added ? "***" : part.removed ? "~~" : ""
      );

      return diffString;
    }, "")
  );

  return getSmallestString(diffs);
};
