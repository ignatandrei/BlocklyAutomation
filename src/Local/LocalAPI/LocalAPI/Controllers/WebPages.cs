using BrowserTest;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LocalAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
    public partial class WebPagesController : ControllerBase
    {
        private readonly BrowserRun browserRun;

        public WebPagesController(BrowserRun browserRun)
        {
            this.browserRun = browserRun;
        }


    }
}
