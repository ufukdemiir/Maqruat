# Lisans, telif ve marka bildirimi

Bu depoda farklı nitelikte materyaller bulunur ve her biri farklı koşullara
tabidir. Aşağıdaki tablo özetidir; ayrıntılar altında.

| Materyal | Konum | Durum |
|---|---|---|
| Kaynak kod | `src/` (içerik ve veri klasörleri hariç), `public/admin/`, `.github/`, yapılandırma dosyaları | [MIT Lisansı](LICENSE) |
| Kişisel içerik | `src/content/`, `src/data/` | Tüm hakları saklıdır |
| Ad ve görsel kimlik | "Maqruat" adı, `public/favicon*`, `public/apple-touch-icon.png`, `public/og-image.png` | İzinsiz kullanılamaz |
| Yüklenen görseller | `public/uploads/` | İlgili hak sahiplerine aittir |
| Fontlar | `src/lib/pdf/fonts/` | SIL Open Font License 1.1 |
| Bağımlılıklar | `node_modules/` (depoda bulunmaz) | Her paketin kendi lisansı |

## 1. Kaynak kod: MIT Lisansı

Sitenin kaynak kodu (Astro bileşenleri, sayfalar, `src/lib/` altındaki
yardımcılar, yapılandırma dosyaları ve GitHub Actions iş akışları)
[MIT Lisansı](LICENSE) ile sunulur. Lisans metnindeki koşullara uyarak kodu
kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## 2. Kişisel içerik: tüm hakları saklıdır

Aşağıdaki materyaller MIT Lisansı'nın **kapsamı dışındadır**. Aksi açıkça
belirtilmedikçe tüm hakları saklıdır; izin almadan kopyalanamaz, yeniden
yayımlanamaz veya başka bir sitede kullanılamaz:

- `src/content/`: kitap kayıtları, incelemeler, notlar, alıntı seçkileri ve blog yazıları
- `src/data/`: kişisel bilgiler ve site ayarları

Kitaplardan yapılan kısa alıntılar, ilgili kitabın kaydı altında, kitap ve
sayfa bilgisiyle birlikte inceleme/değerlendirme amacıyla yer alır. Alıntılanan
eserlerin hakları kendi sahiplerine aittir.

Bu depoyu şablon olarak kullanmak isterseniz yukarıdaki klasörlerdeki içerikleri
silip kendi içeriğinizle değiştirmeniz gerekir.

## 3. Ad ve görsel kimlik

**"Maqruat" adı**, logo/simge dosyaları (`public/favicon.svg`,
`public/favicon-*.png`, `public/apple-touch-icon.png`) ve paylaşım görseli
(`public/og-image.png`) bu projenin kimliğini oluşturur. MIT Lisansı bu öğeler
için marka veya kullanım hakkı **vermez**.

Bu projeden türetilmiş kendi sitenizi yayımlarsanız lütfen başka bir ad ve kendi
görsellerinizi kullanın.

## 4. Yüklenen görseller

`public/uploads/` klasörüne CMS üzerinden yüklenen görsellerin hakları ilgili
hak sahiplerine aittir. Bu görseller MIT Lisansı kapsamında lisanslanmış
sayılmaz.

## 5. Üçüncü taraf bileşenler

- **Fontlar:** Source Serif 4 ve Plus Jakarta Sans, SIL Open Font License 1.1 ile
  lisanslıdır. Lisans metinleri `src/lib/pdf/fonts/licenses/` altındadır.
- **npm bağımlılıkları:** Astro, Tailwind CSS, Fuse.js, Chart.js, pdfmake ve diğer
  paketlerin her biri kendi lisansına tabidir (bkz. `package.json`).

## İzin talepleri

Yukarıdaki kısıtlamalar kapsamındaki bir kullanım için izin istemek ya da bir
telif/marka konusunda iletişime geçmek için GitHub üzerinden
[@ufukdemiir](https://github.com/ufukdemiir) ile iletişime geçebilirsiniz.
