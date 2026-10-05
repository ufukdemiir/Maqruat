<p align="center">
  <img src="public/og-image.png" alt="Maqruat: kişisel okuma takibi ve kütüphane. Ufuk Demir" width="720">
</p>

<h1 align="center">Maqruat</h1>

<p align="center">
  Kişisel okuma takibi ve kütüphane platformu.<br>
  Tamamen statik, hızlı ve SEO odaklı bir <a href="https://astro.build">Astro</a> sitesi.
</p>

<p align="center">
  <a href="https://github.com/ufukdemiir/Maqruat/actions/workflows/deploy.yml"><img src="https://github.com/ufukdemiir/Maqruat/actions/workflows/deploy.yml/badge.svg" alt="Yayın durumu"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/lisans-MIT-blue.svg" alt="Lisans: MIT"></a>
  <img src="https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white" alt="Astro 7">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4">
  <img src="https://img.shields.io/badge/Node.js-%E2%89%A522.12-5FA04E?logo=nodedotjs&logoColor=white" alt="Node.js 22.12 veya üzeri">
</p>

<p align="center">
  <a href="https://ufukdemiir.github.io/Maqruat/"><strong>Canlı site</strong></a> ·
  <a href="https://ufukdemiir.github.io/Maqruat/admin/">Yönetim paneli</a> ·
  <a href="https://github.com/ufukdemiir/Maqruat/issues">Hata bildir</a>
</p>

---

## Hakkında

Maqruat; okunan kitapları, bu kitaplardan seçilen alıntıları, incelemeleri ve
kişisel notları tek bir yerde toplayan kişisel bir okuma takibi ve kütüphane
platformudur. Amaç karmaşık bir
"kitap sosyal ağı" değil, sade ve kalıcı bir kişisel arşivdir.

- **Sunucusuz:** Sayfalar derleme anında üretilir ve [GitHub Pages](https://pages.github.com) üzerinde ücretsiz yayınlanır.
- **Veri sizde:** Tüm kayıtlar düz Markdown ve JSON dosyalarıdır. Hiçbir üçüncü taraf servise bağımlılık yoktur; içeriğin tamamı JSON, CSV ve PDF olarak indirilebilir.
- **Kodsuz yönetim:** İçerik, [Decap CMS](https://decapcms.org) paneli üzerinden formlarla eklenir ve düzenlenir; her kayıt Git'e commit olarak yazılır.

## Özellikler

**Kütüphane**
- Dört okuma durumu: okunuyor, okundu, okunacak, yarım bırakıldı
- 1–10 arası puan, tür, yayınevi, sayfa sayısı, başlangıç ve bitiş tarihi
- **Tekrar okuma:** Aynı kitabı yeniden okuduğunuzda her okuma ayrı kaydedilir; kitap sayfasında yalnızca birden fazla kez okunmuş kitaplarda "N kez okundu" etiketi ve açılır "Okuma geçmişi" görünür
- Çok ciltli eserler için otomatik seri bağlantısı
- Duruma, türe ve baş harfe göre filtreleme, sayfalama
- Kitap kayıtlarından otomatik oluşan yazar sayfaları

**Alıntılar, incelemeler, notlar ve blog**
- Her kitaptan seçilen alıntılar (sayfa numarasıyla), kişisel notlar ve Markdown ile yazılmış incelemeler için ayrı sayfalar
- Kitaplardan bağımsız yazılar için blog bölümü

**İstatistikler**
- Genel ve yıllık (`/istatistikler/<yıl>`) istatistik sayfaları: okunan sayfa, ortalama puan, ortalama bitirme süresi, tür dağılımı, puan histogramı, aylık ve yıllık kitap sayısı
- En yüksek puanlı, en çok alıntılanan ve en çok not alınan kitap listeleri; en uzun/en kısa ve en hızlı/en yavaş okunan kitaplar
- Yıllık okuma hedefi ilerleme çubuğu ve aylık özet
- Bitirilen **tekrar okumalar** istatistiklere ayrı okuma olarak dahil edilir ve ilgili yerde "N tekrar okuma dahil" notuyla belirtilir (kurallar için bkz. [Tekrar okuma](#tekrar-okuma))
- [Chart.js](https://www.chartjs.org) ile grafikler

**Keşif ve kullanım**
- `Ctrl/Cmd + K` ile global arama: kitap, yazar, alıntı, inceleme, not ve blog için ayrı filtreler; Türkçe karaktere duyarlı bulanık eşleşme ([Fuse.js](https://www.fusejs.io))
- Rastgele kitap, alıntı, inceleme, not ve blog yazısı
- Paylaşım düğmeleri: X, Facebook, LinkedIn, Pinterest, Tumblr, Telegram, WhatsApp
- Açık/koyu tema (sistem tercihine uyar, seçim hatırlanır)
- **RSS akışı** (`/rss.xml`): blog yazıları ve bitirilen okumalar; tarayıcılar ve okuyucu uygulamaları akışı her sayfadan otomatik bulur
- Erişilebilirlik: "İçeriğe geç" bağlantısı, WCAG AA renk kontrastı, adlandırılmış ilerleme çubuğu ve sayfa aşağı kaydırıldığında beliren "Sayfanın başına dön" düğmesi (klavye ve ekran okuyucu uyumlu, hareket azaltma tercihine saygılı)

**Bağlantılar ve marka**
- Alt bilgide (footer) bağlantılar üç ayrı grupta toplanır ve birbirine karışmaz: ortalı çipler hâlindeki **Maqruat'ı takip edin** (platformun @Maqruat hesapları), okur adının altındaki **kişisel bağlantılar** ve onun altında kendi başlığıyla **İletişim** (e-posta). Çiplerin sonunda her zaman **RSS** yer alır.
- Tüm bağlantılar yönetim panelinden eklenir, değiştirilir ya da kaldırılır; boş bırakılan bağlantı sitede hiç görünmez. Mobilde çipler alt alta sarılır, yatay kaydırma gerektirmez.

**Arşivi indir**
- Sitedeki tüm içerik (tekrar okuma geçmişi dahil) JSON, CSV ve PDF olarak indirilebilir. Dosyalar derleme anında üretilir; CSV, Excel'de Türkçe karakterlerin bozulmaması için UTF-8 BOM ile yazılır, PDF gömülü fontlarla hazırlanır.

**SEO**
- Site haritası (`/sitemap-index.xml`) her sayfa için içeriğin **gerçek son değişiklik tarihini** (`lastmod`) içerir; tarihler içerik dosyalarının Git commit tarihlerinden gelir (bkz. [Site haritası ve `lastmod`](#site-haritası-ve-lastmod))
- Canonical bağlantılar, Open Graph ve Twitter kartları, RSS otomatik keşif bağlantısı
- JSON-LD yapılandırılmış veri: `WebSite`, `Organization` (resmî hesaplar `sameAs` ile, iletişim e-postası `contactPoint` ile) ve `Person`, `Book`, `Review`, `BreadcrumbList`
- Site sahipliği doğrulama etiketleri (Pinterest, Google Search Console, Bing, Yandex, Facebook) panelden girilir; kod düzenlemek gerekmez
- 1200×630 paylaşım görseli ve Google'ın istediği PNG favicon seti

## Teknoloji

| Katman | Kullanılan |
|---|---|
| Framework | [Astro](https://astro.build) 7 (statik site üretimi) |
| Stil | [Tailwind CSS](https://tailwindcss.com) v4 + Typography eklentisi |
| İçerik | Markdown + Astro Content Collections (Zod ile tip güvenli şema) |
| CMS | [Decap CMS](https://decapcms.org) 3 (GitHub backend, Cloudflare Worker üzerinden OAuth); panelin kodu sitenin kendi dosyalarından sunulur |
| Yazı tipleri | Maqruat Serif (Source Serif 4 türevi) ve Plus Jakarta Sans, SIL OFL 1.1; kendi sitemizden sunulur (Google Fonts yok) |
| Arama | Fuse.js (istemci taraflı) |
| Grafik / PDF | Chart.js / pdfmake |
| Dil | TypeScript |
| Barındırma ve CI/CD | GitHub Pages, GitHub Actions, Dependabot |

## Hızlı başlangıç

**Gereksinim:** [Node.js](https://nodejs.org) 22.12 veya üzeri

```bash
git clone https://github.com/ufukdemiir/Maqruat.git
cd Maqruat
npm install
npm run dev
```

Site <http://localhost:4321/Maqruat/> adresinde açılır. Proje GitHub Pages'te alt
yolda (`/Maqruat`) yayınlandığı için yerelde de bu önekle çalışır.

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Statik siteyi `./dist` klasörüne üretir |
| `npm run preview` | Üretilen siteyi yerelde önizler |
| `npm run check` | Astro ile tip kontrolü yapar |

## Proje yapısı

```
├── .github/
│   ├── workflows/
│   │   ├── deploy.yml                # GitHub Pages'e dağıtım
│   │   ├── ci.yml                    # Pull request derleme ve tip kontrolü
│   │   └── dependabot-auto-merge.yml # Güvenli güncellemelerin otomatik birleştirilmesi
│   └── dependabot.yml
├── public/
│   ├── admin/                        # Decap CMS (config.yml, index.html)
│   │   └── vendor/decap-cms/         # Panelin kodu (resmî npm paketinden, bkz. scripts/)
│   ├── fonts/                        # Yazı tipleri (woff2) ve lisans metinleri
│   ├── uploads/                      # CMS medya kütüphanesi
│   └── favicon.svg, favicon-*.png, apple-touch-icon.png, logo.png, og-image.png
├── src/
│   ├── components/                   # Header, Footer, SearchModal, BookCard, ...
│   ├── content/
│   │   ├── books/                    # Her dosya bir kitap
│   │   └── blog/                     # Her dosya bir blog yazısı
│   ├── data/site.json                # Genel ayarlar (düz JSON)
│   ├── layouts/BaseLayout.astro
│   ├── lib/                          # Sorgular, istatistik, SEO, sosyal bağlantılar, RSS, lastmod, CSV/JSON/PDF dışa aktarma
│   ├── pages/                        # Tüm rotalar
│   ├── styles/global.css             # Tasarım belirteçleri (renk, yazı tipi)
│   └── content.config.ts             # İçerik şemaları
├── scripts/update-decap-cms.mjs      # Yönetim paneli kodunu güvenle güncelleyen betik
├── astro.config.mjs                  # Site adresi ve alt yol (site, base)
├── .gitattributes                    # Hazır (vendored) panel kodunu dil istatistiğinden hariç tutar
├── LICENSE
└── NOTICE.md
```

> **Not:** İçerik yapılandırması bilinçli olarak `src/content/config.ts` yerine
> `src/content.config.ts` konumundadır. Güncel Astro sürümlerinde (Content Layer
> API) dosya eski konumda olursa derleme hata verir.

**Sayfalar:** `/`, `/kitaplar`, `/kitaplar/<slug>`, `/yazarlar`, `/yazarlar/<yazar>`,
`/alintilar`, `/incelemeler`, `/notlar`, `/blog`, `/blog/<slug>`, `/istatistikler`,
`/istatistikler/<yıl>`, `/arsiv`, dışa aktarma dosyaları
`/arsiv/maqruat-arsiv.json`, `.csv`, `.pdf`, RSS akışı `/rss.xml` ve site haritası `/sitemap-index.xml`.

## İçerik yönetimi

Yeni içerik iki yolla eklenebilir:

1. **Yönetim panelinden:** [`/admin`](https://ufukdemiir.github.io/Maqruat/admin/) adresinde GitHub ile giriş yapıp formları doldurun. Her kayıt `main` branch'ine commit olarak yazılır ve site otomatik yeniden yayınlanır.
2. **Elle:** `src/content/books/` veya `src/content/blog/` klasörüne bir `.md` dosyası ekleyin.

```md
---
title: "Kitabın Adı"
author: "Yazar Adı"
publisher: "Yayınevi"
pageCount: 250
startDate: 2026-09-01
endDate: 2026-09-10
status: "completed"   # reading | completed | want-to-read | dropped
rating: 8             # 1-10 arası, isteğe bağlı
genres: ["Roman"]
notes: ["Kısa bir not."]
quotes:
  - text: "Seçtiğiniz alıntı."
    page: 42
---

İncelemenizi buraya Markdown olarak yazın.
```

- Dosya adı sayfa adresini (slug) belirler.
- Aynı yazarın tüm kitaplarında adı **birebir aynı** yazın; aksi hâlde aynı yazar iki ayrı kişi gibi görünür.
- Yarım bırakılan veya okunmakta olan kitaplarda `pagesRead` ile o ana kadar okunan sayfayı girin. Bu alan yoksa o kitaptan hiç sayfa okunmamış sayılır; istatistikler tam sayfa sayısını asla varsaymaz.
- Çok ciltli eserlerde `seriesTitle` ve `volumeNumber` kullanın; aynı `seriesTitle`'a sahip kayıtlar birbirine bağlanır.
- `draft: true` olan kayıtlar sitede yayınlanmaz.
- Blog yazıları için alanlar: `title`, `publishDate`, `excerpt`, `tags`, `draft`.

### Tekrar okuma

Bir kitabı yeniden okuduğunuzda yeni bir kitap kaydı açmayın. Kitabın dosyasına (ya da panelde **Tekrar Okumalar** alanına) her okuma için bir kayıt ekleyin. Kitabın en üstündeki `startDate`, `endDate`, `status` ve `pagesRead` alanları her zaman **ilk okumayı** anlatır; `rereads` altındaki kayıtlar 2., 3., … okumalardır:

```md
status: "completed"          # ilk okuma bitti
startDate: 2026-07-01
endDate: 2026-07-30
rereads:
  - startDate: 2027-03-01    # 2. okuma
    endDate: 2027-03-12
    status: completed        # completed | dropped | reading
  - startDate: 2027-09-01    # 3. okuma, yarım bırakıldı
    endDate: 2027-09-04
    status: dropped
    pagesRead: 200           # yalnızca yarım bırakılanlarda
```

- Tekrar okuma girilen kitabın kendi `status` değeri `completed` ya da `dropped` olmalıdır; aksi hâlde derleme, hangi dosyada neyin düzeltileceğini söyleyen bir hatayla durur (yayındaki site etkilenmez).
- Kayıtlar eklenme sırasından bağımsız olarak **tarih sırasına** dizilir; "2. okuma", "3. okuma" numaraları bu sıradan gelir.
- `status: reading` ile girilen süren bir tekrar okuma ana sayfadaki "Şu an okunuyor" bölümünde görünür; bitince `completed` yapıp `endDate` ekleyin.

**İstatistiklere nasıl yansır?** Hesaplar iki ayrı şeyi sayar:

| Okuma olayı sayılanlar (her okuma ayrı) | Kitaba ait sayılanlar (kitap tek sefer) |
|---|---|
| Bitirilen kitap sayısı, yıllık hedef, aylık özet | Yazar sayısı ve en çok okunan yazar |
| Okunan sayfa, günlük ortalama sayfa | Tür dağılımı |
| Bitirme süresi (ortalama, en hızlı, en yavaş) | Puan ortalaması ve puan dağılımı |
| Aylık ve yıllık kitap grafikleri, zaman dilimi kartları | Not, alıntı ve inceleme sayıları; en yüksek puanlı / en çok alıntılanan / en çok not alınan listeleri |
| "En uzun/en kısa" ve "ilk/son bitirilen" seçimleri | Toplam kitap ve durum dağılımı |

Hiç tekrar okuma yoksa tüm sayılar tekrar okuma özelliğinden önceki hâliyle birebir aynıdır. Bir tekrar okuma, **bittiği yılın** istatistik sayfasında sayılır ve o yıl için sayfa oluşturur.

## Yapılandırma

| Dosya | İçerik |
|---|---|
| `astro.config.mjs` | `SITE_URL = "https://ufukdemiir.github.io"` ve `BASE_PATH = "/Maqruat"` |
| `public/admin/config.yml` | `repo: ufukdemiir/Maqruat`, `site_url`, `display_url`, OAuth Worker adresi (`base_url`) |
| `src/data/site.json` | Okur adı, biyografi, slogan, yıllık okuma hedefi, kişisel ve Maqruat sosyal bağlantıları, site doğrulama kodları |
| `src/lib/social.ts` | Maqruat hesaplarının footer'daki görünme sırası ve etiketleri |

> **`site.json` biçimi:** Dosya **düz** bir JSON nesnesidir. Alanlar (`readerName`,
> `tagline`, `social`, ...) doğrudan kökte durur; `"main"` gibi bir sarmalayıcı
> anahtar yoktur ve eklenmemelidir. Decap CMS dosyayı tam olarak bu biçimde okur
> ve yazar. Girdi kimliğini (`"main"`) dosya değil, `src/lib/singleFileLoader.ts`
> atar.

### Sosyal bağlantılar ve doğrulama kodları

Hepsi yönetim panelinde **Site Ayarları → Genel Ayarlar** altındadır:

| Bölüm | Sitede nerede görünür |
|---|---|
| **Kişisel Bağlantılar (okur)** | Footer'da okur adının altında düz metin listesi; GitHub, LinkedIn ve Pinterest ayrıca ana sayfadaki okur kartında düğme olarak |
| **Maqruat Hesapları (@Maqruat)** | Footer'da ortalı "Maqruat'ı takip edin" başlığı altında çipler; **İletişim e-postası** ise "Ufuk Demir" sütununun altında, "İletişim" başlığıyla `E-posta` bağlantısı (`mailto:`) olarak |
| **Site Sahipliği Doğrulama** | Görünmez; her sayfanın `<head>` bölümüne `<meta>` etiketi olarak yazılır |

- Bir alanı **boş bırakmak** o bağlantıyı siteden kaldırır; kişisel bağlantıların ve e-postanın tamamı boşsa ilgili bölümler de kaybolur. "Maqruat'ı takip edin" bölümünde ise sitenin kendi **RSS** çipi her zaman bulunur.
- Bağlantılar `https://` ile başlamalıdır; panel başka biçimleri reddeder. Kod tarafında da yalnızca `http(s)` bağlantıları kabul edilir.
- **Görünme sırası** sabittir ve `src/lib/social.ts` içindeki `MAQRUAT_PLATFORMS` listesinden gelir: Instagram, X, YouTube, Pinterest, Facebook, TikTok, Bluesky, Tumblr, SoundCloud, Slack, GitHub. Sıra, kitap ve alıntı paylaşımına uygun görsel ağlar önde, topluluk ve geliştirici odaklı olanlar sonda olacak şekilde belirlenmiştir.
- Herkese açık profili olan Maqruat hesapları ve kişisel hesaplar, arama motorlarına resmî hesap olarak bildirilir (`sameAs`). Slack çalışma alanı ve kod deposu bunun dışındadır.

**Yeni bir platform eklemek** için üç yeri güncelleyin: `src/lib/social.ts` (`MAQRUAT_PLATFORMS` ve `MaqruatPlatformKey`), `src/content.config.ts` (`maqruatSocial` şeması) ve `public/admin/config.yml` (aynı anahtarla bir alan).

Renkler ve yazı tipleri `src/styles/global.css` içindeki tasarım belirteçlerinden
gelir (kağıt, mürekkep ve deri ciltli kitap paleti; Maqruat Serif ve Plus
Jakarta Sans). İkincil metinler için `ink-muted` belirteci kullanılır: her iki
temada ve tüm kart zeminlerinde WCAG AA (4,5:1) kontrastını karşılar; yeni bir
soluk metin gerektiğinde `text-ink-soft/60` gibi opaklıklı sınıflar yerine bunu kullanın.

### Yazı tipleri

Yazı tipleri **kendi sitemizden** (`public/fonts/`) sunulur; Google Fonts'a bağlantı yoktur.
Bu, ziyaretçi IP adreslerinin üçüncü bir tarafa gitmemesi, bir bağlantı daha az kurulması
ve yazı tiplerinin dış bir servise bağımlı olmaması demektir. Kullanılan dosyalar:

- **Maqruat Serif** (`maqruat-serif-*.woff2`): Source Serif 4'ün Latin + Latin Genişletilmiş (Türkçe dahil)
  alt kümesi; ağırlık (200–900) ve optik boyut (8–60) eksenleri korunmuştur. Source Serif 4'ün lisansındaki
  "Reserved Font Name" kuralı gereği, değiştirilmiş sürüm özgün adla dağıtılamadığından yeniden adlandırılmıştır
  (harf çizimleri değişmemiştir).
- **Plus Jakarta Sans** (`plus-jakarta-sans-*.woff2`): özgün, değiştirilmemiş dosyalar.

Tarayıcı, `unicode-range` sayesinde yalnızca sayfada kullanılan karakter kümesinin dosyasını indirir.
Kiril, Yunanca ve Vietnamca karakter kümeleri bilinçli olarak dahil edilmemiştir; bu karakterler
yazılırsa sistemin yedek serif yazı tipiyle gösterilir. Lisans metinleri: `public/fonts/licenses/`, ayrıntı: [NOTICE.md](NOTICE.md).

### Yönetim paneli kodu (Decap CMS)

Panel, GitHub'a yazma yetkili bir belirteçle çalıştığı için kodu üçüncü bir sunucudan (CDN)
çekilmez; resmî npm paketinden alınıp `public/admin/vendor/decap-cms/` altından sunulur.
Sürüm ve paketin bütünlük değeri `VERSION.txt` dosyasındadır. Sessizce güncellenmez;
güncellemek için (Node 22+ ve npm gerekir), önce sürüm notlarını okuyun, sonra:

```bash
node scripts/update-decap-cms.mjs 3.16.3   # istediğiniz sürüm
npm run build                               # derleyip /admin/ sayfasını deneyin
```

Betik paketi indirir (npm, kayıt defterinin bütünlük değerini kendisi doğrular), yalnızca panelin
çalışması için gereken dosyaları kopyalar ve `VERSION.txt`'yi günceller.

> **Dikkat (CMS yapılandırması):** `public/admin/config.yml` içindeki **Tekrar Okumalar** listesinin
> alt alanlarına `default:` eklemeyin. Decap, alt alanda varsayılan görürse her yeni kitaba otomatik
> olarak boş bir tekrar okuma ekler ve istatistikleri bozar.

**Kendi kopyanızı yayınlayacaksanız** `SITE_URL` ve `BASE_PATH` değerlerini kendi
GitHub kullanıcı adınıza ve depo adınıza göre değiştirin:

- Depo adı `kullanici-adi.github.io` ise: `site: "https://kullanici-adi.github.io"`, `base: "/"`
- Depo adı farklıysa (ör. `depo-adi`): `site: "https://kullanici-adi.github.io"`, `base: "/depo-adi"`

Ayrıca `src/content/` ve `src/data/` içeriklerini kendi içeriğinizle değiştirin ve
projenin adını, logosunu ve görsellerini kullanmayın (bkz. [Lisans](#lisans)).

## Dağıtım

1. Depo **Settings → Pages** sayfasında **Source** olarak **GitHub Actions**'ı seçin.
2. `main` branch'e her push'ta `.github/workflows/deploy.yml` siteyi derleyip yayınlar. İş akışı önce derler, yalnızca başarılıysa yayınlar; bozuk bir derleme canlı siteyi asla etkilemez.
3. İsterseniz **Actions** sekmesinden iş akışını *Run workflow* ile elle de başlatabilirsiniz.

İş akışı depoyu tüm Git geçmişiyle (`fetch-depth: 0`) klonlar; site haritasındaki `lastmod` tarihleri buradan üretilir (bkz. [Site haritası ve `lastmod`](#site-haritası-ve-lastmod)). Bu ayarı kaldırmayın.

CMS panelinden yapılan her kayıt da `main` branch'ine commit atar ve aynı iş akışını tetikler.

<details>
<summary><strong>Decap CMS için GitHub OAuth kurulumu</strong> (bir kerelik, ücretsiz)</summary>

<br>

GitHub Pages yerleşik bir CMS girişi (OAuth) sunmaz. Bunun için ücretsiz bir
**Cloudflare Worker** ile küçük bir "OAuth gateway" çalıştırılır. Burada
[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) kullanılmıştır;
Decap CMS ile uyumludur ve Netlify gerektirmez.

**1. Worker'ı Cloudflare'e dağıtın**

[sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) deposundaki
**Deploy to Cloudflare Workers** düğmesiyle (ya da klonlayıp `wrangler deploy` ile)
dağıtın. Dağıtımdan sonra worker adresiniz şu biçimde olur:
`https://sveltia-cms-auth.<ALT-ALAN-ADINIZ>.workers.dev`

**2. GitHub OAuth uygulaması oluşturun**

GitHub'da profil fotoğrafınız → **Settings** → sol menünün en altındaki
**Developer settings** → **OAuth Apps** → **New OAuth App** yolunu izleyin
(doğrudan adres: <https://github.com/settings/developers>).

| Alan | Değer |
|---|---|
| Application name | Maqruat CMS (istediğiniz bir ad) |
| Homepage URL | `https://ufukdemiir.github.io/Maqruat/` |
| Authorization callback URL | `<WORKER_ADRESİNİZ>/callback` |

Kaydettikten sonra **Generate a new client secret** ile bir secret oluşturun ve
**Client ID** ile **Client Secret** değerlerini saklayın. Secret'ı bir daha göremezsiniz.

**3. Worker'a ortam değişkenlerini ekleyin**

Cloudflare panelinde worker'ın **Settings → Variables** bölümüne ekleyin:

| Değişken | Değer |
|---|---|
| `GITHUB_CLIENT_ID` | 2. adımdaki Client ID |
| `GITHUB_CLIENT_SECRET` | 2. adımdaki Client Secret (**Encrypt** işaretleyin) |
| `ALLOWED_DOMAINS` | `ufukdemiir.github.io` (protokol ve yol olmadan) |

**4. `public/admin/config.yml` dosyasını kontrol edin**

```yaml
backend:
  name: github
  repo: ufukdemiir/Maqruat
  branch: main
  base_url: https://sveltia-cms-auth.xxxx.workers.dev   # kendi worker adresiniz
  auth_endpoint: auth
```

Değişiklikleri push'layıp site yeniden yayınlandıktan sonra
<https://ufukdemiir.github.io/Maqruat/admin/> adresinden giriş yapabilirsiniz.

> Panelin arayüz dili için `config.yml` içinde `locale: "tr"` ayarlıdır. Kullanılan
> Decap sürümünde Türkçe çeviri eksikse panel kendiliğinden İngilizceye döner; bu
> bir hata değildir. Bu projedeki tüm alan adları zaten Türkçedir.

</details>

<details>
<summary><strong>Site sahipliği doğrulaması ve Search Console</strong> (Pinterest, Google, Bing)</summary>

<br>

Pinterest, Google Search Console gibi servisler siteye sahip olduğunuzu kanıtlamanız
için bir `<meta>` etiketi ister. Etiketi koda elle yazmak yerine kodu panele
yapıştırmanız yeterlidir:

1. Servisten doğrulama kodunu alın. Verilen satır şuna benzer: `<meta name="p:domain_verify" content="e28c…" />`
2. [`/admin`](https://ufukdemiir.github.io/Maqruat/admin/) → **Site Ayarları → Genel Ayarlar → Site Sahipliği Doğrulama** bölümünde ilgili alana yapıştırın. Satırın tamamını da yapıştırabilirsiniz; yalnızca `content="…"` içindeki kod ayıklanır.
3. **Kaydedin** ve site yeniden yayınlanana kadar (genelde 1-2 dakika, **Actions** sekmesinde yeşil tik) bekleyin.
4. Servise dönüp **Doğrula**'ya basın.

Pinterest kodu bu depoda zaten tanımlıdır. Google için alan adının altındaki
mülkü **URL öneki** türünde, tam adresle (`https://ufukdemiir.github.io/Maqruat/`)
ekleyin ve **HTML etiketi** yöntemini seçin. Doğrulandıktan sonra
**Site haritaları** bölümüne `sitemap-index.xml` yazıp gönderin.

Doğrulama tamamlandıktan sonra da etiketi kaldırmayın; Google gibi servisler
sahipliği zaman zaman yeniden kontrol eder.

> **Not:** Bu depodaki `robots.txt`, GitHub Pages proje sitelerinde alan adının
> kökünde değil `/Maqruat/` altında yayınlandığından arama motorları tarafından
> okunmaz; zararsızdır, ancak site haritası bu yüzden Search Console'dan elle
> gönderilmelidir.

</details>

### Site haritası ve `lastmod`

`/sitemap-index.xml`, her sayfa için `lastmod` (son değişiklik tarihi) içerir. Arama motorları bu bilgiyle
değişmeyen sayfaları tekrar tekrar taramaz, değişenleri daha çabuk fark eder. Bilgi yalnızca **doğruysa**
işe yarar; bu yüzden "şimdi" yazılmaz, içerik dosyalarının gerçek Git commit tarihlerinden üretilir
(CMS'ten yapılan her kayıt bir commit'tir):

- Bir kitap veya blog sayfası → kendi dosyasının son commit tarihi.
- Diğer tüm sayfalar (ana sayfa, listeler, yazarlar, istatistikler, arşiv…) bu içeriklerden derlendiği için →
  herhangi bir içerik veya ayar dosyasının son commit tarihi.

Git geçmişi okunamıyorsa (Git yok, depo değil ya da sığ klon) `lastmod` hiç yazılmaz; yanlış tarih yazmaktan
iyidir. Bu yüzden dağıtım iş akışı `fetch-depth: 0` ile çalışır. Ayrıntı: `src/lib/lastmod.mjs`.

<details>
<summary><strong>Bağımlılık güncellemelerinin otomatikleştirilmesi</strong> (Dependabot ve CI)</summary>

<br>

Astro, Tailwind gibi paketlerin güncellemelerini elle takip etmemek için üç dosya
bulunur:

- **`.github/dependabot.yml`**: npm paketlerini haftada bir, GitHub Actions sürümlerini ayda bir kontrol eder.
- **`.github/workflows/ci.yml`**: her pull request'i birleştirilmeden önce derler ve tip kontrolünden geçirir.
- **`.github/workflows/dependabot-auto-merge.yml`**: yalnızca kırıcı olmayan (patch ve minor) güncellemeleri, derleme başarılıysa otomatik birleştirir. Major güncellemeler asla otomatik birleştirilmez; ayrı bir PR olarak açık kalır.

**Bir kerelik etkinleştirme (sıra önemli):**

1. **Settings → General → Pull Requests** bölümünde **Allow auto-merge** kutusunu işaretleyin.
2. `ci.yml` dosyasının `main` üzerinde en az bir kez çalıştığını **Actions** sekmesinde doğrulayın. GitHub, bir kontrolü zorunlu olarak seçmenize ancak daha önce çalışmışsa izin verir.
3. **Settings → Branches** bölümünde `main` için bir koruma kuralı ekleyin, **Require status checks to pass before merging** seçeneğini işaretleyip `build-check` kontrolünü seçin. Bu adım olmadan GitHub, derlemenin bitmesini beklemeden birleştirme yapabilir.

</details>

<details>
<summary><strong>Sık karşılaşılan sorunlar</strong></summary>

<br>

- **CSS veya bağlantılar bozuk görünüyor:** `astro.config.mjs` içindeki `site` ve `base` değerlerinin gerçek GitHub Pages adresiyle birebir eşleştiğini kontrol edin (`https://ufukdemiir.github.io` + `/Maqruat`).
- **Admin paneli "Not Found" veriyor:** İlk dağıtım henüz tamamlanmamış olabilir; **Actions** sekmesinde derlemenin yeşil olduğunu doğrulayın.
- **Girişte "Something went wrong" hatası:** `ALLOWED_DOMAINS` değerinin alan adıyla (protokol olmadan) birebir eşleştiğinden ve `config.yml` içindeki `base_url`'in worker adresinizle aynı olduğundan emin olun.
- **Giriş sonrası panel eski depoya bakıyor gibi:** Tarayıcıda `ufukdemiir.github.io` için site verilerini temizleyin ya da gizli pencerede yeniden giriş yapın.
- **Pinterest/Search Console "etiket bulunamadı" diyor:** Değişikliğin yayında olduğundan emin olun (Actions yeşil) ve sayfa kaynağında (`Ctrl+U`) `<meta name="p:domain_verify"` satırını arayın. Tarayıcı ve servis önbelleği nedeniyle bir-iki dakika bekleyip yeniden deneyin.
- **Derleme "Tekrar okuma girilen kitabın durumu…" hatasıyla duruyor:** Hata mesajı hangi kitap dosyasından söz ettiğini gösterir. `rereads` girilen kitabın en üstteki `status` değeri `completed` ya da `dropped` olmalıdır (bkz. [Tekrar okuma](#tekrar-okuma)).
- **Her kitapta "2 kez okundu" görünüyor / istatistikler şişti:** Kitaplarda boş bir `rereads` kaydı (ör. `- status: completed`) kalmış olabilir. Dosyada `rereads:` altındaki tarihsiz, boş kayıtları silin. `config.yml` içinde Tekrar Okumalar alt alanlarına `default:` eklenmediğinden emin olun.
- **Yönetim paneli açılmıyor:** `public/admin/vendor/decap-cms/` klasörünün depoda eksiksiz olduğunu kontrol edin; eksikse `node scripts/update-decap-cms.mjs 3.16.3` ile yeniden kurun.
- **Paylaşım görseli güncellenmiyor:** Sosyal ağlar önizlemeleri önbelleğe alır. Adresi LinkedIn Post Inspector veya Facebook Sharing Debugger ile yeniden taratın.

</details>

<details>
<summary><strong>Depo adı değişirse neler güncellenmeli?</strong></summary>

<br>

GitHub'da bir depoyu yeniden adlandırdığınızda **GitHub Pages adresi de değişir**
ve eski adres yönlendirilmez. Şunları birlikte güncelleyin:

1. `astro.config.mjs` → `BASE_PATH`
2. `public/admin/config.yml` → `repo`, `site_url`, `display_url`
3. GitHub OAuth uygulaması → **Homepage URL**
4. `README.md` ve `package.json` içindeki depo ve site adresleri
5. Yerel klonda: `git remote set-url origin https://github.com/ufukdemiir/<YENİ-AD>.git`
6. Google Search Console'da yeni adres için yeni bir mülk ekleyip site haritasını (`.../sitemap-index.xml`) gönderin

Cloudflare Worker'daki `ALLOWED_DOMAINS` yalnızca alan adını (`ufukdemiir.github.io`)
içerdiği için, alan adı değişmedikçe dokunmak gerekmez.

</details>

## Paylaşım görseli ve marka varlıkları

`public/og-image.png`, bağlantı paylaşımlarında ve bu README'nin başında görünen
1200×630 pikselli kartır. Üç satırdan oluşur: **Maqruat**, *Kişisel okuma takibi
ve kütüphane* ve **Ufuk Demir**; böylece bağlantıyı gören herkes kimin kütüphanesi
olduğunu hemen anlar. Metin bloğu, görselin ortasındaki 630×630'luk karede
kalacak şekilde ortalanmıştır; küçük önizlemeyi kare kırpan uygulamalarda da adı
eksiksiz görünür. Görseli değiştirirseniz bu ölçüyü ve ortalı yerleşimi koruyun.
Sosyal medya kapakları da aynı metin bloğunu kullanır.

Tarayıcı sekmesi ve Google sonuçları için `favicon.svg` ile `favicon-48.png` /
`favicon-96.png` (Google, 48'in katı kare PNG ister), iOS için
`apple-touch-icon.png`, yapılandırılmış veride (`Organization.logo`) kullanılan
`logo.png` da aynı kimliği taşır: deri zemin üzerinde krem italik **M**. Bu
dosyaların kullanım koşulları için bkz. [NOTICE.md](NOTICE.md).

## Katkı

Hata bildirimleri ve kod iyileştirme önerileri için [Issue](https://github.com/ufukdemiir/Maqruat/issues)
açabilirsiniz. İçerik kişisel olduğundan içerik katkısı kabul edilmemektedir.

## Lisans

Kod serbesttir; içerik ve kimlik sahibine aittir.

| Materyal | Durum |
|---|---|
| **Kaynak kod** | [MIT Lisansı](LICENSE): kullanabilir, değiştirebilir ve dağıtabilirsiniz |
| **İçerik** (kitap kayıtları, incelemeler, notlar, blog yazıları) | Tüm hakları saklıdır; bağlantı vermek ve kaynak göstererek kısa alıntı yapmak serbesttir |
| **"Maqruat" adı ve görsel kimliği** (logo, simge, paylaşım görseli) | Tüm hakları saklıdır; kendi projenizde kullanılamaz |
| **Yüklenen görseller** | İlgili hak sahiplerine aittir |
| **Fontlar, yönetim paneli kodu ve bağımlılıklar** | Kendi lisanslarına tabidir (fontlar: SIL OFL 1.1; Decap CMS: MIT) |

Ayrıntılar ve izin verilen kullanımlar için [NOTICE.md](NOTICE.md) dosyasına bakın.

---

<p align="center">© 2026 Ufuk Demir</p>
