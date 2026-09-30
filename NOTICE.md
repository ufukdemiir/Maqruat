# Telif, marka ve üçüncü taraf bildirimi

Bu depoda farklı nitelikte üç grup materyal bulunur ve her biri farklı koşullara
tabidir.

## 1. Kaynak kod — MIT Lisansı

Sitenin kaynak kodu (Astro bileşenleri, sayfalar, `src/lib/` altındaki yardımcı
kodlar, yapılandırma dosyaları ve GitHub Actions iş akışları)
[MIT Lisansı](LICENSE) ile sunulur. Kodu, lisans metnindeki koşullara uyarak
serbestçe kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## 2. Kişisel içerik — Tüm hakları saklıdır

Aşağıdaki materyaller MIT Lisansı'nın **kapsamı dışındadır**; aksi açıkça
belirtilmedikçe tüm hakları saklıdır. İzin almadan kopyalanamaz, yeniden
yayımlanamaz veya kendi sitenizde kullanılamaz:

- `src/content/` — kitap kayıtları, incelemeler, notlar, alıntı seçkileri ve blog yazıları
- `src/data/` — kişisel bilgiler ve site ayarları
- `public/uploads/` — yüklenen görseller

İçerik, Ufuk Demir'e aittir. Kitap kapağı görselleri ve kitaplardan yapılan
alıntılar gibi üçüncü taraf materyallerin hakları ise kendi hak sahiplerine
aittir.

Bu depoyu şablon olarak kullanmak isterseniz yukarıdaki klasörlerdeki içerikleri
silip kendi içeriğinizle değiştirmeniz gerekir.

## 3. Ad ve görsel kimlik — İzinsiz kullanılamaz

**"Maqruat" adı**, site logosu/simgeleri (`public/favicon.svg`,
`public/favicon-*.png`, `public/apple-touch-icon.png`) ve paylaşım görseli
(`public/og-image.png`) Ufuk Demir'in marka ve görsel kimliğini oluşturur.
MIT Lisansı bu öğeler üzerinde herhangi bir hak vermez.

Bu projeden türetilmiş kendi sitenizi yayımlarsanız lütfen başka bir ad ve
kendi görsellerinizi kullanın.

## 4. Üçüncü taraf bileşenler

- **Fontlar:** `src/lib/pdf/fonts/` klasöründeki Source Serif 4 ve Plus Jakarta
  Sans, SIL Open Font License 1.1 ile lisanslıdır. Lisans metinleri
  `src/lib/pdf/fonts/licenses/` altındadır.
- **npm bağımlılıkları:** Astro, Tailwind CSS, Fuse.js, Chart.js, pdfmake vb.
  paketlerin her biri kendi lisansına tabidir (bkz. `package.json`).
