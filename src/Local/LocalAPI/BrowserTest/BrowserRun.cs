using Microsoft.Playwright;
using System;
using System.Text;

namespace BrowserTest
{
    public enum SelectCriteria
    {
        None = 0,
        AltText = 1,
        Label = 2,
        Placeholder,
        Role,
        TestId,
        Text,
        Title,
        Selector

    }
    public record RespScreenshot(string url, byte[] data);
    public record RespAnswer(bool ok, int status, string statusText);
    public record BrowserAndPage(string browserId, string Url);
    public enum BrowserType
    {
        None = 0,
        Chromium = 1,
        Firefox = 2,
    }
    public class BrowserRun
    {
        public BrowserRun(RunBrowserShareData runBrowserShareData)
        {
            this.rbsd = runBrowserShareData;
        }
        public async Task<bool> CloseBrowser(string id)
        {
            return await this.rbsd.CloseBrowser(id);
        }
        public async Task<BrowserAndPage> GetBrowserAndPage(bool headless, BrowserType browserType, string browserId, string url)
        {
            return await this.rbsd.GetBrowserAndPage(headless, browserType, browserId, url);
        }

        private readonly RunBrowserShareData rbsd;
        
        public async Task<string?> GetResponseBodyText(BrowserAndPage browserAndPage)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;

            var resp = rbsd.GetResponse(page);
            if (resp == null) return null;
            return Encoding.UTF8.GetString(await resp.BodyAsync());
        }
        public async Task<RespScreenshot?> GetScreenshot(BrowserAndPage browserAndPage)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;
            var sc = await page.ScreenshotAsync(new PageScreenshotOptions()
            {
                Type = ScreenshotType.Png,
                FullPage = true,
            });

            return new RespScreenshot(browserAndPage.Url, sc);
        }
        public async Task<bool> SendKeys(BrowserAndPage browserAndPage, string key)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.Keyboard.PressAsync(key);
            return true;
        }
        public async Task<bool> SendEscape(BrowserAndPage browserAndPage)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.Keyboard.PressAsync("Escape");
            return true;
        }
        public async Task<bool> Click(BrowserAndPage browserAndPage, string selector)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.ClickAsync(selector);
            return true;
        }
        public async Task<ILocator?> GetLocator(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
        {
            return await rbsd.GetLocator(browserAndPage, criteria, selector);
        }
        public async Task<bool> Highlight(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
        {

            var l = await GetLocator(browserAndPage, criteria, selector);
            if (l == null) return false;
            await l.HighlightAsync();
            return true;
        }
        public async Task<bool> ClickOn(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
        {
            var l = await GetLocator(browserAndPage, criteria, selector);
            if (l == null) return false;            
            await l.ClickAsync();
            return true;

        }
    }
}
