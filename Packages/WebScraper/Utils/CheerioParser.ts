import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

// <p><a href="https://github.com/cheeriojs/cheerio/wiki/Chinese-README">中文文档 (Chinese Readme)</a></p>
export class CheerioParser {
  #$: CheerioAPI;

  public constructor(html?: string) {
    if (html) {
      this.#$ = cheerio.load(html);
    } else {
      this.#$ = cheerio.load('');
    }
  }

  public setHtml(html: string) {
    this.#$ = cheerio.load(html);
  }

  public find(selector: string) {
    return this.#$(selector).html();
  }

  public zoom(selector: string) {
    // try to find the html of the selector, if not found, use the current html
    const newFrame = this.find(selector);
    if (newFrame) {
      this.#$ = cheerio.load(newFrame);
    } else {
      console.error('selector not found');
    }
  }

  public html() {
    return this.#$.html();
  }

  public text(selector: string) {
    return this.#$(selector).text();
  }

  public attr(selector: string, attr: string) {
    return this.#$(selector).attr(attr);
  }
}
