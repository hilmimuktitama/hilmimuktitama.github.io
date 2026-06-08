export function getEntrySlug(entry: { id: string }) {
  return entry.id.replace(/\.mdx?$/, "");
}
