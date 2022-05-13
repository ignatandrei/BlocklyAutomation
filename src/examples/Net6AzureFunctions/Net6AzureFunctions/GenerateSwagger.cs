namespace Net6AzureFunctions;

public  class GenerateSwagger
{
    [SwaggerIgnore]
    [FunctionName("swagger")]
    public Task<HttpResponseMessage> Swagger(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "swagger/json")]
        HttpRequestMessage req,
        [SwashBuckleClient] ISwashBuckleClient swashBuckleClient)
    {
        return Task.FromResult(swashBuckleClient.CreateSwaggerJsonDocumentResponse(req));
    }
    [SwaggerIgnore]
    [FunctionName("swaggerui")]
    public Task<HttpResponseMessage> SwaggerUi(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "swagger/ui")]
        HttpRequestMessage req,
        [SwashBuckleClient] ISwashBuckleClient swashBuckleClient)
    {
        return Task.FromResult(swashBuckleClient.CreateSwaggerUIResponse(req, "swagger/json"));
    }
}

