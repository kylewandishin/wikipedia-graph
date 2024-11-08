import BrowserHandle from './Utils/BrowserHandle';

void (async () => {
  const browser = await BrowserHandle.init();
  await browser.navigate('https://google.com');
})();
