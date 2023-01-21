namespace BrowserTest
{
    public class BrowserActions
    {
        private readonly RunBrowserShareData rbsd;

        public BrowserActions(RunBrowserShareData runBrowserShareData)
        {
            this.rbsd = runBrowserShareData;
        }
        public async Task<bool> CloseBrowser(string id)
        {
            return await this.rbsd.CloseBrowser(id);
        }
        public async Task<BrowserAndPage> GetBrowserAndPage(bool headless, BrowserType browserType, string browserId, string url)
        {
            return await this.rbsd.GetBrowserAndPage(headless,browserType,browserId,url);
        }


    }
}
