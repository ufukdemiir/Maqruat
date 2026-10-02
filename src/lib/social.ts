/**
 * Footer'daki ve yapılandırılmış veri (JSON-LD) içindeki tüm sosyal bağlantıların
 * TEK kaynağı.
 *
 * İki ayrı grup vardır ve bilinçli olarak birbirine karıştırılmaz:
 *   1. Maqruat hesapları (@Maqruat) → `maqruatSocial` (src/data/site.json)
 *      Footer'da "Maqruat'ı takip edin" bölümünde çip olarak görünür.
 *   2. Kişisel hesaplar (Ufuk Demir) → `social` (src/data/site.json)
 *      Footer'da okur adının başlığı altında düz metin listesi olarak görünür.
 *
 * Bir alan boşsa (ya da geçerli bir bağlantı değilse) ilgili öğe hiç
 * üretilmez; yani CMS'te bir bağlantıyı silmek onu siteden kaldırır.
 *
 * YENİ BİR PLATFORM EKLEMEK için:
 *   - `MAQRUAT_PLATFORMS` listesine bir satır ekleyin (sıra = görünme sırası),
 *   - src/content.config.ts içindeki `maqruatSocial` şemasına aynı anahtarı ekleyin,
 *   - public/admin/config.yml içine aynı anahtarla bir alan ekleyin.
 */

export type MaqruatPlatformKey =
  | "instagram"
  | "x"
  | "youtube"
  | "pinterest"
  | "facebook"
  | "tiktok"
  | "bluesky"
  | "tumblr"
  | "soundcloud"
  | "slack"
  | "github";

export interface SocialPlatform {
  key: MaqruatPlatformKey;
  label: string;
  /**
   * Arama motorlarına "bu hesap bu sitenin resmî profilidir" demek için
   * (schema.org `sameAs`) kullanılsın mı? Herkese açık bir profil sayfası
   * olmayanlar (kapalı Slack çalışma alanı, kod deposu) dışarıda bırakılır.
   */
  sameAs: boolean;
}

/**
 * Footer'daki GÖRÜNME SIRASI. Sıralama; kitap/alıntı odaklı bir okuma
 * platformu için erişim, keşfedilebilirlik ve etkileşim potansiyeline göre
 * yapılmıştır: görsel/alıntı odaklı büyük ağlar önde, topluluk ve geliştirici
 * odaklı olanlar sonda.
 */
export const MAQRUAT_PLATFORMS: readonly SocialPlatform[] = [
  { key: "instagram", label: "Instagram", sameAs: true },
  { key: "x", label: "X", sameAs: true },
  { key: "youtube", label: "YouTube", sameAs: true },
  { key: "pinterest", label: "Pinterest", sameAs: true },
  { key: "facebook", label: "Facebook", sameAs: true },
  { key: "tiktok", label: "TikTok", sameAs: true },
  { key: "bluesky", label: "Bluesky", sameAs: true },
  { key: "tumblr", label: "Tumblr", sameAs: true },
  { key: "soundcloud", label: "SoundCloud", sameAs: true },
  { key: "slack", label: "Slack", sameAs: false },
  { key: "github", label: "GitHub", sameAs: false },
];

export interface SocialLink {
  key: string;
  label: string;
  href: string;
  /** Yeni sekmede açılmalı mı? (mailto: bağlantıları için false) */
  external: boolean;
  sameAs: boolean;
}

type LinkMap = Partial<Record<string, string | null | undefined>> | null | undefined;

/**
 * CMS'ten gelen değeri güvenli bir bağlantıya çevirir.
 *  - Boşsa → undefined (öğe gösterilmez)
 *  - "instagram.com/maqruat" gibi protokolsüz yazıldıysa → "https://" eklenir
 *  - http/https dışındaki her şey (ör. "javascript:") reddedilir
 */
export function normalizeUrl(value: string | null | undefined): string | undefined {
  const raw = (value ?? "").trim();
  if (!raw) return undefined;
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : /^[^\s/]+\.[^\s/]+/.test(raw) ? `https://${raw}` : "";
  if (!candidate) return undefined;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function normalizeEmail(value: string | null | undefined): string | undefined {
  const raw = (value ?? "").trim().replace(/^mailto:/i, "");
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : undefined;
}

/** Maqruat'a ait hesaplar (sıralı). Sonda, doluysa, iletişim e-postası gelir. */
export function getMaqruatLinks(map: LinkMap): SocialLink[] {
  const links: SocialLink[] = [];
  for (const platform of MAQRUAT_PLATFORMS) {
    const href = normalizeUrl(map?.[platform.key]);
    if (href) {
      links.push({ key: platform.key, label: platform.label, href, external: true, sameAs: platform.sameAs });
    }
  }
  const email = normalizeEmail(map?.email);
  if (email) {
    links.push({ key: "email", label: "E-posta", href: `mailto:${email}`, external: false, sameAs: false });
  }
  return links;
}

/** Ufuk Demir'in kişisel hesapları (sıralı). */
export function getPersonalLinks(map: LinkMap): SocialLink[] {
  const entries: { key: string; label: string }[] = [
    { key: "github", label: "GitHub" },
    { key: "linkedin", label: "LinkedIn" },
    { key: "pinterest", label: "Pinterest" },
    { key: "website", label: "Web sitesi" },
  ];
  const links: SocialLink[] = [];
  for (const entry of entries) {
    const href = normalizeUrl(map?.[entry.key]);
    if (href) {
      links.push({ key: entry.key, label: entry.label, href, external: true, sameAs: true });
    }
  }
  return links;
}
