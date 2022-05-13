namespace Net6AzureFunctions;
public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.AddSwashBuckle(Assembly.GetExecutingAssembly());
        //builder.Services.AddHttpClient();

        //builder.Services.AddSingleton<IMyService>((s) => {
        //    return new MyService();
        //});

        //builder.Services.AddSingleton<ILoggerProvider, MyLoggerProvider>();
    }
}
