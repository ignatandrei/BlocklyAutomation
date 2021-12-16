namespace LocalAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ManagementController : ControllerBase
{
    internal static CancellationTokenSource? cts;

    [HttpPost]
    public void Stop()
    {
        cts?.Cancel();
    }
}

