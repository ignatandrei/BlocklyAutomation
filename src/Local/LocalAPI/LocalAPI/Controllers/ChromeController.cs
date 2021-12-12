namespace LocalAPI.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.AllPost, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class ChromeController : ControllerBase
{
    private readonly ChromeData chromeBookmarks;

    public ChromeController(ChromeData chromeBookmarks)
    {
        this.chromeBookmarks = chromeBookmarks;
    }

    //[HttpGet]
    //public IAsyncEnumerable<ChromeBookmark> ChromeBookmarks()
    //{
    //    return this.chromeBookmarks.GetUrlsEnumerable();
    //}
    //[HttpGet]
    //public  Task<ChromeBookmark[]> ChromeBookmarks1()
    //{
    //    return this.chromeBookmarks.GetUrls();
    //}
}

