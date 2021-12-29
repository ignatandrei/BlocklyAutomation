using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [AutoActions(template = TemplateIndicator.AllPostWithRecord, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
    public partial class EnvironmentController : ControllerBase
    {
        private readonly ISystem_Environment system_Environment;

        public EnvironmentController(ISystem_Environment system_Environment)
        {
            this.system_Environment = system_Environment;
        }
    }
}
