import { getCollection, type CollectionEntry } from "astro:content";
import { turkishSlugify, turkishCompare, getFirstLetter } from "./slugify";
import { roundTo } from "./reading";

export type BookEntry = CollectionEntry<"books">;

const STATUS_ORDER: Record<BookEntry["data"]["status"], number> = {
  reading: 0,
  completed: 1,
  "want-to-read": 2,
  dropped: 3,
};

export const STATUS_LABELS_TR: Record<BookEntry["data"]["status"], string> = {
  reading: "Okunuyor",
  completed: "Okundu",
  "want-to-read": "Okunacak",
  dropped: "Yarım Bırakıldı",
};

/** Yayınlanmış (taslak olmayan) tüm kitapları getirir. */
export async function getPublishedBooks(): Promise<BookEntry[]> {
  return getCollection("books", ({ data }) => !data.draft);
}

// ---------------------------------------------------------------------------
// OKUMA KAYITLARI (tekrar okuma desteği)
//
// Her kitabın bir "ilk okuması" vardır (kitap dosyasının en üstündeki
// startDate / endDate / status / pagesRead alanları) ve isteğe bağlı olarak
// ondan sonraki okumaları (`rereads`). İstatistikler iki ayrı şeyi sayar:
//   - OKUMA OLAYLARI (bitirilen kitap sayısı, okunan sayfa, bitirme süresi,
//     aylık/yıllık grafikler): her okuma — tekrar okumalar dahil — ayrı sayılır.
//   - KİTABA AİT NİTELİKLER (yazar, tür, puan, not, alıntı, inceleme): her
//     kitap, kaç kez okunmuş olursa olsun TEK sefer sayılır.
// Hiç tekrar okuma yoksa iki küme birebir aynıdır; yani mevcut hesaplar
// hiçbir şekilde değişmez.
// ---------------------------------------------------------------------------

export type ReadingStatus = BookEntry["data"]["status"];

export interface ReadingRecord {
  /** 1 = ilk okuma, 2 = ilk tekrar okuma, ... (tarih sırasına göre) */
  number: number;
  isReread: boolean;
  status: ReadingStatus;
  startDate?: Date;
  endDate?: Date;
  pagesRead?: number;
}

/** Tekrar okuma kayıtlarını eklenme sırasından bağımsız, tarih sırasına dizer
 * (tarihsizler sonda, kendi aralarında eklenme sırasıyla). */
function rereadSortKey(r: { startDate?: Date; endDate?: Date }): number {
  const date = r.startDate ?? r.endDate;
  return date ? date.getTime() : Number.POSITIVE_INFINITY;
}

/** Kitabın tüm okumaları: önce ilk okuma, ardından tekrar okumalar. */
export function getReadingRecords(book: BookEntry): ReadingRecord[] {
  const d = book.data;
  const first: ReadingRecord = {
    number: 1,
    isReread: false,
    status: d.status,
    startDate: d.startDate,
    endDate: d.endDate,
    pagesRead: d.pagesRead,
  };
  const rest = (d.rereads ?? [])
    .map((r, index) => ({ r, index }))
    .sort((a, b) => rereadSortKey(a.r) - rereadSortKey(b.r) || a.index - b.index)
    .map(({ r }, i): ReadingRecord => ({
      number: i + 2,
      isReread: true,
      status: r.status,
      startDate: r.startDate,
      endDate: r.endDate,
      pagesRead: r.pagesRead,
    }));
  return [first, ...rest];
}

/** Kitabın kaç kez BİTİRİLEREK okunduğu (yarım bırakılan ve süren okumalar sayılmaz). */
export function getCompletedReadCount(book: BookEntry): number {
  return getReadingRecords(book).filter((r) => r.status === "completed").length;
}

// Tekrar okumalar için üretilen "sanal" kayıtların hangi okumaya ait olduğunu
// tutar (kitap nesnesinin kendisine yeni alan eklememek için).
const RECORD_OF = new WeakMap<object, ReadingRecord>();

/** Bir okumayı, mevcut tüm hesapların olduğu gibi işleyebileceği bir kitap
 * kaydına çevirir. İLK okuma için kitabın kendisi (aynı nesne) döner; tekrar
 * okumalar için tarih/durum/sayfa alanları o okumayla değiştirilmiş bir kopya
 * döner (kimlik, başlık, yazar, puan vb. aynı kalır). */
export function toReadingEntry(book: BookEntry, record: ReadingRecord): BookEntry {
  if (!record.isReread) return book;
  const entry: BookEntry = {
    ...book,
    data: {
      ...book.data,
      status: record.status,
      startDate: record.startDate,
      endDate: record.endDate,
      pagesRead: record.pagesRead,
    },
  };
  RECORD_OF.set(entry, record);
  return entry;
}

/** Verilen kayıt bir tekrar okumaya mı ait? */
export function isRereadEntry(entry: BookEntry): boolean {
  return RECORD_OF.has(entry);
}

/** Tüm kitapların tüm okumalarını (ilk + tekrar) tek bir listede döndürür.
 * Sıra: kitap sırası korunur, her kitabın okumaları kendi içinde sıralıdır. */
export function expandReadings(books: BookEntry[]): BookEntry[] {
  return books.flatMap((book) => getReadingRecords(book).map((record) => toReadingEntry(book, record)));
}

/** Aynı kitaba ait okuma kayıtlarını tekilleştirir ve her biri için kitabın
 * ASIL kaydını döndürür (ilk görülme sırası korunur). */
export function distinctBooksOf(entries: BookEntry[], books: BookEntry[]): BookEntry[] {
  const byId = new Map(books.map((b) => [b.id, b] as const));
  const seen = new Set<string>();
  const result: BookEntry[] = [];
  for (const entry of entries) {
    if (seen.has(entry.id)) continue;
    seen.add(entry.id);
    result.push(byId.get(entry.id) ?? entry);
  }
  return result;
}

function timeOf(book: BookEntry): number {
  const date = book.data.endDate ?? book.data.startDate;
  return date ? date.getTime() : 0;
}

/** Kitapları bitiş (yoksa başlangıç) tarihine göre en yeniden en eskiye sıralar. */
export function sortByRecency(books: BookEntry[]): BookEntry[] {
  return [...books].sort((a, b) => timeOf(b) - timeOf(a));
}

export async function getCurrentlyReading(): Promise<BookEntry[]> {
  const books = await getPublishedBooks();
  // Süren bir TEKRAR okuma da "şu an okunuyor" sayılır; bu durumda kitap,
  // o okumanın başlangıç tarihi ve "Okunuyor" durumuyla gösterilir.
  const reading = sortByRecency(expandReadings(books).filter((b) => b.data.status === "reading"));
  // Aynı kitabın birden fazla süren okuması varsa kitap listede yalnızca bir kez görünür.
  const seen = new Set<string>();
  return reading.filter((b) => (seen.has(b.id) ? false : (seen.add(b.id), true)));
}

export async function getRecentlyFinished(limit = 6): Promise<BookEntry[]> {
  const books = await getPublishedBooks();
  const finished = expandReadings(books).filter((b) => b.data.status === "completed" && b.data.endDate);
  // Aynı kitap hem ilk hem tekrar okumasıyla listeye girebilir: yalnızca en
  // yeni bitirilişi sayılır ve kart kitabın asıl kaydıyla gösterilir.
  return distinctBooksOf(sortByRecency(finished), books).slice(0, limit);
}

export async function getThisMonthFinished(reference: Date = new Date()): Promise<BookEntry[]> {
  const books = await getPublishedBooks();
  const finished = expandReadings(books).filter((b) => {
    if (b.data.status !== "completed" || !b.data.endDate) return false;
    return (
      b.data.endDate.getFullYear() === reference.getFullYear() &&
      b.data.endDate.getMonth() === reference.getMonth()
    );
  });
  return distinctBooksOf(sortByRecency(finished), books);
}

/** Yıllık hedef için: o yıl bitirilen okuma sayısı (tekrar okumalar dahil). */
export async function getFinishedCountForYear(year: number): Promise<number> {
  const books = await getPublishedBooks();
  return expandReadings(books).filter(
    (b) => b.data.status === "completed" && b.data.endDate && b.data.endDate.getFullYear() === year,
  ).length;
}

export async function getAllGenres(): Promise<string[]> {
  const books = await getPublishedBooks();
  const set = new Set<string>();
  books.forEach((b) => b.data.genres.forEach((g) => set.add(g)));
  return [...set].sort((a, b) => turkishCompare(a, b));
}

/** Kitap başlıklarının ilk harflerinden oluşan, alfabetik sıralı benzersiz liste. */
export async function getAllTitleLetters(): Promise<string[]> {
  const books = await getPublishedBooks();
  const set = new Set<string>();
  books.forEach((b) => set.add(getFirstLetter(b.data.title)));
  return [...set].sort((a, b) => turkishCompare(a, b));
}

export interface AuthorSummary {
  name: string;
  slug: string;
  books: BookEntry[];
  averageRating: number | null;
  completedCount: number;
}

export async function getAllAuthors(): Promise<AuthorSummary[]> {
  const books = await getPublishedBooks();
  const map = new Map<string, BookEntry[]>();
  for (const book of books) {
    const slug = turkishSlugify(book.data.author);
    if (!map.has(slug)) map.set(slug, []);
    map.get(slug)!.push(book);
  }

  const authors: AuthorSummary[] = [];
  for (const [slug, authorBooks] of map) {
    const ratings = authorBooks
      .map((b) => b.data.rating)
      .filter((r): r is number => typeof r === "number");
    authors.push({
      name: authorBooks[0].data.author,
      slug,
      books: sortByRecency(authorBooks),
      averageRating: ratings.length
        ? roundTo(ratings.reduce((sum, r) => sum + r, 0) / ratings.length)
        : null,
      completedCount: authorBooks.filter((b) => b.data.status === "completed").length,
    });
  }
  return authors.sort((a, b) => turkishCompare(a.name, b.name));
}

export async function getAuthorBySlug(slug: string): Promise<AuthorSummary | undefined> {
  const authors = await getAllAuthors();
  return authors.find((a) => a.slug === slug);
}

export interface QuoteItem {
  book: BookEntry;
  text: string;
  page?: number;
  index: number;
}

export async function getAllQuotes(): Promise<QuoteItem[]> {
  const books = await getPublishedBooks();
  const quotes: QuoteItem[] = [];
  for (const book of books) {
    book.data.quotes.forEach((q, index) => {
      quotes.push({ book, text: q.text, page: q.page, index });
    });
  }
  return quotes.sort((a, b) => timeOf(b.book) - timeOf(a.book));
}

export interface NoteItem {
  book: BookEntry;
  text: string;
  index: number;
}

export async function getAllNotes(): Promise<NoteItem[]> {
  const books = await getPublishedBooks();
  const notes: NoteItem[] = [];
  for (const book of books) {
    book.data.notes.forEach((text, index) => notes.push({ book, text, index }));
  }
  return notes.sort((a, b) => timeOf(b.book) - timeOf(a.book));
}

/** İncelemesi (Markdown gövdesi) bulunan tüm kitaplar — /incelemeler akışı için. */
export async function getBooksWithReviews(): Promise<BookEntry[]> {
  const books = await getPublishedBooks();
  return sortByRecency(books.filter((b) => (b.body ?? "").trim().length > 0));
}

export function compareByStatusThenRecency(a: BookEntry, b: BookEntry): number {
  const statusDiff = STATUS_ORDER[a.data.status] - STATUS_ORDER[b.data.status];
  if (statusDiff !== 0) return statusDiff;
  return timeOf(b) - timeOf(a);
}

/** Aynı `seriesTitle` değerine sahip diğer ciltleri, cilt numarasına göre sıralı döndürür. */
export async function getSeriesVolumes(book: BookEntry): Promise<BookEntry[]> {
  if (!book.data.seriesTitle) return [];
  const books = await getPublishedBooks();
  return books
    .filter((b) => b.data.seriesTitle === book.data.seriesTitle)
    .sort((a, b) => (a.data.volumeNumber ?? 0) - (b.data.volumeNumber ?? 0));
}

/** Çok ciltli eserlerde "Cilt N" ekiyle birlikte görüntüleme başlığı üretir. */
export function getDisplayTitle(book: BookEntry): string {
  return book.data.volumeNumber ? `${book.data.title} — Cilt ${book.data.volumeNumber}` : book.data.title;
}
