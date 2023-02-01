using BrowserTest;

namespace LocalAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
    public partial class WebPagesMouseController : ControllerBase
    {
        private readonly WebPagesMouse action;
        public WebPagesMouseController(WebPagesMouse action)
        {
            this.action = action;
        }


    }



}
    
