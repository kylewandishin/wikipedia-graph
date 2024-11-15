import BrowserHandle from './Utils/BrowserHandle';
import { CheerioParser } from './Utils/CheerioParser';
import WikipediaHandle from './Utils/wikipediaHandle';

void (async () => {
  const browser = await BrowserHandle.init();
  const htmlParser = new CheerioParser();
  const wiki = new WikipediaHandle(browser, htmlParser);
  await wiki.runAll();
  // await browser.navigate('https://google.com');
  // await browser.fill('#APjFqb', 'apple');
  // await browser.click(
  //   'div.lJ9FBc:nth-child(16) > center:nth-child(2) > input:nth-child(1)',
  // );
  // await browser.waitForSelector(
  //   '.crJ18e > div:nth-child(1) > div:nth-child(3) > a:nth-child(1)',
  // );
  // await browser.click(
  //   '.crJ18e > div:nth-child(1) > div:nth-child(3) > a:nth-child(1)',
  // );
})();
