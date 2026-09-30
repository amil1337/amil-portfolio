---
layout: ../../layouts/BlogLayout.astro
lang: en
translationKey: astro-markdown
title: "From a Markdown file to a useful Astro blog"
description: "How metadata, code examples, tables, and paired translations turn plain text into a maintainable technical blog."
date: "2026-09-30"
# category: "Astro"
image: "/images/astro-markdown.svg"
imageAlt: "A Markdown document passing through Astro to become an HTML article."
---

A technical blog has two jobs: explain an idea clearly and make publishing the next idea straightforward. If every new article needs a new card, a new page, and another round of copy-paste, the publishing system starts competing with the writing.

Markdown gives the article a simple home. Astro turns it into a page, while a shared layout handles typography, navigation, and themes. The interesting part is how much structure a small text file can carry.

## 1. Frontmatter separates the preview from the article

The block between `---` lines is metadata. The text below it is the article itself.

```yaml
---
layout: ../../layouts/BlogLayout.astro
lang: en
translationKey: validation-at-the-boundary
title: "Validate data before it reaches your database"
description: "Why an early error is easier to understand than a broken record."
date: "2026-09-30"
category: "Backend"
image: "/images/validation-cover.jpg"
---
```

On this portfolio, `title`, `description`, and `image` build the card. The Markdown body builds the article. **The cover does not automatically appear in the article**, so a preview image never gets in the way of an explanation.

There is an important distinction: Astro supports frontmatter and Markdown layouts, but fields such as `translationKey` and this site's card discovery are conventions implemented by the portfolio. Adding a `draft` field to an arbitrary Astro project does not automatically create a draft workflow.

## 2. A good code block explains a decision

Consider a post about accepting a price from a form. The useful question is not “Can we convert a string to a number?” It is “What values are we willing to accept?”

```js
function parsePrice(input) {
  if (typeof input !== "string" || input.trim() === "") {
    throw new Error("Price is required.");
  }

  const price = Number(input);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Price must be a positive, finite number.");
  }

  return price;
}
```

The first check matters because `Number("")` returns `0`. The second rejects invalid numbers, infinity, and non-positive values. This is a small validation example, not a complete payment implementation: financial calculations need an explicit policy for precision and rounding.

Write a fenced block with a language name, such as `js`, to get syntax highlighting. Inline code, such as `Number.isFinite`, is better for a short identifier inside a sentence.

> A code example earns its place when it shows why a choice was made, not just what was typed.

## 3. Tables turn edge cases into an argument

A paragraph can describe validation. A table makes its boundaries easier to inspect:

| Input        | Result | Reason                         |
| ------------ | ------ | ------------------------------ |
| `"24.50"`    | `24.5` | A positive, finite number      |
| `""`         | Error  | No price was supplied          |
| `"hello"`    | Error  | Conversion produces `NaN`      |
| `"-5"`       | Error  | Negative prices are rejected   |
| `"Infinity"` | Error  | Infinity is not a usable price |

This is GitHub Flavored Markdown table syntax. The table and the code now describe the same behavior; the reader can compare them instead of trusting a vague claim that the input is “validated.”

### A small publishing checklist

- [x] Explain the problem before showing the solution.
- [x] Include an input that should fail.
- [ ] Replace the example cover path with a real file.
- [ ] Review the article on a narrow screen.

These checkboxes are a static checklist in the rendered article. They are not a saved task-management feature.

## 4. Links and optional detail keep the main path readable

For background, link to the [Astro Markdown guide](https://docs.astro.build/en/guides/markdown-content/). You can also link directly to a section of this article: [pairing translations](#6-two-languages-one-article-identity).

Astro generates IDs for headings. That makes a useful subsection shareable without adding a separate page. Keep heading names stable when other pages link to them.

Plain HTML is useful when Markdown needs a small extra feature:

<details>
<summary>Why not use MDX for every article?</summary>
<p>Markdown is enough for text, code, links, and images. MDX adds support for importing and using components, but needs the MDX integration. Use it when an article actually needs an interactive component; a static explanation does not need that extra layer.</p>
</details>

## 5. Put an image where it helps the explanation

An image in the body is an editorial choice. Here, the publishing pipeline is easier to see than to describe:

![A Markdown file is rendered by Astro into an HTML article.](/images/astro-markdown.svg)

The Markdown syntax is:

```md
![A description of the image](/images/astro-markdown.svg)
```

The file lives in `public/images`, while its URL starts with `/images/`. Useful alternative text explains what the image contributes. A filename such as “diagram-final-2.svg” does not do that job.

---

## 6. Two languages, one article identity

In this portfolio, an English article and its Azerbaijani translation share a `translationKey`. Their titles and filenames can differ.

```yaml
# English version: src/pages/blog/validation.md
lang: en
translationKey: validation-at-the-boundary

# Azerbaijani version: src/pages/blog/az/yoxlama.md
lang: az
translationKey: validation-at-the-boundary
```

Each file still needs its own complete frontmatter block and article text. The shared key connects the versions; it does not translate the content. The language switcher opens the matching version. If one is missing, the site clearly labels the original instead of pretending a translation exists.

To publish the next article:

1. Add the Markdown file with a clear title and short description.
2. Add a translated file when it is ready, using the same key.
3. Run the build and check the generated pages before deploying.

The result is a useful division of work: Markdown holds the explanation, the layout holds the presentation, and the site's discovery logic keeps the lists in sync. That leaves more time for the part readers actually came for: an idea worth understanding.

Further reading: [Astro syntax highlighting](https://docs.astro.build/en/guides/syntax-highlighting/).
