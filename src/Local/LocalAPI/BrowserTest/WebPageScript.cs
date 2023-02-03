namespace BrowserTest;

public class WebPagesScript
{
    private readonly RunBrowserShareData rbsd;

    public WebPagesScript(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }
    public async Task<string?> InjectScript(BrowserAndPage browserAndPage,string script)
    {
        return await rbsd.ExecuteScript(browserAndPage, script);
    }
}
