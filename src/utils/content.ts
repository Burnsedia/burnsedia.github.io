const MARKDOWN_EXTENSION_PATTERN = /\.(md|mdx)$/i;

export function getEntrySlug(entryId: string): string {
  return entryId
    .replace(MARKDOWN_EXTENSION_PATTERN, '')
    .replace(/\/index$/i, '');
}
