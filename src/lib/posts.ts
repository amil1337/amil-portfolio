import type { MarkdownInstance } from 'astro';
import { localPath, type Language } from './i18n';
export interface BlogFrontmatter {
  title: string; description?: string; date?: string | Date; category?: string;
  image?: string; imageAlt?: string; author?: string; authorImage?: string; draft?: boolean;
  lang?: Language; translationKey?: string; slug?: string; layout?: string;
}
export type BlogPost = MarkdownInstance<BlogFrontmatter> & { language: Language; slug: string; translationKey: string };
export function postDate(value: BlogFrontmatter['date']): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? undefined : date;
}
const modules = import.meta.glob<MarkdownInstance<BlogFrontmatter>>('../pages/blog/**/*.md');
export async function getPosts(): Promise<BlogPost[]> {
  const posts = await Promise.all(Object.entries(modules).map(async ([path, load]) => {
    const post = await load();
    const slug = post.frontmatter.slug || path.split('/').pop()!.replace(/\.md$/, '');
    const language = post.frontmatter.lang || (path.includes('/az/') ? 'az' : 'en');
    return { ...post, slug, language, translationKey: post.frontmatter.translationKey || slug } as BlogPost;
  }));
  return posts.filter(p => p.frontmatter.title?.trim() && !p.frontmatter.draft)
    .sort((a, b) => (postDate(b.frontmatter.date)?.valueOf() ?? 0) - (postDate(a.frontmatter.date)?.valueOf() ?? 0));
}
export async function postsForLanguage(lang: Language) {
  const posts = await getPosts();
  const keys = [...new Set(posts.map(p => p.translationKey))];
  return keys.map(key => {
    const versions = posts.filter(p => p.translationKey === key);
    const post = versions.find(p => p.language === lang) || versions[0];
    return { ...post, url: localPath(lang, `blog/${post.slug}/`) };
  }).sort((a, b) => (postDate(b.frontmatter.date)?.valueOf() ?? 0) - (postDate(a.frontmatter.date)?.valueOf() ?? 0));
}
