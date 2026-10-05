/**
 * RSS 2.0 akışı üreticisi (bağımlılıksız). Saf fonksiyonlardan oluşur; böylece
 * kaçışlama ve biçim doğruluğu otomatik testlerle denetlenebilir.
 *
 * Akışta iki tür öğe bulunur:
 *   - Blog yazıları,
 *   - Bitirilen okumalar (her bitirilen okuma ayrı bir öğedir; tekrar okumalar
 *     "Tekrar okundu" başlığıyla, kendi benzersiz kimlikleriyle yer alır).
 * Tarihler içerikten gelir ("şimdi" kullanılmaz); aynı içerik her derlemede
 * birebir aynı akışı üretir, okuyucular gereksiz "yeni öğe" görmez.
 */

export interface FeedItem {
  title: string;
  /** Okuyucunun açacağı mutlak adres. */
  link: string;
  /** Kalıcı kimlik; verilmezse `link` kullanılır. Tekrar okumalar için bağlantı + "#okuma-N". */
  guid?: string;
  date: Date;
  description: string;
  categories?: string[];
}

export interface FeedChannel {
  title: string;
  /** Sitenin mutlak ana adresi. */
  link: string;
  /** Akışın kendi mutlak adresi. */
  selfLink: string;
  description: string;
  language?: string;
  author?: string;
  imageUrl?: string;
}

/** XML'de geçersiz olan denetim karakterlerini atar, özel karakterleri kaçışlar. */
export function xmlEscape(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 / RSS tarih biçimi (ör. "Sat, 03 Oct 2026 00:00:00 GMT"). */
export function rfc822(date: Date): string {
  return date.toUTCString();
}

export function buildRss(channel: FeedChannel, items: FeedItem[]): string {
  const sorted = [...items]
    .filter((item) => !Number.isNaN(item.date.getTime()))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  // Akışın "son güncelleme" tarihi, en yeni öğenin tarihidir (deterministik).
  const lastBuild = sorted[0]?.date;

  const lines: string[] = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
  );
  lines.push("<channel>");
  lines.push(`<title>${xmlEscape(channel.title)}</title>`);
  lines.push(`<link>${xmlEscape(channel.link)}</link>`);
  lines.push(`<description>${xmlEscape(channel.description)}</description>`);
  lines.push(`<language>${xmlEscape(channel.language ?? "tr")}</language>`);
  if (lastBuild) lines.push(`<lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>`);
  lines.push(
    `<atom:link href="${xmlEscape(channel.selfLink)}" rel="self" type="application/rss+xml" />`,
  );
  if (channel.imageUrl) {
    lines.push("<image>");
    lines.push(`<url>${xmlEscape(channel.imageUrl)}</url>`);
    lines.push(`<title>${xmlEscape(channel.title)}</title>`);
    lines.push(`<link>${xmlEscape(channel.link)}</link>`);
    lines.push("<width>144</width>");
    lines.push("<height>144</height>");
    lines.push("</image>");
  }

  for (const item of sorted) {
    lines.push("<item>");
    lines.push(`<title>${xmlEscape(item.title)}</title>`);
    lines.push(`<link>${xmlEscape(item.link)}</link>`);
    const guid = item.guid ?? item.link;
    lines.push(`<guid isPermaLink="${guid === item.link ? "true" : "false"}">${xmlEscape(guid)}</guid>`);
    lines.push(`<pubDate>${rfc822(item.date)}</pubDate>`);
    if (channel.author) lines.push(`<dc:creator>${xmlEscape(channel.author)}</dc:creator>`);
    for (const category of item.categories ?? []) lines.push(`<category>${xmlEscape(category)}</category>`);
    lines.push(`<description>${xmlEscape(item.description)}</description>`);
    lines.push("</item>");
  }

  lines.push("</channel>");
  lines.push("</rss>");
  return lines.join("\n") + "\n";
}
