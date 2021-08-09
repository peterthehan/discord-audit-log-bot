import { diffLines, diffWordsWithSpace } from "diff";
import { Util } from "discord.js";

function applyStyle(string: string, style: string): string {
  return `${style}${string}${style}`;
}

function getSmallestString(strings: string[]): string {
  return strings.reduce((smallestString, currentString) =>
    currentString.length < smallestString.length
      ? currentString
      : smallestString
  );
}

function getDiff(oldString: string, newString: string): string {
  oldString = Util.escapeMarkdown(oldString);
  newString = Util.escapeMarkdown(newString);

  const diffs = [diffLines, diffWordsWithSpace].map((diffFunction) =>
    diffFunction(oldString, newString).reduce((diffString, part) => {
      return (diffString += applyStyle(
        part.value,
        part.added ? "***" : part.removed ? "~~" : ""
      ));
    }, "")
  );

  return getSmallestString(diffs);
}

export { getDiff };
