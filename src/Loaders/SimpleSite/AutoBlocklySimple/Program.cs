using AMSWebAPI;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.UseAMS();
    endpoints.MapFallbackToFile("/BlocklyAutomation/{**slug}", "BlocklyAutomation/index.html");
});
app.Run();

