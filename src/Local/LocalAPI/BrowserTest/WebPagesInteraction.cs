namespace BrowserTest;
public record ShowScreenText(BrowserAndPage browserAndPage ,string text,int seconds);
public class WebPagesInteraction
{
    private readonly RunBrowserShareData rbsd;

    public WebPagesInteraction(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }

    public async Task<bool> ShowTextPage(ShowScreenText showScreenText)
    {
        return await rbsd.ShowTextPage(showScreenText);
    }

    public async Task<bool> IncreaseElement(Find3 find)
    {
        return await rbsd.IncreaseElement(find);
    }
}
