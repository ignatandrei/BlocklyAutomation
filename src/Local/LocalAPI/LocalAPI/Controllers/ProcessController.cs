using System.Diagnostics;

namespace LocalAPI.Controllers;
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]

public partial class ProcessController
{
    private readonly clsISystem_Diagnostics_Process process;

    public ProcessController(clsISystem_Diagnostics_Process process)
    {
        this.process = process;
        
    }
}

