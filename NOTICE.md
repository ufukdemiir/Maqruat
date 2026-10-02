# Lisans, telif ve marka bildirimi

Bu depoda farklı nitelikte materyaller bulunur ve her biri farklı koşullara
tabidir. Kısacası: **kod serbesttir; içerik ve kimlik (ad, logo, görseller)
sahibine aittir.** Aşağıdaki tablo özetidir; ayrıntılar altında.

| Materyal | Konum | Durum |
|---|---|---|
| Kaynak kod | `src/` (içerik ve veri klasörleri hariç), `public/admin/`, `.github/`, yapılandırma dosyaları | [MIT Lisansı](LICENSE) |
| Kişisel içerik | `src/content/`, `src/data/` | Tüm hakları saklıdır (bkz. §2) |
| Ad ve görsel kimlik | "Maqruat" adı, `public/favicon*`, `public/apple-touch-icon.png`, `public/logo.png`, `public/og-image.png` | Tüm hakları saklıdır (bkz. §3) |
| Yüklenen görseller | `public/uploads/` | İlgili hak sahiplerine aittir |
| Fontlar | `src/lib/pdf/fonts/` | SIL Open Font License 1.1 |
| Bağımlılıklar | `node_modules/` (depoda bulunmaz) | Her paketin kendi lisansı |

## 1. Kaynak kod: MIT Lisansı

Sitenin kaynak kodu (Astro bileşenleri, sayfalar, `src/lib/` altındaki
yardımcılar, yapılandırma dosyaları ve GitHub Actions iş akışları)
[MIT Lisansı](LICENSE) ile sunulur. Lisans metnindeki tek koşul, telif ve lisans
bildiriminin kodun kopyalarında korunmasıdır. Bu koşula uyarak kodu
kullanabilir, değiştirebilir, ticari projelerde de dahil olmak üzere dağıtabilir
ve kendi projenizin parçası yapabilirsiniz.

MIT Lisansı **yalnızca koda** uygulanır. Aşağıdaki §2, §3 ve §4'teki
materyalleri kapsamaz; bir kodu kullanma hakkı, o kodla birlikte duran içeriği ya
da markayı kullanma hakkı doğurmaz.

## 2. Kişisel içerik: tüm hakları saklıdır

Aşağıdaki materyaller MIT Lisansı'nın **kapsamı dışındadır**. Aksi açıkça
belirtilmedikçe tüm hakları saklıdır:

- `src/content/`: kitap kayıtları, incelemeler, notlar, alıntı seçkileri ve blog yazıları
- `src/data/`: kişisel bilgiler ve site ayarları

**İzin verilenler** (ayrıca izin istemeniz gerekmez):

- Sayfalara bağlantı vermek ve bağlantıyı paylaşmak (sitedeki paylaşım düğmeleri bunun içindir).
- Bir inceleme, not ya da yazıdan kısa alıntı yapmak; **yazar adını (Ufuk Demir / Maqruat) belirtmek ve kaynak sayfaya bağlantı vermek** koşuluyla.
- "Arşivi indir" ile indirilen JSON, CSV ve PDF dosyalarını kişisel ve ticari olmayan amaçlarla kullanmak ve saklamak.

**İzin gerektirenler:** içeriklerin (veya önemli bölümlerinin) başka bir sitede,
kitapta ya da platformda yeniden yayımlanması, çevrilip yayımlanması, ticari
amaçla kullanılması ve yapay zekâ modellerini eğitmek amacıyla toplu olarak
derlenmesi.

Kitaplardan yapılan kısa alıntılar, ilgili kitabın kaydı altında, kitap ve sayfa
bilgisiyle birlikte inceleme/değerlendirme amacıyla yer alır. Alıntılanan
eserlerin hakları kendi sahiplerine aittir.

Bu depoyu şablon olarak kullanmak isterseniz yukarıdaki klasörlerdeki içerikleri
silip kendi içeriğinizle değiştirmeniz gerekir.

## 3. Ad ve görsel kimlik

**"Maqruat" adı**, logo ve simge dosyaları (`public/favicon.svg`,
`public/favicon-*.png`, `public/apple-touch-icon.png`, `public/logo.png`),
paylaşım görseli (`public/og-image.png`) ve @Maqruat adıyla açılmış sosyal medya
hesapları bu projenin kimliğini oluşturur. MIT Lisansı bu öğeler için marka veya
kullanım hakkı **vermez**.

- **Yapabilirsiniz:** Projeden söz etmek, bağlantı vermek, "Maqruat'ın açık kaynak kodundan türetilmiştir" gibi doğru ve açıklayıcı bir atıf yapmak.
- **Yapamazsınız:** Adı ya da görsel kimliği kendi sitenizin, uygulamanızın veya hesabınızın adı/logosu olarak kullanmak; resmî bir ilişki varmış izlenimi veren her türlü kullanım.

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

## 6. GitHub üzerinde kullanım

Depo herkese açık olduğundan, GitHub'ın Hizmet Şartları gereği herkes depoyu
GitHub üzerinde görüntüleyebilir ve çatallayabilir (fork). Bu hak, yukarıdaki
kısıtlamaları (içerik ve kimlik için) ortadan kaldırmaz: bir çatalda da §2 ve §3
geçerlidir.

## İzin talepleri

Yukarıdaki kısıtlamalar kapsamındaki bir kullanım için izin istemek ya da bir
telif/marka konusunda iletişime geçmek için GitHub üzerinden
[@ufukdemiir](https://github.com/ufukdemiir) ile iletişime geçebilir veya
[Issues](https://github.com/ufukdemiir/Maqruat/issues) bölümünden yazabilirsiniz.
