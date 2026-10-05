import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { getPublishedPosts } from "../lib/blog";
import { expandReadings, getDisplayTitle, getPublishedBooks, isRereadEntry, getReadingRecords } from "../lib/books";
import { excerptFromMarkdown } from "../lib/reading";
import { buildRss, type FeedItem } from "../lib/rss";
import { withBase } from "../lib/url";

/** Akışta en fazla kaç öğe bulunsun (en yeniler). */
const MAX_ITEMS = 40;

export const GET: APIRoute = async ({ site }) => {
  const settings = await getEntry("settings", "main");
  const readerName = settings?.data.readerName || "Ufuk Demir";
  const abs = (path: string) => new URL(withBase(path), site).toString();

  const items: FeedItem[] = [];

  // --- Blog yazıları
  for (const post of await getPublishedPosts()) {
    const link = abs(`/blog/${post.id}/`);
    items.push({
      title: post.data.title,
      link,
      date: post.data.publishDate,
      description: post.data.excerpt || excerptFromMarkdown(post.body ?? "", 300),
      categories: post.data.tags,
    });
  }

  // --- Bitirilen okumalar (ilk okuma + tekrar okumalar)
  const books = await getPublishedBooks();
  for (const book of books) {
    const records = getReadingRecords(book);
    const readings = expandReadings([book]);
    readings.forEach((entry, index) => {
      const record = records[index];
      if (entry.data.status !== "completed" || !entry.data.endDate) return;
      const link = abs(`/kitaplar/${book.id}/`);
      const title = getDisplayTitle(book);
      const reread = isRereadEntry(entry);

      let description: string;
      if (reread) {
        description = `${book.data.author} — ${title}, ${record.number}. kez okundu.`;
      } else {
        const parts: string[] = [`${book.data.author} — ${title}`];
        if (typeof book.data.rating === "number") parts.push(`Puan: ${book.data.rating}/10`);
        const review = excerptFromMarkdown(book.body ?? "", 280);
        parts.push(review || "Okuma tamamlandı.");
        description = parts.join(" · ");
      }

      items.push({
        title: reread ? `Tekrar okundu: ${title} (${record.number}. okuma)` : `Okundu: ${title}`,
        link,
        // Her okumanın kalıcı, benzersiz kimliği (aynı kitabın farklı okumaları ayrı öğedir).
        guid: `${link}#okuma-${record.number}`,
        date: entry.data.endDate,
        description,
        categories: book.data.genres,
      });
    });
  }

  const newest = [...items].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, MAX_ITEMS);

  const xml = buildRss(
    {
      title: "Maqruat",
      link: abs("/"),
      selfLink: abs("/rss.xml"),
      description:
        settings?.data.siteDescription || "Ufuk Demir'in kişisel okuma takibi ve kütüphanesi: bitirilen kitaplar ve blog yazıları.",
      language: "tr",
      author: readerName,
      imageUrl: abs("/logo.png"),
    },
    newest,
  );

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
