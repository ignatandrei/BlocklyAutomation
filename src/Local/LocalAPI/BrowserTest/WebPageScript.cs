namespace BrowserTest;

public class WebPageScript
{
    private readonly RunBrowserShareData rbsd;

    public WebPageScript(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }
    public async Task<string?> InjectScript(BrowserAndPage browserAndPage,string script)
    {
        return await rbsd.ExecuteScript(browserAndPage, script);
    }
}
