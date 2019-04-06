const jsdiff = require('diff');
const applyStyle = require('./applyStyle');

module.exports = (oldMessage, newMessage) => {
  const diff = jsdiff
    .diffWordsWithSpace(oldMessage.content, newMessage.content)
    .reduce((diffString, part) => {
      const startsWithSpace = part.value.startsWith(' ');
      const endsWithSpace = part.value.endsWith(' ');
      part.value = part.value.trim().replace(/\*|~~/g, '');

      if (startsWithSpace) diffString += ' ';
      diffString += applyStyle(
        part.value,
        part.added ? '***' : part.removed ? '~~' : ''
      );
      if (endsWithSpace) diffString += ' ';

      return diffString;
    }, '');

  return `${diff} [[link]](${newMessage.url})`;
};
