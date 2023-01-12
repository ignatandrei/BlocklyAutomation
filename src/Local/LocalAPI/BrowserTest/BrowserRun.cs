using Microsoft.Playwright;
using System.Text;  

namespace BrowserTest
{
    public record RespAnswer(bool ok, int status, string statusText);
    public enum BrowserType
    {
        None = 0,
        Chromium = 1,
        Firefox=2,
    }
    
    public class BrowserRun
    {
        static BrowserRun()
        {
            var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
            if (exitCode != 0)
            {
                Console.WriteLine("Failed to install browsers");
                Environment.Exit(exitCode);
            }
            Console.WriteLine("finish install browsers");
            
        }

        static IPlaywright playwright;
        static Dictionary<string, IBrowser> ExistingBrowsers = new();
        static Dictionary<IBrowser, Dictionary<string,IPage>> pages = new();
        static Dictionary<IPage, IResponse> responses = new();
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
        public async Task<string> GetNewBrowser(bool headless, BrowserType browserType, string id)
        {
            if (ExistingBrowsers.ContainsKey(id))
            {
                await CloseBrowser(id);
            }
            if (playwright == null)
            {
                playwright = await Playwright.CreateAsync();
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
        private async Task<IPage?> GotoPageOrExisting(string browserId, string url)
        {
            if (!ExistingBrowsers.ContainsKey(browserId))
            {
                throw new ArgumentException("please first create browser");
            }
            var browser = ExistingBrowsers[browserId];
            if (browser == null) return null;
            IPage? page;
            if (!pages[browser].ContainsKey(url))
            {
                page = await browser.NewPageAsync();
                pages[browser].Add(url, page);  
            }
            page = pages[browser][url];
            if (page == null) return null;
            var resp = await page.GotoAsync(url);
            if (resp == null) return null;
            await resp.FinishedAsync();
            responses.Add(page, resp);
            return page;
        }
        public async Task<RespAnswer?> GotoPage(string browserId, string url)
        {
            var page = await GotoPageOrExisting(browserId, url);
            if (page == null) return new RespAnswer(false, -1, "Not have page"); 

            var resp = responses[page];
            if (resp == null) return new RespAnswer(false, -1, "Not have response") ;

            return new RespAnswer(resp.Ok, resp.Status, resp.StatusText);
            
        }
        public async Task<string?> GetResponseBodyText(string browserId, string url)
        {
            var page = await GotoPageOrExisting(browserId, url);
            if (page == null) return null;

            var resp = responses[page];
            if (resp == null) return null; 
            return Encoding.UTF8.GetString(await resp.BodyAsync());
        }
        public async Task<byte[]?> GetScreenshot(string browserId, string url)
        {
            var page = await GotoPageOrExisting(browserId, url);
            if (page == null) return null;
            var sc=await page.ScreenshotAsync();
            return sc;
        }
    }
}