namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.AllPostWithRecord, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class FileController : ControllerBase
{
    private readonly IFile fs;

    public FileController(IFile fs)
    {
        this.fs = fs;
    }
}

