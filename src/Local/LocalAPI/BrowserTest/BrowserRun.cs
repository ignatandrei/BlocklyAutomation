using Microsoft.Playwright;
using System.Text;  

namespace BrowserTest
{    
    public record RespScreenshot(string url, byte[] data);
    public record RespAnswer(bool ok, int status, string statusText);
    public record BrowserAndPage(string browserId, string Url);
    public enum BrowserType
    {
        None = 0,
        Chromium = 1,
        Firefox=2,
    }

    
    public class BrowserRun
    {
        public BrowserRun(IPlaywright playwright)
        {
            this.playwright = playwright;
        }
        IPlaywright playwright;
        static Dictionary<string, IBrowser> ExistingBrowsers = new();
        static Dictionary<IBrowser, Dictionary<string,IPage>> pages = new();
        static Dictionary<IPage, IResponse> responses = new();
        public async Task<bool> CloseBrowser(string id)
        {
            if (!ExistingBrowsers.ContainsKey(id))
                return false;

            var b = ExistingBrowsers[id];
            if (pages.ContainsKey(b))
                pages.Remove(b);
            await b.CloseAsync();
            await b.DisposeAsync();
            return true;
        }
        public async Task<BrowserAndPage> GetBrowserAndPage(bool headless, BrowserType browserType, string browserId,string url)
        {
            var id=await GetNewBrowser(headless, browserType,browserId);
            var page = await GotoPageOrExisting(browserId, url);
            return new BrowserAndPage(browserId, url);
        }


        public async Task<string> GetNewBrowser(bool headless, BrowserType browserType, string id)
        {
            if (ExistingBrowsers.ContainsKey(id))
            {
                await CloseBrowser(id);
                ExistingBrowsers.Remove(id);
            }
            if (playwright == null)
            {
                playwright = await Playwright.CreateAsync();
            }
            IBrowserType browserTypeRun;
            switch (browserType)
            {
                case BrowserType.Chromium:
                    browserTypeRun = playwright.Chromium;
                    break;
                case BrowserType.Firefox:
                    browserTypeRun = playwright.Firefox;
                    break;
                default:
                    throw new ArgumentException("not supported" + browserType);
            }
            var browser = await browserTypeRun.LaunchAsync(
            new()
            {
                Headless = headless,

            }
              );
            if (browser == null)
                throw new ArgumentException("problem with browser");
            ExistingBrowsers.Add(id, browser);
            return id;
        }
        private async Task<IPage?> GotoPageOrExisting(string browserId, string url)
        {
            if (!ExistingBrowsers.ContainsKey(browserId))
            {
                throw new ArgumentException("please first create browser");
            }
            var browser = ExistingBrowsers[browserId];
            if (browser == null) return null;
            IPage? page;
            if (!pages.ContainsKey(browser))
            {
                pages[browser] = new();
            }
            if (pages[browser].ContainsKey(url))
            {
                return pages[browser][url];
            }
            page = await browser.NewPageAsync();
            if (page == null) return null;
            pages[browser].Add(url, page);                          
            var resp = await page.GotoAsync(url);
            if (resp == null) return null;
            await resp.FinishedAsync();
            responses.Add(page, resp);
            return page;
        }
        public async Task<RespAnswer?> GotoPage(string browserId, string url)
        {
            var page = await GotoPageOrExisting(browserId, url);
            if (page == null) return new RespAnswer(false, -1, "Not have page"); 

            var resp = responses[page];
            if (resp == null) return new RespAnswer(false, -1, "Not have response") ;

            return new RespAnswer(resp.Ok, resp.Status, resp.StatusText);
            
        }
        public async Task<string?> GetResponseBodyText(BrowserAndPage browserAndPage)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;

            var resp = responses[page];
            if (resp == null) return null; 
            return Encoding.UTF8.GetString(await resp.BodyAsync());
        }
        public async Task<RespScreenshot?> GetScreenshot(BrowserAndPage browserAndPage)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;
            var sc=await page.ScreenshotAsync(new PageScreenshotOptions()
            {
                Type= ScreenshotType.Png,
                FullPage= true,
            } );

            return new RespScreenshot(browserAndPage.Url, sc);
        }
        public async Task<bool> SendKeys(BrowserAndPage browserAndPage, string key)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.Keyboard.PressAsync(key);
            return true;
        }
        public async Task<bool> SendEscape(BrowserAndPage browserAndPage)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.Keyboard.PressAsync("Escape");            
            return true;
        }
        public async Task<bool> Click(BrowserAndPage browserAndPage,string selector)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.ClickAsync(selector);
            return true;
        }
    }
}