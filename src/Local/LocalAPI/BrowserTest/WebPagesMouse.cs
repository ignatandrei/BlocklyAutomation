namespace BrowserTest
{
    public class WebPagesMouse
    {
        private readonly RunBrowserShareData rbsd;

        public WebPagesMouse(RunBrowserShareData runBrowserShareData)
        {
            this.rbsd = runBrowserShareData;
        }
        public async Task<bool> Click(BrowserAndPage browserAndPage, string selector)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.ClickAsync(selector);
            return true;
        }

    }
}
