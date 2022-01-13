namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class MyToolsController : ControllerBase
{
    private readonly ChromeExtensions chromeExt;
    private readonly PowershellTools pwsTools;
    private readonly VSCodeExtensions extension;
    private readonly NuGets nuGets;

    public MyToolsController(ChromeExtensions chromeExt, PowershellTools pwsTools, VSCodeExtensions extension, NuGets nuGets)
    {
        this.chromeExt = chromeExt;
        this.pwsTools = pwsTools;
        this.extension = extension;
        this.nuGets = nuGets;
    }
}

