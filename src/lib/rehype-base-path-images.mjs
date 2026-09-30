/**
 * GitHub Pages bu projeyi bir alt yolda yayınlıyor (ör. "/Maqruat"; bkz.
 * astro.config.mjs → BASE_PATH). Astro'nun `base` ayarı, kendi ürettiği TÜM
 * bağlantı ve varlık yollarına (Header, Footer, BaseHead, withBase() vb.)
 * bu ön eki otomatik ekler — ANCAK Markdown içeriğinin (blog yazıları,
 * kitap incelemeleri) GÖVDESİNE CMS panelinden eklenen görseller bu
 * otomatik işlemin DIŞINDADIR, çünkü onlar Astro bileşeni değil, düz metin
 * olarak saklanan Markdown kaynağıdır.
 *
 * Bu rehype eklentisi, oluşturulan HTML ağacındaki (hast) TÜM <img>
 * etiketlerini (hem `![alt](/uploads/x.jpg)` Markdown söz dizimi hem de
 * doğrudan yapıştırılmış `<img src="/uploads/x.jpg">` HTML için) gezip,
 * kök-göreli ("/" ile başlayan) `src` değerlerinin başına derleme anındaki
 * BASE_PATH'i ekler. Böylece CMS'in Medya Kütüphanesi'nden eklenen HER
 * görsel — bugün de, `astro.config.mjs`'teki BASE_PATH ileride değişirse de
 * (ör. depo adı değişirse) — otomatik olarak doğru, çalışan bir adrese
 * sahip olur; içerik yazarının bunu hiç düşünmesine gerek kalmaz.
 *
 * Zaten `withBase()` ile üretilmiş (doğru ön eki taşıyan), harici (http/https)
 * ya da "data:" gömülü görseller olduğu gibi bırakılır — çift ön ek eklenmez.
 */
export function rehypeBasePathImages(basePath) {
  const prefix = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;

  function shouldPrefix(src) {
    if (typeof src !== "string" || src.length === 0) return false;
    if (!src.startsWith("/") || src.startsWith("//")) return false; // harici/protokol-göreli değil, sadece kök-göreli
    if (!prefix) return false; // base "/" ise eklenecek bir şey yok
    if (src === prefix || src.startsWith(`${prefix}/`)) return false; // zaten doğru ön ekle geliyor (çift eklemeyi önle)
    return true;
  }

  function walk(node) {
    if (node && node.type === "element") {
      if (node.tagName === "img" && node.properties) {
        if (typeof node.properties.src === "string" && shouldPrefix(node.properties.src)) {
          node.properties.src = `${prefix}${node.properties.src}`;
        }
        // Performans/SEO: içerik görselleri ekranın en üstünde olmadığından
        // (bu site hiçbir yazıda "hero" görseli kullanmaz) tembel yüklemek
        // her zaman güvenlidir; bu da sayfa hızını ve dolayısıyla SEO'yu
        // olumlu etkiler. Yazar zaten "loading"/"decoding" belirtmişse
        // (nadiren) ona dokunulmaz.
        if (node.properties.loading === undefined) node.properties.loading = "lazy";
        if (node.properties.decoding === undefined) node.properties.decoding = "async";
      }
      // Kaynağa bağlı gömülü görseller (nadir ama olası) için de aynı mantık.
      if (node.tagName === "source" && node.properties && typeof node.properties.srcSet === "string") {
        // srcSet birden fazla adres içerebilir; şimdilik tek adresli basit durumu kapsıyoruz.
        if (shouldPrefix(node.properties.srcSet)) {
          node.properties.srcSet = `${prefix}${node.properties.srcSet}`;
        }
      }
    }
    if (node && Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  }

  return (tree) => {
    walk(tree);
  };
}
