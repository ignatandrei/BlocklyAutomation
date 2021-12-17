using Microsoft.AspNetCore.Authorization;

namespace LocalAPI.Controllers;

[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[ApiController]
public class ManagementController : ControllerBase
{
    internal static CancellationTokenSource? cts;
    [HttpGet]
    public string CurrentDate()
    {
        return DateTime.UtcNow.ToString("u");
    }
    [HttpPost]
    public void Stop()
    {
        cts?.Cancel();
    }
    [Authorize]
    [HttpGet]
    public string? WhoAmI()
    {
        return this.User?.Identity?.Name;
    }
}

