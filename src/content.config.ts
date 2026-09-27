import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

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
// "avatar" — BİLİNÇLİ OLARAK "settings"ten TAMAMEN AYRI, tek başına, minik
// bir dosya. Neden ayrı: "settings" (Site Ayarları) 9 alanlı, karmaşık bir
// giriştir; Decap CMS'in bu türden çok alanlı bir "files" girişine YENİ bir
// alan eklendiğinde, o alanın değerini (tekrarlanabilir şekilde, hatta gizli
// pencerede bile) YANLIŞ bir üst-seviye anahtara yazdığı defalarca
// gözlemlendi (ör. "Baş Harfler" alanına yazılan bir değer, dosyanın en
// dışında bambaşka bir anahtarın altında bitebiliyor). Bu, bizim
// kodumuzdaki bir hata değil, Decap CMS'in kendi istemci tarafı kaydetme
// mantığındaki bir hata. Avatarı KENDİ, TEK ALANLIK dosyasına taşımak bu
// hatayı tetikleyen koşulu (kalabalık, çok alanlı bir girişe yeni alan
// ekleme) ortadan kaldırır.
// ---------------------------------------------------------------------------
const avatar = defineCollection({
  loader: file("src/data/avatar.json"),
  schema: z
    .object({
      initials: z.string().optional().default(""),
      image: z.string().optional().default(""),
    })
    .catch({ initials: "", image: "" }),
});

// ---------------------------------------------------------------------------
// "settings" — tek dosyalık site ayarları (Decap CMS'te "Site Ayarları"
// olarak düzenlenir). Ana sayfadaki okur kartı ve yıllık hedef buradan gelir.
// ---------------------------------------------------------------------------
const settings = defineCollection({
  loader: file("src/data/site.json"),
  // CMS'teki "Genel Ayarlar" alanlarının HİÇBİRİ artık zorunlu değil (bkz.
  // public/admin/config.yml). Bu yüzden her alana burada da makul bir
  // varsayılan değer tanımlıyoruz: panelden bir alan boş bırakılsa/silinse
  // bile derleme ASLA hata vermez, site her zaman güvenli bir değerle
  // (ör. "Ufuk Demir", geçerli yıl) render edilir. İlgili varsayılanların
  // fiilen kullanıldığı yerler için src/components/Footer.astro,
  // BaseHead.astro ve src/pages/index.astro dosyalarındaki "??"/"||"
  // yedeklerine bakabilirsiniz.
  //
  // GÜVENLİK AĞI: settings dosyası tek bir JSON dosyasıdır ve CMS'ten
  // beklenmedik/bozuk bir veriyle kaydedilirse (ör. bir widget'ın istemci
  // tarafı bir hatası nedeniyle), normalde bu TÜM SİTENİN derlenmesini
  // engelleyebilirdi (34 sayfanın tamamı etkilenir). Bunu asla istemediğimiz
  // için şemanın tamamını `.catch()` ile sarmalıyoruz: veri şemaya uymazsa
  // (ne olursa olsun) derleme durmaz, yalnızca site GEÇİCİ olarak varsayılan
  // ayarlarla (aşağıdaki gibi) render edilir. Panelden ayarları düzeltip
  // tekrar kaydettiğinizde site otomatik olarak gerçek verilerinize döner.
  schema: z
    .object({
      readerName: z.string().default("Ufuk Demir"),
      tagline: z.string().default(""),
      bio: z.string().default(""),
      siteDescription: z.string().default(""),
      // Sitenin ilk yayına alındığı yıl — footer'daki telif hakkı satırında
      // "© 2026–2028" gibi bir aralık göstermek için kullanılır. Boş
      // bırakılırsa derleme anındaki yıl varsayılan olarak kullanılır.
      foundingYear: z.number().int().default(new Date().getFullYear()),
      goalYear: z.number().int().default(new Date().getFullYear()),
      yearlyGoal: z.number().int().positive().default(12),
      social: z
        .object({
          website: z.string().optional().default(""),
          github: z.string().optional().default(""),
          linkedin: z.string().optional().default(""),
          pinterest: z.string().optional().default(""),
          email: z.string().optional().default(""),
        })
        .default({ website: "", github: "", linkedin: "", pinterest: "", email: "" }),
    })
    .catch({
      readerName: "Ufuk Demir",
      tagline: "",
      bio: "",
      siteDescription: "",
      foundingYear: new Date().getFullYear(),
      goalYear: new Date().getFullYear(),
      yearlyGoal: 12,
      social: { website: "", github: "", linkedin: "", pinterest: "", email: "" },
    }),
});

export const collections = { books, settings, blog, avatar };
