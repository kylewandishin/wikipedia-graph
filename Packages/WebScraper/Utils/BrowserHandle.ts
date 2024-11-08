import type { Browser, Page } from 'playwright';
import { firefox } from 'playwright';
export default class BrowserHandle {
  #page: Page;
  #browser: Browser;

  private constructor(browser: Browser, page: Page) {
    this.#browser = browser;
    this.#page = page;
  }

  public static async init() {
    const browser = await firefox.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const self = new BrowserHandle(browser, page);
    return self;
  }

  public async kill() {
    await this.#browser.close();
  }

  public async navigate(url: string) {
    await this.#page.goto(url);
  }

  public async waitForSelector(selector: string, timeout: number = 15) {
    try {
      await this.#page.waitForSelector(selector, { timeout: 1_000 * timeout });
    } catch (e) {
      console.error(e);
      console.log(`❌ Selector not found: ${selector}`);
    }
  }

  public async fetchPageHtml(url?: string): Promise<string> {
    if (url) {
      await this.navigate(url);
    }
    const content = await this.#page.content();
    return content;
  }

  public async click(selector: string): Promise<void> {
    await this.#page.click(selector);
  }
}
