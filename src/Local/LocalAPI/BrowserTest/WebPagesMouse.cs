using Microsoft.Playwright;

namespace BrowserTest;
public class WebPagesMouse
{
    private readonly RunBrowserShareData rbsd;

    public WebPagesMouse(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }
    public async Task<bool> Click(BrowserAndPage browserAndPage, SelectCriteria selectCriteria, string selector)
    {
        var page = await rbsd.GotoPageOrExisting(browserAndPage.browserId, browserAndPage.Url);
        if (page == null) return false;
        var loc = await rbsd.GetLocator(browserAndPage, selectCriteria, selector);
        if (loc == null)
            return false;

        await loc.ClickAsync();
        return true;
    }
    public async Task<bool> ClickFind3(Find3 find)
    {
        var data= await rbsd.FindNumberElements3(find);
        var (loc, nr) = data;
        if (nr <= 0)
            return false;
        if (loc == null)
            return false;
        if(!await loc.IsVisibleAsync())
            await loc.ScrollIntoViewIfNeededAsync();
        await loc.ClickAsync();
        return true;
    }
}