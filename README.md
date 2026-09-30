# Maqruat

[![Yayın durumu](https://github.com/ufukdemiir/Maqruat/actions/workflows/deploy.yml/badge.svg)](https://github.com/ufukdemiir/Maqruat/actions/workflows/deploy.yml)
[![Lisans: MIT](https://img.shields.io/badge/lisans-MIT-blue.svg)](LICENSE)

**Maqruat**, Ufuk Demir'in kişisel okuma günlüğü ve kütüphane platformudur;
tamamen statik, hızlı, SEO odaklı bir [Astro](https://astro.build) sitesidir.
İçerik [Decap CMS](https://decapcms.org) üzerinden Git tabanlı olarak yönetilir
ve [GitHub Pages](https://pages.github.com) üzerinde ücretsiz olarak yayınlanır.

**Canlı site:** <https://ufukdemiir.github.io/Maqruat/>

## Özellikler

- **Kitap kütüphanesi:** okunuyor / okundu / okunacak / yarım bırakıldı durumları, puan, tür, sayfa sayısı ve başlangıç–bitiş tarihleri
- **Yazarlar, alıntılar, incelemeler ve notlar:** kitap kayıtlarından otomatik olarak oluşan ayrı sayfalar
- **Blog:** kitaplarla doğrudan ilgili olmayan yazılar için
- **İstatistikler:** yıllık sayfalar ve grafikler, yıllık okuma hedefi ilerleme çubuğu, aylık özet
- **Arşivi indir:** sitedeki tüm içerik JSON, CSV ve PDF olarak indirilebilir
- **Global arama:** `Ctrl/Cmd+K` ile açılan, Türkçe karaktere duyarlı bulanık arama
- **Rastgele seçim:** rastgele kitap, alıntı, inceleme, not ve blog yazısı
- **Açık/koyu tema** ve paylaşım düğmeleri
- **SEO:** site haritası, `robots.txt`, canonical bağlantılar, Open Graph / Twitter kartları ve JSON-LD yapılandırılmış veri (WebSite, Person, Book, Review, BreadcrumbList)

## Teknoloji

- **Framework:** Astro (Static Site Generation)
- **Stil:** Tailwind CSS v4
- **İçerik:** Markdown + Astro Content Collections (type-safe)
- **CMS:** Decap CMS (GitHub OAuth ile, Cloudflare Worker üzerinden)
- **Arama:** İstemci taraflı, Fuse.js
- **Grafikler:** Chart.js
- **Barındırma:** GitHub Pages + GitHub Actions

---

## 1. Gereksinimler

- [Node.js](https://nodejs.org) **22.12 veya üzeri**
- (CMS kullanmak için) Ücretsiz bir [Cloudflare](https://cloudflare.com) hesabı

## 2. Yerel kurulum

```bash
git clone https://github.com/ufukdemiir/Maqruat.git
cd Maqruat
npm install
npm run dev
```

Site `http://localhost:4321/Maqruat/` adresinde açılır (proje GitHub Pages'te
alt yolda yayınlandığı için yerelde de `/Maqruat/` önekiyle çalışır). Üretim
derlemesi için:

```bash
npm run build      # ./dist klasörüne statik siteyi üretir
npm run preview    # üretilen siteyi yerelde önizler
npm run check      # Astro tip kontrolü
```

## 3. Proje yapısı

```
├── src/
│   ├── content.config.ts     # Content Collections şeması (books, blog, settings)
│   ├── content/books/*.md    # Her dosya bir kitap
│   ├── content/blog/*.md     # Her dosya bir blog yazısı
│   ├── data/site.json        # Okur bilgileri, avatar, yıllık hedef, sosyal linkler (DÜZ JSON — bkz. aşağıdaki not)
│   ├── components/           # Header, SearchModal, BookCard, vb.
│   ├── layouts/BaseLayout.astro
│   ├── lib/                  # Veri sorguları, istatistik, slug, tarih, PDF/CSV/JSON dışa aktarma yardımcıları
│   └── pages/                # Tüm rotalar (/, /arsiv, /kitaplar/[slug], ...)
├── public/
│   ├── admin/                # Decap CMS (config.yml + index.html)
│   ├── uploads/              # CMS Medya Kütüphanesi'ne yüklenen görseller
│   └── favicon.svg, og-image.png, ...
├── .github/                  # Dağıtım, CI ve Dependabot iş akışları
├── LICENSE                   # MIT (kaynak kod)
└── NOTICE.md                 # İçerik, marka ve üçüncü taraf bildirimi
```

> **Astro sürüm notu:** İçerik yapılandırma dosyası bilinçli olarak
> `src/content/config.ts` yerine **`src/content.config.ts`** konumuna
> yerleştirildi. Güncel Astro sürümlerinde (Content Layer API) dosya eski
> konumda olursa derleme hata verir; doğru ve çalışan konum budur.

## 4. İçerik ekleme

`src/content/books/` klasöründeki kayıtlar, sitenin tüm özelliklerini
(okunuyor/okundu/okunacak/yarım bırakıldı durumları, alıntılar, notlar,
istatistikler) gösterebilmek için eklenmiş **örnek/demo** verileri içerir.
Kendi kütüphanenizi oluştururken bu dosyaları silip yerine kendi kitaplarınızı
ekleyebilir ya da CMS panelinden düzenleyebilirsiniz.

Yeni bir kitap eklemenin iki yolu vardır:

1. **Decap CMS panelinden** (`/admin`) — kod bilmeden, formlar üzerinden.
2. **Elle Markdown dosyası ekleyerek** — `src/content/books/` klasörüne
   aşağıdaki gibi bir `.md` dosyası eklemeniz yeterli:

```md
---
title: "Kitabın Adı"
author: "Yazar Adı"
publisher: "Yayınevi"
pageCount: 250
startDate: 2026-09-01
endDate: 2026-09-10
status: "completed" # reading | completed | want-to-read | dropped
rating: 8
genres: ["Roman"]
notes: ["Kısa bir not."]
quotes:
  - text: "Seçtiğiniz alıntı."
    page: 42
---

İncelemenizi buraya Markdown olarak yazın.
```

## 5. Yapılandırma

Bu deponun yayın adresi ve CMS ayarları şu üç dosyada tanımlıdır:

| Dosya | Mevcut değer / ne içerir |
|---|---|
| `astro.config.mjs` | `SITE_URL = "https://ufukdemiir.github.io"`, `BASE_PATH = "/Maqruat"` |
| `public/admin/config.yml` | `repo: ufukdemiir/Maqruat`, `site_url` / `display_url: https://ufukdemiir.github.io/Maqruat`, `base_url` (OAuth Worker adresi) |
| `src/data/site.json` | Okur adı, biyografi, yıllık okuma hedefi, sosyal linkler |

> **`site.json` biçimi hakkında önemli not:** Bu dosya **düz** bir JSON nesnesidir — alanlar
> (`readerName`, `tagline`, `avatar`, `social`, …) doğrudan kökte durur; `"main"` gibi bir
> sarmalayıcı anahtar **yoktur ve eklenmemelidir**. Decap CMS bu dosyayı tam olarak bu
> biçimde okur ve yazar. Astro tarafında girdi kimliği (`"main"`) dosyanın içinde değil,
> `src/lib/singleFileLoader.ts` tarafından atanır. Dosyayı elle düzenlerseniz düz yapıyı koruyun.

**Kendi kopyanızı kurarsanız:** `SITE_URL` ve `BASE_PATH` değerlerini kendi GitHub
kullanıcı adınıza ve depo adınıza göre değiştirin.

- Depo adı `kullanici-adi.github.io` ise: `site: "https://kullanici-adi.github.io"`, `base: "/"`
- Depo adı farklıysa (ör. `depo-adi`): `site: "https://kullanici-adi.github.io"`, `base: "/depo-adi"`

(Bu projenin adı, logosu ve içeriği için bkz. [Lisans](#lisans).)

## 6. GitHub Pages'e dağıtım

1. Depo **Settings → Pages** sayfasında **Source** olarak **GitHub Actions**'ı seçin.
2. `main` branch'e her push'ta `.github/workflows/deploy.yml` otomatik
   olarak siteyi derleyip yayınlar (ilk yayın birkaç dakika sürebilir).
3. Elle tetiklemek isterseniz **Actions** sekmesinden workflow'u
   *"Run workflow"* ile de başlatabilirsiniz.

Decap CMS panelinden yapılan her kayıt da `main` branch'ine commit atar ve bu
iş akışını otomatik olarak tetikler.

## 7. Decap CMS için GitHub OAuth Kurulumu (ücretsiz)

GitHub Pages, Netlify'ın aksine yerleşik bir CMS girişi (OAuth) sunmaz.
Bunun için ücretsiz bir **Cloudflare Worker** ile küçük bir "OAuth
gateway" çalıştırıyoruz. Aşağıda [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)
projesi kullanılmıştır — Decap CMS ile de tam uyumludur ve Netlify
gerektirmez.

### Adım 1 — Worker'ı Cloudflare'e dağıtın

- [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) deposundaki
  **"Deploy to Cloudflare Workers"** butonuna tıklayıp Cloudflare
  hesabınızla dağıtın (ya da depoyu klonlayıp yerelde `wrangler deploy`
  çalıştırın).
- Dağıtım tamamlanınca Cloudflare panelinde worker'ınızın adresini
  göreceksiniz: `https://sveltia-cms-auth.<SIZIN-ALT-ALAN-ADINIZ>.workers.dev`
  Bu adresi not edin.

### Adım 2 — GitHub OAuth uygulaması oluşturun

GitHub'da **Settings → Developer settings → OAuth Apps → New OAuth App**
üzerinden yeni bir uygulama kaydedin:

- **Application name:** Maqruat CMS (istediğiniz bir isim)
- **Homepage URL:** `https://ufukdemiir.github.io/Maqruat/`
- **Authorization callback URL:** `<WORKER_ADRESINIZ>/callback`
  (ör. `https://sveltia-cms-auth.xxxx.workers.dev/callback`)

Kaydettikten sonra **"Generate a new client secret"** ile bir client
secret oluşturun. **Client ID** ve **Client Secret** değerlerini
kaydedin — bir daha secret'ı göremezsiniz.

### Adım 3 — Worker'a ortam değişkenlerini ekleyin

Cloudflare panelinde worker'ınızın **Settings → Variables** kısmına şu
değişkenleri ekleyin:

| Değişken | Değer |
|---|---|
| `GITHUB_CLIENT_ID` | Adım 2'deki Client ID |
| `GITHUB_CLIENT_SECRET` | Adım 2'deki Client Secret (**Encrypt** işaretleyin) |
| `ALLOWED_DOMAINS` | Sitenizin barındığı alan adı: `ufukdemiir.github.io` (protokol ve yol olmadan) |

Değişiklikleri kaydettikten sonra worker otomatik olarak yeniden dağıtılır.

### Adım 4 — `config.yml`'i kontrol edin

`public/admin/config.yml` içinde:

```yaml
backend:
  name: github
  repo: ufukdemiir/Maqruat
  branch: main
  base_url: https://sveltia-cms-auth.xxxx.workers.dev   # kendi worker adresiniz
  auth_endpoint: auth
```

Değişikliği push'layıp site yeniden yayınlandıktan sonra
<https://ufukdemiir.github.io/Maqruat/admin/> adresine gidip GitHub
hesabınızla giriş yapabilirsiniz.

> **Not:** Decap CMS panelinin kendi arayüz metinleri (düğmeler, menüler)
> için `config.yml` içinde `locale: "tr"` ayarlanmıştır. Kullandığınız
> Decap CMS sürümünde Türkçe arayüz çevirisi henüz yoksa panel otomatik
> olarak İngilizce arayüze döner — bu bir hata değildir. Bu projede
> tanımlanan tüm alan adları (başlık, yazar, durum vb.) zaten
> Türkçe'dir ve bundan etkilenmez.

## 8. Global arama nasıl çalışır?

Derleme sırasında `src/pages/search-index.json.ts`, tüm kitapları,
yazarları, alıntıları, incelemeleri ve notları tek bir statik JSON
dosyasında toplar. Tarayıcıda `Ctrl/Cmd+K` ile açılan pencere bu dosyayı
bir kez indirir ve [Fuse.js](https://www.fusejs.io) ile anlık, Türkçe
karaktere duyarlı bulanık arama yapar. Fuse.js'in, [Pagefind](https://pagefind.app)
gibi hazır çözümlere tercih edilme nedeni, sonuçları
kitap/yazar/alıntı/inceleme/not olarak gruplandıran özel filtre arayüzü
üzerinde tam kontrol sağlamasıdır.

## 9. Sık karşılaşılan sorunlar

- **CSS/bağlantılar bozuk görünüyor:** `astro.config.mjs` içindeki `site`
  ve `base` değerlerinin gerçek GitHub Pages adresinizle birebir
  eşleştiğinden emin olun (`https://ufukdemiir.github.io` + `/Maqruat`).
- **Admin paneli "Not Found" veriyor:** GitHub Pages henüz ilk
  dağıtımını tamamlamamış olabilir; Actions sekmesinden build'in yeşil
  olduğunu doğrulayın.
- **Girişte "Something went wrong" hatası:** `ALLOWED_DOMAINS` değerinin
  sitenizin gerçek alan adıyla (protokol olmadan) birebir eşleştiğinden
  ve `config.yml`'deki `base_url`'in worker adresinizle aynı olduğundan
  emin olun.
- **Giriş sonrası panel eski depoya/eski verilere bakıyor gibi:** Tarayıcıda
  `ufukdemiir.github.io` için site verilerini temizleyip (veya gizli pencerede
  deneyip) yeniden giriş yapın.

## 10. Depo adı değişirse neler güncellenmeli?

GitHub'da bir depoyu yeniden adlandırırsanız **GitHub Pages adresi de değişir**
ve eski adres açılmaz. Şu noktaları birlikte güncelleyin:

1. `astro.config.mjs` → `BASE_PATH`
2. `public/admin/config.yml` → `repo`, `site_url`, `display_url`
3. GitHub OAuth Uygulaması → **Homepage URL** (Settings → Developer settings → OAuth Apps)
4. Yerel klonunuzda: `git remote set-url origin https://github.com/ufukdemiir/<YENI-AD>.git`
5. Google Search Console'da yeni adres için yeni bir mülk ekleyip site haritasını
   (`…/sitemap-index.xml`) gönderin; sosyal medya/profil bağlantılarını yenileyin.

Cloudflare Worker tarafında (`ALLOWED_DOMAINS`) alan adı (`ufukdemiir.github.io`)
değişmediği sürece bir işlem gerekmez.

## 11. Bağımlılık güncellemelerinin otomatikleştirilmesi ("kur ve unut")

Astro, Tailwind gibi paketlerin güncellemesini elle takip etmemeniz için
depoya üç dosya eklendi:

- **`.github/dependabot.yml`** — npm paketlerini haftada bir, GitHub
  Actions sürümlerini ayda bir kontrol eder.
- **`.github/workflows/ci.yml`** — her pull request'i (Dependabot'unkiler
  dahil) birleştirilmeden önce gerçekten derler ve tip kontrolünden
  geçirir.
- **`.github/workflows/dependabot-auto-merge.yml`** — yalnızca **kırıcı
  olmayan** (patch/minor) güncellemeleri, derleme başarılıysa otomatik
  onaylayıp birleştirir. **Major** (büyük) sürüm güncellemeleri asla
  otomatik birleştirilmez; ayrı bir PR olarak açık kalır ve siz uygun
  gördüğünüzde ele alırsınız.

Deploy iş akışı zaten "önce derle, yalnızca başarılıysa yayınla"
şeklinde çalıştığından, bir güncelleme siteyi bozsa bile **canlı site asla
bozuk hâliyle güncellenmez** — son çalışan sürüm yayında kalmaya devam
eder.

### Bir kerelik etkinleştirme adımları

Bu sistemin gerçekten otomatik çalışabilmesi için GitHub deposu
ayarlarında birkaç şeyi bir kez yapmanız gerekiyor. **Sıra önemli:**

1. **Settings → General → Pull Requests** bölümünde **"Allow auto-merge"**
   kutucuğunu işaretleyin.
2. `.github/workflows/ci.yml` dosyasını `main` branch'ine push'layın
   (veya zaten push'ladıysanız bu adımı atlayın) ve **Actions**
   sekmesinden "Derleme Kontrolü (PR)" çalışmasının bir kez tamamlandığını
   (yeşil tik) doğrulayın. Bu adım şart: GitHub, bir kontrolü zorunlu
   olarak seçtirebilmeniz için onu daha önce en az bir kez çalışmış
   görmüş olmalı — aksi hâlde bir sonraki adımdaki listede hiç görünmez.
3. **Settings → Branches** üzerinden `main` için bir koruma kuralı
   ekleyin (**Add branch protection rule**), **"Require status checks to
   pass before merging"** seçeneğini işaretleyip arama kutusuna `build`
   yazın ve çıkan **`build-check`** kontrolünü seçin.

Üçüncü adım kritik: onsuz GitHub, derlemenin bitmesini beklemeden
birleştirme yapabilir. Bu ayarları yaptıktan sonra hiçbir şey yapmanıza
gerek kalmaz — küçük güncellemeler kendiliğinden akacak, büyük olanlar
ise size haber vermeden hiçbir şeyi değiştirmeyecektir.

## Lisans

- **Kaynak kod:** [MIT Lisansı](LICENSE)
- **İçerik** (kitap kayıtları, incelemeler, notlar, blog yazıları, yüklenen görseller),
  **"Maqruat" adı ve görsel kimliği** MIT kapsamı dışındadır; tüm hakları saklıdır.
- **Fontlar ve bağımlılıklar** kendi lisanslarına tabidir.

Ayrıntılar için bkz. [NOTICE.md](NOTICE.md).

---

© 2026 Maqruat — Ufuk Demir
