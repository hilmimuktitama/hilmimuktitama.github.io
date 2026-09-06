const WORDS_PER_MINUTE = 220;

export type ReadingTime = {
  words: number;
  minutes: number;
  label: string;
};

/** Estimate reading time from Markdown prose while ignoring code samples. */
export function getReadingTime(source: string, wordsPerMinute = WORDS_PER_MINUTE): ReadingTime {
  const prose = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/^\s{0,3}(?:#{1,6}|>|[-*+] |\d+\. )/gm, " ")
    .replace(/[\*_~]/g, " ");
  const words = prose.trim().match(/\S+/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return { words, minutes, label: `${minutes} min read` };
}
