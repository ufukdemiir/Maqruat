#!/usr/bin/env node
/**
 * Yönetim panelinin (Decap CMS) kodunu, npm kayıt defterindeki RESMÎ pakete
 * karşı doğrulayarak public/admin/vendor/decap-cms/ klasörüne kurar.
 *
 * NEDEN? Panel, GitHub'a yazma yetkili bir belirteçle çalışır. Panelin kodu
 * üçüncü bir sunucudan (CDN) çekilseydi, o sunucunun ya da paketin ele
 * geçirilmesi belirtecinizin çalınması demek olurdu. Kodu kendi sitenizden
 * sunmak bu riski tamamen ortadan kaldırır. Güncellemeler yalnızca bu betikle,
 * bilerek ve sürüm numarası verilerek yapılır — sessizce değişmez.
 *
 * KULLANIM (Node 22+ ve npm gerekir):
 *   node scripts/update-decap-cms.mjs 3.16.3
 *
 * Betik: paketi indirir (npm, kayıt defterinin verdiği sha512 değeriyle
 * bütünlüğü kendisi doğrular), yalnızca panelin çalışması için gereken
 * dosyaları kopyalar ve sürüm/bütünlük bilgisini VERSION.txt'ye yazar.
 * Sonrasında `npm run build` ile derleyip /admin/ sayfasını deneyin.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const version = process.argv[2];
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
  console.error("Kullanım: node scripts/update-decap-cms.mjs <sürüm>   (ör. 3.16.3)");
  process.exit(1);
}

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const target = join(root, "public", "admin", "vendor", "decap-cms");
const work = mkdtempSync(join(tmpdir(), "decap-"));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

try {
  console.log(`decap-cms@${version} indiriliyor…`);
  const packed = JSON.parse(
    execFileSync(npm, ["pack", `decap-cms@${version}`, "--json", "--pack-destination", work], {
      encoding: "utf8",
      shell: process.platform === "win32",
    }),
  )[0];
  execFileSync("tar", ["-xzf", join(work, packed.filename), "-C", work]);

  const dist = join(work, "package", "dist");
  const wanted = readdirSync(dist).filter(
    (f) =>
      f === "decap-cms.js" ||
      f === "decap-cms.js.LICENSE.txt" ||
      /^\d+\.decap-cms\.js$/.test(f) || // yükleme anında çağrılan parçalar
      /^[0-9a-f]+\.wasm$/.test(f),
  );
  if (!wanted.includes("decap-cms.js")) throw new Error("Pakette dist/decap-cms.js bulunamadı.");

  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });
  for (const f of wanted) cpSync(join(dist, f), join(target, f));

  writeFileSync(
    join(target, "VERSION.txt"),
    [
      `decap-cms ${version}`,
      `Lisans: MIT (bkz. decap-cms.js.LICENSE.txt)`,
      `npm tarball bütünlüğü (sha512): ${packed.integrity}`,
      `Doğrulamak için: npm view decap-cms@${version} dist.integrity`,
      `Kurulum tarihi: ${new Date().toISOString().slice(0, 10)}`,
      `Kuran betik: scripts/update-decap-cms.mjs`,
      "",
    ].join("\n"),
  );

  console.log(`Tamam: ${wanted.length} dosya → public/admin/vendor/decap-cms/`);
  console.log("Sıradaki adım: npm run build, ardından /admin/ sayfasını deneyin.");
} finally {
  rmSync(work, { recursive: true, force: true });
}
