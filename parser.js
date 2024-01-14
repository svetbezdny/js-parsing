"use strict";

const fs = require("fs");
const puppeteer = require("puppeteer");

const url = "https://power.lindover.ru";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  let arr = await page.evaluate(() => {
    let text = Array.from(
      document.querySelectorAll(".t-name_md"),
      (el) => el.textContent
    );
    return text;
  });

  let data = arr.join("\n");
  fs.writeFile("data.txt", data, "utf-8", (err) => {
    if (err) console.error(err);
    else console.log("Done");
  });

  await browser.close();
})();
