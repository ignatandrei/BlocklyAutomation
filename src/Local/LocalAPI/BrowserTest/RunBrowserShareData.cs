namespace BrowserTest;
public record ExecuteScriptNoArgs(BrowserAndPage browserAndPage, string script);
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
    private Tuple<ILocator?, int> FromNegative(int nr)
    {
        return new Tuple<ILocator?, int>(null, nr);
    }
    public async Task<Tuple<ILocator?,int>> FindNumberElements3(Find3 find)
    {
        string[] selectors = new[] { find.selector1, find.selector2, find.selector3 };
        selectors = selectors.Where(it => !string.IsNullOrWhiteSpace(it)).ToArray();
        if (string.IsNullOrEmpty(find.text) && selectors.Length == 0) { 
            return FromNegative( -1000); 
        }

        var page = await GotoPageOrExisting(find.browserAndPage.browserId, find.browserAndPage.Url);
        if (page == null) return FromNegative(-1001);

        var loc = await GetRecursiveLocator(find.browserAndPage, selectors,find.text);
        if (loc == null)
            return FromNegative(-1002);

        
        var nr =await loc.CountAsync();
        return new Tuple<ILocator?, int>(loc, nr);

    }
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
    public async Task<string?> ExecuteScript(ExecuteScriptNoArgs executeScriptNoArgs)
    {
        (BrowserAndPage browserAndPage, string script) = executeScriptNoArgs;
        var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
        if (page == null) return null;
        var data= await page.EvaluateAsync<object>(script);
        if (data == null)
            return null;
        var str = System.Text.Json.JsonSerializer.Serialize(data);
        return str;

    }

    public async Task<ILocator?> GetLocator(BrowserAndPage browserAndPage, SelectCriteria criteria, string selector)
    {
        var page = await GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
        if (page == null) return null;
        ILocator? loc = null;
        switch (criteria)
        {

            case SelectCriteria.AltText:
                loc = page.GetByAltText(selector);
                break;
            case SelectCriteria.Label:
                loc = page.GetByLabel(selector);
                break;
            case SelectCriteria.Placeholder:
                loc = page.GetByPlaceholder(selector);
                break;
            case SelectCriteria.Role:
                if (!Enum.TryParse<AriaRole>(selector, out AriaRole val))
                    throw new ArgumentException($"{selector} is not valid for Aria Role");
                loc = page.GetByRole(val);
                break;
            case SelectCriteria.TestId:
                loc = page.GetByTestId(selector);
                break;
            case SelectCriteria.Text:

                loc = page.GetByText(selector);
                break;
            case SelectCriteria.Title:
                loc = page.GetByTitle(selector);
                break;
            case SelectCriteria.Selector:
                if (string.IsNullOrWhiteSpace(selector))
                    loc = page.Locator("");
                else
                    loc = page.Locator(selector);
                break;

            default:
                throw new ArgumentException($"cannot find {nameof(SelectCriteria)} => {criteria}");
        }
        if (loc != null) { 
            var nr = await loc.CountAsync();
            if (nr == 1)
                await loc.WaitForAsync();//default 
        }
        return loc;
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

    public async Task<ILocator?> GetRecursiveLocator(BrowserAndPage browserAndPage, string[] selectors,string find)
    {
        bool findText = !string.IsNullOrWhiteSpace(find);
        LocatorFilterOptions opt = new()
        {
            HasTextString = find
        };
        if (selectors.Length == 0)
        {
            if (findText)
            {
                return await GetLocator(browserAndPage, SelectCriteria.Text, find);
            }
        }
        ILocator? ret =await GetLocator(browserAndPage, SelectCriteria.Selector, selectors[0]);
        if (ret == null)
            return ret;

        if (findText)
        {

            var loc = ret.Filter(opt);
            if (loc != null)
            {
                var nr = await loc.CountAsync();
                if (nr > 0)
                {
                    ret = loc;
                    findText = false;
                }
            }
                
        }

        for (int i = 1; i < selectors.Length; i++)
        {
            var select = selectors[i];
            
            ret = ret.Locator(select);
            if (ret == null)
                return ret;
            var nr = await ret.CountAsync();
            if (nr == 0)
                return ret;

            if (findText)
            {

                var loc = ret.Filter(opt);
                if (loc != null)
                {
                    nr = await loc.CountAsync();
                    if (nr > 0)
                    {
                        ret = loc;
                        findText = false;
                    }
                }

            }
        }
        return ret;
    }
}
