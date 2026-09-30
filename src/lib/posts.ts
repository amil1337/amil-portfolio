import type { MarkdownInstance } from 'astro';

export interface BlogFrontmatter {
  title: string;
  description?: string;
  date?: string | Date;
  category?: string;
  image?: string;
  imageAlt?: string;
  author?: string;
  authorImage?: string;
  draft?: boolean;
}

export type BlogPost = MarkdownInstance<BlogFrontmatter>;

export function postDate(value: BlogFrontmatter['date']): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}

// Keep both lists in sync. Empty placeholders and drafts are not published cards.
export const sortedPosts = Object.values(
  import.meta.glob<BlogPost>('../pages/blog/*.md', { eager: true }),
).filter(post => post.url && post.frontmatter.title?.trim() && !post.frontmatter.draft)
  .sort((a, b) => (postDate(b.frontmatter.date)?.valueOf() ?? 0)
    - (postDate(a.frontmatter.date)?.valueOf() ?? 0));
