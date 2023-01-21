using Microsoft.Playwright;

namespace BrowserTest
{
    public class WebPagesScreenshot
    {
        private readonly RunBrowserShareData rbsd;

        public WebPagesScreenshot(RunBrowserShareData runBrowserShareData)
        {
            this.rbsd = runBrowserShareData;
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
        public async Task<RespScreenshot?> GetScreenshotElement(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;
            var loc =await rbsd.GetLocator(browserAndPage, criteria, selector);
            if(loc == null) return null;
            var sc = await loc.ScreenshotAsync(new LocatorScreenshotOptions()
            {
                Type = ScreenshotType.Png,

            });

            return new RespScreenshot(browserAndPage.Url, sc);
        }

    }
}
