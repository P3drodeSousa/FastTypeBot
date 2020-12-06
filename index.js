const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();

  //only in develloppement  / Delete before production
  await page.setViewport({
    width: 1600,
    height: 800,
  });

  await page.goto("https://typing-speed-test.aoeu.eu/");
  await page.waitForSelector(".nextword");

  const words = await page.evaluate(() => {
    const wordEl = document.querySelectorAll(".nextword");

    const wordList = [document.querySelector(".currentword").innerText];

    wordEl.forEach((word) => {
      wordList.push(word.innerText);
    });
    return wordList;
  });

  for (let i = 0; i < words.length; i++) {
    await page.type("#input", words[i]);
    await page.keyboard.press(String.fromCharCode(32));
  }
})();
