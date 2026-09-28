import { existsSync, promises as fs } from "node:fs";
import { relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import type { Loader, LoaderContext } from "astro/loaders";

/**
 * Tek bir JSON dosyasının TÜM içeriğini TEK bir içerik girdisi olarak yükler.
 *
 * NEDEN VAR (kök neden): Astro'nun hazır `file()` yükleyicisi, bir JSON
 * nesnesinin her üst-seviye anahtarını ayrı bir girdi kimliği (id) sayar.
 * Bu yüzden eskiden ayar dosyaları `{ "main": { ...alanlar... } }` biçiminde,
 * fazladan bir "main" sarmalayıcısıyla tutuluyordu.
 *
 * Ancak Decap CMS, bir "files" koleksiyonundaki dosyayı okurken de yazarken de
 * dosyanın TÜM içeriğini doğrudan girdinin verisi sayar ve form alanlarını
 * config.yml'deki alan adlarıyla KÖK seviyesinde okur/yazar
 * (bkz. decap-cms-core → backend.ts: `format.fromFile(raw)` ve
 * `format.toFile(entry.data)`; JSON biçimleyici düz `JSON.parse`/`stringify`).
 * "main" sarmalayıcısı Decap'ın bilmediği bir katmandı; bu yüzden:
 *   - Form, mevcut değerleri "main" içinde bulamayıp alanları boş gösteriyordu
 *     (ilk günden beri "hepsini doldurmaya zorluyor" şikâyetinin nedeni),
 *   - Kaydedilen her yeni değer, "main"in YANINA kök seviyede yeni bir anahtar
 *     olarak yazılıyor, "main" içindeki eski değere hiç dokunulmuyordu
 *     (avatar değerlerinin sitede hiç görünmemesinin nedeni).
 *
 * ÇÖZÜM: Dosya artık DÜZ tutuluyor (alanlar doğrudan kökte, sarmalayıcı yok) —
 * yani Decap'ın beklediği biçimde. Bu yükleyici de dosyanın tamamını sabit bir
 * kimlikle ("main") TEK girdi olarak sunuyor; böylece koddaki
 * `getEntry("settings", "main")` çağrıları hiç değişmeden çalışmaya devam
 * ediyor. "main" artık dosyanın içinde değil, yalnızca bu yükleyicinin
 * atadığı iç kimlik.
 */
export function singleFile(fileName: string, entryId = "main"): Loader {
  async function syncData(filePath: string, { logger, parseData, store, config }: LoaderContext) {
    let data: Record<string, unknown>;
    try {
      const contents = await fs.readFile(filePath, "utf-8");
      data = JSON.parse(contents);
    } catch (error) {
      logger.error(`${fileName} okunamadı ya da geçerli bir JSON değil.`);
      logger.debug((error as Error).message);
      return;
    }

    if (data === null || typeof data !== "object" || Array.isArray(data)) {
      logger.error(`${fileName} bir JSON nesnesi olmalı.`);
      return;
    }

    // Astro, depoya kaydedilen yolun site köküne GÖRELİ olmasını bekler.
    const relativePath = relative(fileURLToPath(config.root), filePath).split(sep).join("/");

    const parsedData = await parseData({ id: entryId, data, filePath });
    store.clear();
    store.set({ id: entryId, data: parsedData, filePath: relativePath });
  }

  return {
    name: "single-file-loader",
    load: async (context) => {
      const { config, logger, watcher } = context;
      const url = new URL(fileName, config.root);
      if (!existsSync(url)) {
        logger.error(`Dosya bulunamadı: ${fileName}`);
        return;
      }
      const filePath = fileURLToPath(url);
      await syncData(filePath, context);
      watcher?.add(filePath);
      watcher?.on("change", async (changedPath) => {
        if (changedPath === filePath) {
          logger.info(`${fileName} yeniden yükleniyor`);
          await syncData(filePath, context);
        }
      });
    },
  };
}
