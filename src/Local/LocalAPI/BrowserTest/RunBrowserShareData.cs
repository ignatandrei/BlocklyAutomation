using Microsoft.Playwright;

namespace BrowserTest
{
    public class RunBrowserShareData
    {
        public RunBrowserShareData(IPlaywright playwrightData )
        {
            playwright = playwrightData;
        }
        static Dictionary<string, IBrowser> ExistingBrowsers = new();
        static Dictionary<IBrowser, Dictionary<string, IPage>> pages = new();
        static Dictionary<IPage, IResponse> responses = new();
        private IPlaywright playwright;

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
        public async Task<BrowserAndPage> GetBrowserAndPage(bool headless, BrowserType browserType, string browserId, string url)
        {
            var id = await GetNewBrowser(headless, browserType, browserId);
            var page = await GotoPageOrExisting(browserId, url);
            return new BrowserAndPage(browserId, url);
        }
        private async Task<string> GetNewBrowser(bool headless, BrowserType browserType, string id)
        {
            if (ExistingBrowsers.ContainsKey(id))
            {
                await CloseBrowser(id);
                ExistingBrowsers.Remove(id);
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
        public async Task<ILocator?> GetLocator(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
        {
            var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
            if (page == null) return null;
            switch (criteria)
            {

                case SelectCriteria.AltText:
                    return page.GetByAltText(selector);

                case SelectCriteria.Label:
                    return page.GetByLabel(selector);
                case SelectCriteria.Placeholder:
                    return page.GetByPlaceholder(selector);
                case SelectCriteria.Role:
                    if (!Enum.TryParse<AriaRole>(selector, out AriaRole val))
                        throw new ArgumentException($"{selector} is not valid for Aria Role");
                    return page.GetByRole(val);

                case SelectCriteria.TestId:
                    return page.GetByTestId(selector);
                case SelectCriteria.Text:

                    return page.GetByText(selector);
                case SelectCriteria.Title:
                    return page.GetByTitle(selector);
                case SelectCriteria.Selector:
                    return page.Locator(selector);

                default:
                    throw new ArgumentException($"cannot find {nameof(SelectCriteria)} => {criteria}");
            }
        }
        public async Task<IPage?> GotoPageOrExisting(string browserId, string url)
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
            //await page.WaitForLoadStateAsync(LoadState.NetworkIdle);
            responses.Add(page, resp);
            return page;
        }
        private async Task<RespAnswer?> GotoPage(string browserId, string url)
        {
            var page = await GotoPageOrExisting(browserId, url);
            if (page == null) return new RespAnswer(false, -1, "Not have page");

            var resp = responses[page];
            if (resp == null) return new RespAnswer(false, -1, "Not have response");

            return new RespAnswer(resp.Ok, resp.Status, resp.StatusText);

        }
        public IResponse GetResponse(IPage page)
        {
            if (!responses.ContainsKey(page))
                throw new ArgumentException("cannot find response for page " + page.Url);
            return responses[page];
        }
    }
}
