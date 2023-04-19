
using WindowsRelated;

namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]

[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]

public partial class WindowsOpController : ControllerBase
{
    private readonly PSR psr;
    private readonly Apps apps;
    private readonly WingetApps winget;
    private readonly ServiceMgmtLocal localServices;

    public WindowsOpController(PSR psr,Apps  apps, WingetApps winget, ServiceMgmtLocal localServices)
	{
        this.psr = psr;
        this.apps = apps;
        this.winget = winget;
        this.localServices = localServices;
    }
   
}
