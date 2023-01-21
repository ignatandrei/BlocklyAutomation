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

    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    [AutoActions(template = TemplateIndicator.NoArgs_Is_Get_Else_Post, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
    public partial class WebPagesBrowserController : ControllerBase
    {
        private readonly BrowserActions BrowserActions;
        public WebPagesBrowserController(BrowserActions browserActions)
        {
            this.BrowserActions = browserActions;
        }


    }



}
    
