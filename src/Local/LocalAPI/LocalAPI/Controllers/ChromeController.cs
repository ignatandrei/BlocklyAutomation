namespace LocalAPI.Controllers;

[ApiController]
[Route("[controller]/[action]")]
[AutoActions(template = TemplateIndicator.AllPost, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class ChromeController : ControllerBase
{
    private readonly ChromeData chromeBookmarks;

    public ChromeController(ChromeData chromeBookmarks)
    {
        this.chromeBookmarks = chromeBookmarks;
    }
}

