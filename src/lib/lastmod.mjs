// Site haritası (sitemap) için "son değişiklik" (lastmod) tarihleri.
//
// lastmod, arama motorlarına "bu sayfa en son ne zaman DEĞİŞTİ" bilgisini verir;
// böylece değişmemiş sayfaları tekrar tekrar taramazlar, değişenleri daha
// çabuk fark ederler. Değer DOĞRU olmalıdır: her derlemede "şimdi" yazmak,
// arama motorlarının bu alana güvenmeyi bırakmasına yol açar.
//
// Bu yüzden tarihler içerik dosyalarının gerçek Git commit tarihlerinden gelir
// (CMS'ten yapılan her kayıt bir commit'tir):
//   - Bir kitap/blog sayfası  → kendi dosyasının son commit tarihi.
//   - Diğer tüm sayfalar (ana sayfa, listeler, yazarlar, istatistikler, arşiv…)
//     bu içeriklerden derlenir → herhangi bir içerik/ayar dosyasının son commit tarihi.
//
// Git geçmişi güvenilir biçimde okunamıyorsa (Git yok, depo değil ya da
// "shallow" klon) lastmod HİÇ yazılmaz: yanlış tarih yazmaktan iyidir.
// Dağıtım iş akışı bu yüzden `fetch-depth: 0` ile çalışır.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIRS = ["src/content", "src/data"];

function git(root, args) {
  return execFileSync("git", ["-C", root, ...args], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
    stdio: ["ignore", "pipe", "ignore"],
  });
}

/**
 * İçerik dosyalarının son commit tarihlerini döndürür; güvenilir değilse null.
 * @returns {{ files: Map<string, Date>, latest: Date } | null}
 */
export function loadContentDates(root = process.cwd()) {
  try {
    if (git(root, ["rev-parse", "--is-inside-work-tree"]).trim() !== "true") return null;
    if (git(root, ["rev-parse", "--is-shallow-repository"]).trim() !== "false") return null;

    // En yeni commit önce gelir; bir dosyanın İLK görüldüğü tarih, son değişiklik tarihidir.
    const log = git(root, ["log", "--format=%x00%cI", "--name-only", "--", ...CONTENT_DIRS]);
    const files = new Map();
    for (const chunk of log.split("\0")) {
      const lines = chunk.split("\n");
      const date = new Date(lines[0].trim());
      if (Number.isNaN(date.getTime())) continue;
      for (const line of lines.slice(1)) {
        const file = line.trim();
        if (!file || files.has(file)) continue;
        if (existsSync(join(root, file))) files.set(file, date); // silinmiş dosyaları yok say
      }
    }
    if (files.size === 0) return null;
    const latest = new Date(Math.max(...[...files.values()].map((d) => d.getTime())));
    return { files, latest };
  } catch {
    return null;
  }
}

/**
 * Bir sitemap adresi için lastmod tarihi. `pathname`, base yolu soyulmuş
 * hâliyle gelir (ör. "/kitaplar/tutunamayanlar/").
 */
export function lastmodFor(pathname, dates) {
  const detail = pathname.match(/^\/(kitaplar|blog)\/([^/]+)\/?$/);
  if (detail) {
    const folder = detail[1] === "kitaplar" ? "books" : "blog";
    const own = dates.files.get(`src/content/${folder}/${decodeURIComponent(detail[2])}.md`);
    if (own) return own;
  }
  return dates.latest;
}

/**
 * @astrojs/sitemap `serialize` seçeneği için üretici.
 * @param {string} basePath  ör. "/Maqruat"
 */
export function createSitemapSerializer(basePath, root = process.cwd()) {
  const dates = loadContentDates(root);
  return (item) => {
    if (!dates) return item;
    let pathname = new URL(item.url).pathname;
    if (basePath && pathname.startsWith(basePath)) pathname = pathname.slice(basePath.length) || "/";
    return { ...item, lastmod: lastmodFor(pathname, dates).toISOString() };
  };
}
