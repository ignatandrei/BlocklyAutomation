namespace LocalAPI.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ManagementController : ControllerBase
{
    public static CancellationTokenSource cts;
    public void Restart()
    {
        cts.Cancel();
    }
}

