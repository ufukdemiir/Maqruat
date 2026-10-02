export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Google'ın "breadcrumb" zengin sonuçlarını göstermesi için BreadcrumbList şeması üretir. */
export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Site sahipliği doğrulama etiketleri (Pinterest, Google Search Console, ...)
// ---------------------------------------------------------------------------

/** CMS'te (Genel Ayarlar → Site Sahipliği Doğrulama) tutulan alanlar. */
export interface VerificationSettings {
  pinterest?: string | null;
  google?: string | null;
  bing?: string | null;
  yandex?: string | null;
  facebook?: string | null;
}

/**
 * Alan adı → <meta name="..."> eşlemesi. Yeni bir servis (ör. Naver) eklemek
 * için buraya bir satır, src/content.config.ts'e ve public/admin/config.yml'e
 * aynı anahtarla bir alan eklemek yeterlidir.
 */
const VERIFICATION_META: { key: keyof VerificationSettings; name: string }[] = [
  { key: "pinterest", name: "p:domain_verify" },
  { key: "google", name: "google-site-verification" },
  { key: "bing", name: "msvalidate.01" },
  { key: "yandex", name: "yandex-verification" },
  { key: "facebook", name: "facebook-domain-verification" },
];

/**
 * Kullanıcı yalnızca kodu da yapıştırabilir, servisin verdiği <meta ...>
 * satırının tamamını da: ikinci durumda `content="..."` içindeki değer
 * ayıklanır. Beklenmedik karakterler içeren değerler yok sayılır.
 */
export function cleanVerificationCode(value: string | null | undefined): string {
  const raw = (value ?? "").trim();
  if (!raw) return "";
  const fromTag = raw.match(/content\s*=\s*["']([^"']+)["']/i);
  const code = (fromTag ? fromTag[1] : raw).trim();
  return /^[\w.:=+\/-]{6,200}$/.test(code) ? code : "";
}

/** Doldurulmuş doğrulama kodları için üretilecek <meta> etiketleri. */
export function getVerificationTags(settings: VerificationSettings | null | undefined) {
  return VERIFICATION_META.map(({ key, name }) => ({ name, content: cleanVerificationCode(settings?.[key]) })).filter(
    (tag) => tag.content,
  );
}
