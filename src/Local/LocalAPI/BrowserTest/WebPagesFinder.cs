namespace BrowserTest;
public record Find3(BrowserAndPage browserAndPage, string selector1, string selector2, string selector3, string text);
public class WebPagesFinder
{
    private readonly RunBrowserShareData rbsd;

    public WebPagesFinder(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }
    public async Task<int> FindNumberElements3(Find3 find)
    {
        var data = await rbsd.FindNumberElements3(find);
        var (loc, nr) = data.ToValueTuple();
        
        if(loc !=null)
            await loc.HighlightAsync();
        
        return nr;
    }
}


