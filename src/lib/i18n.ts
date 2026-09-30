export const languages = ['en', 'az'] as const;
export type Language = typeof languages[number];
export function languageFromPath(path: string): Language { return path.split('/')[1] === 'az' || path.startsWith('/blog/az/') ? 'az' : 'en'; }
export function localPath(lang: Language, path = '') { return `/${lang}/${path.replace(/^\/+/, '')}`; }
const en = {
  home: 'Home', projects: 'Projects', blog: 'Blog', dark: 'Dark Mode', light: 'Light Mode',
  greeting: "Hi, I'm", role: 'Backend Developer & CS Student', work: 'View My Work', about: 'About Me',
  skills: 'Skills & Technologies', featured: 'Featured Projects', allProjects: 'View All Projects', recent: 'Recent blog', allBlogs: 'View All Blogs',
  projectsIntro: 'A collection of my work', blogIntro: 'Thoughts, tutorials, and insights',
  project: 'Project', repository: 'Open repository', newTab: 'open GitHub repository in a new tab', technologies: 'Technologies',
  by: 'By', published: 'Published', share: 'Share article', copied: 'Article link copied.', copy: 'Copy this article link:', shareError: 'Unable to share. Copy the article link from your address bar.',
  unavailable: 'This article is not available in English yet. The Azerbaijani original is shown below.', original: 'Azerbaijani article',
};
const az: typeof en = {
  home: 'Ana səhifə', projects: 'Layihələr', blog: 'Bloq', dark: 'Qaranlıq rejim', light: 'İşıqlı rejim',
  greeting: 'Salam, mən', role: 'Backend proqramçı və kompüter elmləri tələbəsi', work: 'İşlərimə bax', about: 'Haqqımda',
  skills: 'Bacarıqlar və texnologiyalar', featured: 'Seçilmiş layihələr', allProjects: 'Bütün layihələrə bax', recent: 'Son bloq yazıları', allBlogs: 'Bütün yazılara bax',
  projectsIntro: 'İşlərim, təcrübələrim və layihələrim', blogIntro: 'Düşüncələr, təlimatlar və təcrübələr',
  project: 'Layihə', repository: 'Repozitoriyaya bax', newTab: 'GitHub repozitoriyasını yeni vərəqdə aç', technologies: 'Texnologiyalar',
  by: 'Müəllif:', published: 'Dərc edilib', share: 'Yazını paylaş', copied: 'Yazının linki kopyalandı.', copy: 'Yazının linkini kopyala:', shareError: 'Paylaşmaq mümkün olmadı. Linki ünvan sətrindən kopyala.',
  unavailable: 'Bu yazının Azərbaycan dilinə tərcüməsi hələ yoxdur. Aşağıda ingiliscə orijinalı göstərilir.', original: 'İngiliscə yazı',
};
export function ui(lang: Language) { return lang === 'az' ? az : en; }
