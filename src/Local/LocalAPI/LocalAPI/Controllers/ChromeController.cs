namespace LocalAPI.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
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

