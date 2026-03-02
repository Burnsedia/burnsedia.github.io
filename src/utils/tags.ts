export const TAG_ALIAS_MAP: Record<string, string> = {
  ai: 'ai',
  agents: 'ai-agents',
  'ai agents': 'ai-agents',
  agentic: 'ai-agents',
  automation: 'automation',
  saas: 'saas',
  'indie dev': 'indie-dev',
  'developer tools': 'developer-tools',
  neovim: 'developer-tools',
  vim: 'developer-tools',
  'open source': 'open-source',
  'open-source': 'open-source',
  devops: 'devops',
  django: 'django',
  python: 'python',
  godot: 'godot',
  flutter: 'flutter',
  linux: 'linux',
  business: 'business',
  freelance: 'freelance',
  marketing: 'marketing',
  cloud: 'cloud',
};

export const TAG_LABEL_MAP: Record<string, string> = {
  ai: 'AI',
  'ai-agents': 'AI Agents',
  automation: 'Automation',
  saas: 'SaaS',
  'indie-dev': 'Indie Dev',
  'developer-tools': 'Developer Tools',
  'open-source': 'Open Source',
  devops: 'DevOps',
  django: 'Django',
  python: 'Python',
  godot: 'Godot',
  flutter: 'Flutter',
  linux: 'Linux',
  business: 'Business',
  freelance: 'Freelance',
  marketing: 'Marketing',
  cloud: 'Cloud',
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function normalizeTag(tag: string): string {
  const normalized = slugify(tag).replace(/-/g, ' ');
  const mapped = TAG_ALIAS_MAP[normalized];

  if (mapped) {
    return mapped;
  }

  return slugify(tag);
}

export function getTagLabel(tagOrSlug: string): string {
  const slug = normalizeTag(tagOrSlug);
  const mappedLabel = TAG_LABEL_MAP[slug];

  if (mappedLabel) {
    return mappedLabel;
  }

  return slug
    .split('-')
    .map((chunk) => (chunk ? chunk[0].toUpperCase() + chunk.slice(1) : chunk))
    .join(' ');
}

export function getNormalizedTags(tags?: string[]): string[] {
  if (!tags || tags.length === 0) {
    return [];
  }

  return Array.from(new Set(tags.map((tag) => normalizeTag(tag))));
}

export function hasTag(tags: string[] | undefined, expectedTag: string): boolean {
  const normalizedExpectedTag = normalizeTag(expectedTag);
  return getNormalizedTags(tags).includes(normalizedExpectedTag);
}
