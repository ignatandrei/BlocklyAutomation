
namespace LocalAPI.Controllers;



[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.AllPostWithRecord, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]


public partial class BASaveController : ControllerBase
{
    private readonly RepoBlocksSimple blocksSimple;

    public BASaveController(RepoBlocksSimple blocksSimple)
    {
        this.blocksSimple = blocksSimple;
    }
    
}

