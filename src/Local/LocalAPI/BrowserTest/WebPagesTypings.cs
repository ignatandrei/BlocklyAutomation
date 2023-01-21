namespace BrowserTest
{
    public class WebPagesTypings
    {
        private readonly RunBrowserShareData rbsd;

        public WebPagesTypings(RunBrowserShareData runBrowserShareData)
        {
            this.rbsd = runBrowserShareData;
        }
        public async Task<bool> SendEscape(BrowserAndPage browserAndPage)
        {
            var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return false;
            await page.Keyboard.PressAsync("Escape");
            return true;
        }

    }
}
