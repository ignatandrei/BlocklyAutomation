using BrowserTest;

namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class WebPagesFinderController : ControllerBase
{
    private readonly WebPagesFinder action;
    public WebPagesFinderController(WebPagesFinder action)
    {
        this.action = action;
    }


}

