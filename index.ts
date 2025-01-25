import { chromium } from "playwright";
import * as fs from "fs";

(async () => {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://example.jp");

  const pTags = await page.$$eval("p", (elements) =>
    elements.map((el) => ({
      text: el.textContent?.trim() ?? "",
    })),
  );

  const jsonOutput = JSON.stringify(pTags, null, 2);

  fs.writeFileSync("result.json", jsonOutput, "utf-8");

  await page.close();
  await browser.close();
})();
