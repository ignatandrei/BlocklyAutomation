using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Net.Http;
using System.Runtime.ExceptionServices;

namespace LocalAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]/[action]")]
    public class HttpCallsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public HttpCallsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<string> GetBasicString(string url)
        {
            ExceptionDispatchInfo? exOriginal=null;
            var nrReq = 5;
            while (nrReq > 0)
            {
                var httpRequestMessage = new HttpRequestMessage(
                HttpMethod.Get, url);

                var httpClient = _httpClientFactory.CreateClient();
                var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);
                try
                {
                    httpResponseMessage.EnsureSuccessStatusCode();
                    return await httpResponseMessage.Content.ReadAsStringAsync();
                }
                catch (Exception ex)
                {
                    exOriginal= ExceptionDispatchInfo.Capture(ex);
                }
                await Task.Delay(5000);
                nrReq--;
            }
            exOriginal!.Throw();
            throw exOriginal!.SourceException;


        }
    }
}
