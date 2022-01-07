namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class MyTools : ControllerBase
{
    private readonly ChromeExtensions chromeExt;
    private readonly PowershellTools pwsTools;
    private readonly VSCodeExtensions extension;

    public MyTools(ChromeExtensions chromeExt, PowershellTools pwsTools, VSCodeExtensions extension)
    {
        this.chromeExt = chromeExt;
        this.pwsTools = pwsTools;
        this.extension = extension;
    }
}

