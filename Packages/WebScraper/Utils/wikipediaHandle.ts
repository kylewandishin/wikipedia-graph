import type BrowserHandle from './BrowserHandle';
import type { CheerioParser } from './CheerioParser';

export default class WikipediaHandle {
  #browser: BrowserHandle;
  #parser: CheerioParser;
  #baseUrl = 'https://en.wikipedia.org';

  public constructor(browser: BrowserHandle, htmlParser: CheerioParser) {
    this.#browser = browser;
    this.#parser = htmlParser;
  }

  async #getRandomArticle() {
    await this.#browser.navigate(`${this.#baseUrl}/wiki/Special:Random`);
  }

  async #processArticle() {
    const textSelector = '.mw-body-content > .mw-content-ltr ';
    //   '#mw-content-text > div.mw-content-ltr.mw-parser-output > p:nth-child(3)';
    await this.#browser.waitForSelector(textSelector);
    this.#parser.setHtml(await this.#browser.fetchPageHtml());
    this.#parser.zoom(textSelector);

    const subSelector = 'p > a';
    const link = this.#parser.attr(subSelector, 'href');
    await this.#browser.navigate(`${this.#baseUrl}${link}`);
  }

  public async runAll() {
    await this.#getRandomArticle();
    await this.#processArticle();
  }
}
