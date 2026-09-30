---
layout: ../../../layouts/BlogLayout.astro
lang: az
translationKey: astro-markdown
title: "Markdown faylından faydalı Astro bloquna"
description: "Metadata, kod nümunələri, cədvəllər və əlaqəli tərcümələrlə sadə mətni rahat idarə olunan texniki bloqa çevirmək."
date: "2026-09-30"
# category: "Astro"
image: "/images/astro-markdown-az.svg"
imageAlt: "Markdown sənədinin Astro vasitəsilə HTML yazısına çevrilməsi."
---

Texniki bloqun iki işi var: bir fikri aydın izah etmək və növbəti fikri dərc etməyi asanlaşdırmaq. Hər yeni yazı üçün ayrıca kart, səhifə və bir neçə yerdə kopyalayıb yapışdırmaq lazımdırsa, yayımlama sistemi yazının özündən çox vaxt aparmağa başlayır.

Markdown yazıya sadə bir yer verir. Astro onu səhifəyə çevirir, ortaq layout isə şriftləri, naviqasiyanı və temaları idarə edir. Maraqlı tərəfi budur: kiçik bir mətn faylı düşündüyümüzdən daha çox struktur daşıya bilər.

## 1. Frontmatter kartı yazının mətnindən ayırır

`---` sətirləri arasındakı blok metadata, yəni yazı haqqında məlumatdır. Aşağıdakı mətn isə yazının özüdür.

```yaml
---
layout: ../../../layouts/BlogLayout.astro
lang: az
translationKey: validation-at-the-boundary
title: "Məlumat bazaya çatmazdan əvvəl onu yoxla"
description: "Erkən xəta niyə səhv yazılmış məlumatdan daha asan başa düşülür?"
date: "2026-09-30"
category: "Backend"
image: "/images/validation-cover.jpg"
---
```

Bu portfolioda `title`, `description` və `image` kartı qurur. Markdown məzmunu isə yazının səhifəsini yaradır. **Cover şəkli yazıya avtomatik əlavə olunmur**; buna görə kart üçün seçilən şəkil mətnin axınına mane olmur.

Burada bir fərqi bilmək vacibdir: frontmatter və Markdown layout-ları Astro-nun imkanlarıdır. `translationKey` və kartların avtomatik tapılması isə bu portfolio üçün yazılmış qaydalardır. İstənilən Astro layihəsinə `draft` sahəsi əlavə etmək özü-özlüyündə qaralama sistemi yaratmır.

## 2. Yaxşı kod bloku verilmiş qərarı izah edir

Formadan qiymət qəbul etmək haqqında yazdığımızı düşünək. Əsas sual “Mətni rəqəmə çevirə bilərik?” deyil. Əsas sual “Hansı dəyərləri qəbul etməyə hazırıq?” olmalıdır.

```js
function parsePrice(input) {
  if (typeof input !== "string" || input.trim() === "") {
    throw new Error("Qiymət daxil edilməlidir.");
  }

  const price = Number(input);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Qiymət müsbət və sonlu ədəd olmalıdır.");
  }

  return price;
}
```

İlk yoxlama vacibdir, çünki `Number("")` nəticədə `0` qaytarır. İkinci yoxlama etibarsız ədədləri, sonsuzluğu və sıfırdan böyük olmayan dəyərləri rədd edir. Bu, kiçik bir məlumat yoxlama nümunəsidir, tam ödəniş sistemi deyil: maliyyə hesablamalarında dəqiqlik və yuvarlaqlaşdırma qaydası ayrıca müəyyən edilməlidir.

Kod blokunun başlanğıcında `js` kimi dil adı yazmaq sintaksisin rəngləndirilməsini təmin edir. Cümlənin içindəki qısa adlar üçün isə `Number.isFinite` kimi sətirdaxili kod daha uyğundur.

> Kod nümunəsi yalnız nə yazıldığını deyil, qərarın niyə verildiyini göstərəndə faydalı olur.

## 3. Cədvəl sərhəd hallarını görünən edir

Məlumatın yoxlanmasını abzasla təsvir etmək olar. Cədvəl isə qaydaların sərhədlərini daha rahat müqayisə etməyə imkan verir:

| Giriş        | Nəticə | Səbəb                                       |
| ------------ | ------ | ------------------------------------------- |
| `"24.50"`    | `24.5` | Müsbət və sonlu ədəddir                     |
| `""`         | Xəta   | Qiymət daxil edilməyib                      |
| `"hello"`    | Xəta   | Çevirmənin nəticəsi `NaN` olur              |
| `"-5"`       | Xəta   | Mənfi qiymət qəbul edilmir                  |
| `"Infinity"` | Xəta   | Sonsuzluq istifadə oluna bilən qiymət deyil |

Bu, GitHub Flavored Markdown cədvəl sintaksisidir. Kod və cədvəl artıq eyni davranışı izah edir. Oxucu “məlumat yoxlanılır” kimi ümumi bir cümləyə inanmaq əvəzinə nəticələri özü müqayisə edə bilər.

### Dərc etməzdən əvvəl kiçik yoxlama siyahısı

- [x] Həlli göstərməzdən əvvəl problemi izah et.
- [x] Xəta verməli olan giriş nümunəsi əlavə et.
- [ ] Nümunədəki cover yolunu real faylla əvəz et.
- [ ] Yazını dar ekranda yoxla.

Bu işarələr səhifədə statik yoxlama siyahısıdır. Dəyişiklikləri yadda saxlayan tapşırıq idarəetmə funksiyası deyil.

## 4. Linklər və əlavə detallar əsas fikri yormur

Mövzunun davamını [Astro-nun Markdown bələdçisində](https://docs.astro.build/en/guides/markdown-content/) oxumaq olar. Yazının konkret bölməsinə də keçid verə bilərik: [tərcümələrin əlaqələndirilməsi](#6-bir-yazının-iki-dili).

Astro başlıqlara avtomatik ID verir. Beləliklə, ayrıca səhifə yaratmadan faydalı bir bölməni paylaşmaq mümkündür. Başqa səhifələrdən həmin bölməyə keçid verilibsə, başlığın adını sabit saxlamaq yaxşıdır.

Markdown-un imkanları kifayət etməyəndə kiçik bir HTML elementi də işlətmək olar:

<details>
<summary>Niyə bütün yazıları MDX ilə hazırlamayaq?</summary>
<p>Mətn, kod, link və şəkillər üçün Markdown kifayətdir. MDX komponentləri import edib istifadə etməyə imkan verir, amma MDX inteqrasiyası tələb edir. Yazının həqiqətən interaktiv komponentə ehtiyacı olanda onu seçmək məntiqlidir; statik izah üçün əlavə qat lazım deyil.</p>
</details>

## 5. Şəkli izaha kömək etdiyi yerə qoy

Yazının içindəki şəkil məzmunla bağlı seçimdir. Burada dərc etmə prosesini görmək onu sözlə təsvir etməkdən daha rahatdır:

![Markdown faylının Astro vasitəsilə HTML yazısına çevrilməsi.](/images/astro-markdown-az.svg)

Markdown-da bunu belə yazırıq:

```md
![Şəklin mənalı təsviri](/images/astro-markdown-az.svg)
```

Şəkil `public/images` qovluğunda yerləşir, ünvanı isə `/images/` ilə başlayır. Alternativ mətn şəklin izaha nə əlavə etdiyini bildirməlidir. “diagram-final-2.svg” kimi fayl adı həmin işi görmür.

---

## 6. Bir yazının iki dili

Bu portfolioda ingiliscə yazı və Azərbaycanca tərcüməsi eyni `translationKey` dəyərini paylaşır. Başlıqlar və fayl adları fərqli ola bilər.

```yaml
# İngiliscə: src/pages/blog/validation.md
lang: en
translationKey: validation-at-the-boundary

# Azərbaycanca: src/pages/blog/az/yoxlama.md
lang: az
translationKey: validation-at-the-boundary
```

Hər faylda ayrıca tam frontmatter bloku və yazının mətni olmalıdır. Ortaq açar versiyaları əlaqələndirir, mətni tərcümə etmir. Dil düyməsi uyğun versiyanı açır. Tərcümə yoxdursa, sayt orijinalı aydın qeyd edir və mövcud olmayan tərcümə varmış kimi göstərmir.

Növbəti yazını dərc etmək üçün:

1. Aydın başlıq və qısa təsvirlə Markdown faylını əlavə et.
2. Tərcümə hazır olanda eyni açarla digər dilin faylını yarat.
3. Build et, yaranmış səhifələri yoxla və sonra yayımla.

Beləliklə, iş bölgüsü sadələşir: Markdown izahı saxlayır, layout görünüşü idarə edir, saytın yazıları tapma məntiqi isə siyahıları uyğunlaşdırır. Oxucunun gəldiyi əsas hissəyə — başa düşməyə dəyən bir fikrə — daha çox vaxt qalır.

Əlavə oxu: [Astro-da sintaksisin rəngləndirilməsi](https://docs.astro.build/en/guides/syntax-highlighting/).
