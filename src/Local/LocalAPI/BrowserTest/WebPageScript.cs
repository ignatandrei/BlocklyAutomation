namespace BrowserTest;

public class WebPagesScript
{
    private readonly RunBrowserShareData rbsd;

    public WebPagesScript(RunBrowserShareData runBrowserShareData)
    {
        this.rbsd = runBrowserShareData;
    }
    public async Task<string?> InjectScript(ExecuteScriptNoArgs executeScriptNoArgs)
    {
        try
        {
            return await rbsd.ExecuteScript(executeScriptNoArgs);
        }
        catch(Exception)
        {
            throw;
        }
    }
}
