import { Change, diffLines, diffWordsWithSpace } from "diff";
import { Util } from "discord.js";

function mapPartTypeToStyle(part: Change): string {
  return part.added ? " _**" : part.removed ? " ~~" : "";
}

function mergeChanges(merged: Change[], part: Change): Change[] {
  if (
    !merged.length ||
    (mapPartTypeToStyle(merged[merged.length - 1]) !==
      mapPartTypeToStyle(part) &&
      !/^\s+$/.test(part.value))
  ) {
    merged.push(part);
  } else {
    merged[merged.length - 1].value += part.value;
  }

  return merged;
}

function reverse(string: string): string {
  return [...string].reverse().join("");
}

function applyStyle(string: string, style: string): string {
  if (string.startsWith(" ")) {
    string = string.slice(1);
  }

  if (string.endsWith(" ")) {
    string = string.slice(0, string.length - 1);
  }

  return `${style}${string}${reverse(style)}`;
}

function getSmallestString(strings: string[]): string {
  return strings.reduce((smallestString, currentString) =>
    currentString.length < smallestString.length
      ? currentString
      : smallestString
  );
}

function getDiff(oldString: string, newString: string): string {
  // escape markdown on messages to avoid conflict with diff markdown
  oldString = Util.escapeMarkdown(oldString);
  newString = Util.escapeMarkdown(newString);

  const diffs = [diffLines, diffWordsWithSpace].map((diffFunction) =>
    diffFunction(oldString, newString)
      .reduce(mergeChanges, [] as Change[])
      .reduce((diffString, part) => {
        return (diffString += applyStyle(part.value, mapPartTypeToStyle(part)));
      }, "")
  );

  return getSmallestString(diffs);
}

export { getDiff };
