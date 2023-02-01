using BrowserTest;

namespace LocalAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
    public partial class WebPagesScreenshotController : ControllerBase
    {
        private readonly WebPagesScreenshot action;
        public WebPagesScreenshotController(WebPagesScreenshot action)
        {
            this.action = action;
        }


    }



}
    
