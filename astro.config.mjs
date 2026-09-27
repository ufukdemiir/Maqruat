// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import { rehypeBasePathImages } from "./src/lib/rehype-base-path-images.mjs";

// Okurken — GitHub Pages üzerinde tamamen statik olarak yayınlanır.
//
// ÖNEMLİ: Aşağıdaki `site` ve `base` değerlerini kendi GitHub kullanıcı
// adınıza ve depo adınıza göre güncelleyin.
//   - Depo adı "kullaniciadi.github.io" ise: site: "https://kullaniciadi.github.io", base: "/"
//   - Depo adı farklıysa (ör. "okurken"): site: "https://kullaniciadi.github.io", base: "/okurken"
const SITE_URL = "https://ufukdemiir.github.io";
const BASE_PATH = "/Okurken";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: "static",
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  markdown: {
    // Astro 7 varsayılan olarak Markdown'ı kendi yerli "Sätteri" motoruyla
    // işler; bu motor remark/rehype eklentilerini ÇALIŞTIRMAZ. Kendi
    // eklentimizi (aşağıda) kullanabilmek için işlemciyi açıkça klasik
    // unified/remark-rehype hattına döndürüyoruz — bu, Astro'nun kendi
    // önerdiği, güncel/kalıcı yöntemdir (bkz. @astrojs/markdown-remark).
    //
    // Eklentinin amacı: CMS'in Medya Kütüphanesi'nden blog/inceleme
    // metinlerine eklenen görseller "/uploads/..." gibi kök-göreli bir
    // adresle kaydedilir. GitHub Pages siteyi BASE_PATH alt yolunda
    // yayınladığından, bu eklenti derleme anında söz konusu adreslerin
    // başına otomatik olarak BASE_PATH'i ekler (bkz.
    // src/lib/rehype-base-path-images.mjs). Böylece içerik yazarı hiçbir
    // şey değiştirmeden, eklenen her görsel canlıda da doğru görünür.
    processor: unified({
      rehypePlugins: [[rehypeBasePathImages, BASE_PATH]],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
