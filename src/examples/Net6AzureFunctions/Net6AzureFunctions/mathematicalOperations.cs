
namespace Net6AzureFunctions;

public static class mathematicalOperations
{
    [FunctionName("add")]
    public static ActionResult<int> add(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "add/{x:int}/{y:int}")] HttpRequest req,
        ILogger log,int x, int y)
    {
        //log.LogInformation("C# HTTP trigger function processed a request.");

        //string name = req.Query["name"];

        //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        //dynamic data = JsonConvert.DeserializeObject(requestBody);
        //name = name ?? data?.name;

        //string responseMessage = string.IsNullOrEmpty(name)
        //    ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
        //    : $"Hello, {name}. This HTTP triggered function executed successfully.";

        return new OkObjectResult(x+y);
    }
    [FunctionName("substract")]
    public static ActionResult<int> substract(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "substract/{x:int}/{y:int}")] HttpRequest req,
        ILogger log, int x, int y)
    {
       
        return new OkObjectResult(x - y);
    }
    [FunctionName("testDate")]
    public static ActionResult<DateTime> addToDateDays(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "testDate/{x:datetime}/{y:int}")] HttpRequest req,
        ILogger log, DateTime x, int y)
    {
        
        return new OkObjectResult(x.AddDays( y));
    }
}
