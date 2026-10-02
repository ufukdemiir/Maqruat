import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { singleFile } from "./lib/singleFileLoader";

// ---------------------------------------------------------------------------
// "books" koleksiyonu — Decap CMS'in src/content/books klasörüne yazdığı
// her .md dosyası bir kitabı temsil eder. Ana Markdown gövdesi kitabın
// İNCELEMESİ (review) olarak render edilir; notlar ve alıntılar ayrı
// frontmatter alanlarıdır.
// ---------------------------------------------------------------------------
const books = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publisher: z.string().optional().default(""),
    pageCount: z.number().int().positive().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.enum(["reading", "completed", "want-to-read", "dropped"]),
    rating: z.number().min(1).max(10).optional(),
    // Yarım bırakılan ya da şu an okunmakta olan kitaplarda o ana kadar
    // okunan gerçek sayfa sayısı. "Günde okunan ortalama sayfa" gibi
    // istatistiklerin doğru hesaplanabilmesi için önemlidir — belirtilmezse
    // (tamamlanmış kitaplar hariç) o kitaptan hiç sayfa okunmamış kabul
    // edilir; kitabın TAM sayfa sayısı asla varsayılan olarak kullanılmaz.
    pagesRead: z.number().int().nonnegative().optional(),
    genres: z.array(z.string()).default([]),
    // Her biri kısa bir Markdown parçası olabilen kişisel notlar.
    notes: z.array(z.string()).default([]),
    // Kitaptan seçilen alıntılar, isteğe bağlı sayfa numarasıyla.
    quotes: z
      .array(
        z.object({
          text: z.string(),
          page: z.number().int().positive().optional(),
        }),
      )
      .default([]),
    // Birden fazla ciltten oluşan eserler için (ör. "Savaş ve Barış - Cilt 2").
    // seriesTitle aynı olan kayıtlar otomatik olarak birbirine bağlanır.
    seriesTitle: z.string().optional(),
    volumeNumber: z.number().int().positive().optional(),
    // Decap CMS'in "editöryal iş akışı" (taslak) kullanımı için.
    draft: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// "blog" — kitaplarla sınırlı olmayan, bağımsız yazılar. /notlar sekmesinin
// sağına eklenen ayrı bir platform bölümü.
// ---------------------------------------------------------------------------
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    // Liste/SEO açıklaması olarak kullanılır; boşsa gövdeden otomatik üretilir.
    excerpt: z.string().optional().default(""),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// ---------------------------------------------------------------------------
// "settings" — tek dosyalık site ayarları (Decap CMS'te "Genel Ayarlar"
// olarak düzenlenir). Ana sayfadaki okur kartı ve yıllık hedef buradan gelir.
//
// DOSYA BİÇİMİ (önemli): src/data/site.json DÜZ bir nesnedir — alanlar
// doğrudan kökte durur, "main" gibi bir sarmalayıcı anahtar YOKTUR. Decap CMS
// dosyayı tam olarak böyle okur/yazar. Girdi kimliğini ("main") dosyanın
// içindeki bir anahtar değil, aşağıdaki özel yükleyici atar; ayrıntı için
// bkz. src/lib/singleFileLoader.ts.
// ---------------------------------------------------------------------------

// CMS'te boş bırakılan bir alan dosyaya "", null ya da hiç yazılmamış olarak
// düşebilir; hepsini güvenle aynı yere (varsayılan değere) indiriyoruz.
const text = (fallback = "") => z.string().nullish().transform((v) => v ?? fallback);

const wholeNumber = (fallback: number, positive = false) =>
  z.preprocess(
    (v) => {
      if (v === "" || v === null) return undefined;
      if (typeof v === "string" && /^\d+$/.test(v.trim())) return Number(v);
      return v;
    },
    (positive ? z.number().int().positive() : z.number().int()).default(fallback),
  );

const currentYear = new Date().getFullYear();
// Kişisel hesaplar (Ufuk Demir).
const defaultSocial = { website: "", github: "", linkedin: "", pinterest: "" };
// Maqruat'a ait hesaplar (@Maqruat) + iletişim e-postası. Sıra ve etiketler
// için bkz. src/lib/social.ts.
const defaultMaqruatSocial = {
  instagram: "",
  x: "",
  youtube: "",
  pinterest: "",
  facebook: "",
  tiktok: "",
  bluesky: "",
  tumblr: "",
  soundcloud: "",
  slack: "",
  github: "",
  email: "",
};
// Site sahipliği doğrulama kodları (Pinterest, Google Search Console, ...).
// Etiketlerin üretildiği yer: src/lib/seo.ts → getVerificationTags().
const defaultVerification = { pinterest: "", google: "", bing: "", yandex: "", facebook: "" };
const defaultAvatar = { initials: "", image: "" };

const settings = defineCollection({
  loader: singleFile("src/data/site.json"),
  // CMS'teki "Genel Ayarlar" alanlarının HİÇBİRİ zorunlu değil (bkz.
  // public/admin/config.yml). Bu yüzden her alana burada da makul bir
  // varsayılan değer tanımlıyoruz: panelden bir alan boş bırakılsa/silinse
  // bile derleme ASLA hata vermez, site her zaman güvenli bir değerle
  // (ör. "Ufuk Demir", geçerli yıl) render edilir.
  //
  // GÜVENLİK AĞI: Her alanın kendi `.catch()`'i var — tek bir alandaki
  // beklenmedik bir değer yalnızca O alanı varsayılana döndürür, diğer
  // ayarlar (biyografi, sosyal bağlantılar vb.) etkilenmez. Şemanın tamamı
  // için de son bir `.catch()` var; ne olursa olsun derleme durmaz.
  schema: z
    .object({
      readerName: text("Ufuk Demir").catch("Ufuk Demir"),
      // Ana sayfada adın solunda gösterilebilecek isteğe bağlı rozet/fotoğraf.
      // Fotoğraf doluysa fotoğraf, değilse baş harfler, ikisi de boşsa hiçbiri
      // gösterilir (bkz. src/pages/index.astro).
      avatar: z
        .object({
          initials: text().catch(""),
          image: text().catch(""),
        })
        .nullish()
        .transform((v) => v ?? defaultAvatar)
        .catch(defaultAvatar),
      tagline: text().catch(""),
      bio: text().catch(""),
      siteDescription: text().catch(""),
      // Sitenin ilk yayına alındığı yıl — footer'daki telif hakkı satırında
      // "© 2026–2028" gibi bir aralık göstermek için kullanılır. Boş
      // bırakılırsa derleme anındaki yıl varsayılan olarak kullanılır.
      foundingYear: wholeNumber(currentYear).catch(currentYear),
      goalYear: wholeNumber(currentYear).catch(currentYear),
      yearlyGoal: wholeNumber(12, true).catch(12),
      social: z
        .object({
          website: text().catch(""),
          github: text().catch(""),
          linkedin: text().catch(""),
          pinterest: text().catch(""),
        })
        .nullish()
        .transform((v) => v ?? defaultSocial)
        .catch(defaultSocial),
      maqruatSocial: z
        .object({
          instagram: text().catch(""),
          x: text().catch(""),
          youtube: text().catch(""),
          pinterest: text().catch(""),
          facebook: text().catch(""),
          tiktok: text().catch(""),
          bluesky: text().catch(""),
          tumblr: text().catch(""),
          soundcloud: text().catch(""),
          slack: text().catch(""),
          github: text().catch(""),
          email: text().catch(""),
        })
        .nullish()
        .transform((v) => v ?? defaultMaqruatSocial)
        .catch(defaultMaqruatSocial),
      verification: z
        .object({
          pinterest: text().catch(""),
          google: text().catch(""),
          bing: text().catch(""),
          yandex: text().catch(""),
          facebook: text().catch(""),
        })
        .nullish()
        .transform((v) => v ?? defaultVerification)
        .catch(defaultVerification),
    })
    .catch({
      readerName: "Ufuk Demir",
      avatar: defaultAvatar,
      tagline: "",
      bio: "",
      siteDescription: "",
      foundingYear: currentYear,
      goalYear: currentYear,
      yearlyGoal: 12,
      social: defaultSocial,
      maqruatSocial: defaultMaqruatSocial,
      verification: defaultVerification,
    }),
});

export const collections = { books, settings, blog };
