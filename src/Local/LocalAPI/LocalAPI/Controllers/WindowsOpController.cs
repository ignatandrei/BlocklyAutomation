
using WindowsRelated;

namespace LocalAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
[ApiVersion("1.0")]

[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]

public partial class WindowsOpController : ControllerBase
{
    private readonly Apps apps;

    public WindowsOpController(Apps  apps)
	{
        this.apps = apps;
    }
   
}
