using BrowserTest;
using LocalTools;
using Microsoft.Extensions.Options;
using Microsoft.Playwright;
using System.Reflection;
using WindowsRelated;
public class LocalAPIStarter
{
    public static async Task<int> Main(string[] args)
    {
        //var rootPath = AppContext.BaseDirectory;
        var builder = WebApplication.CreateBuilder(args);
        //https://learn.microsoft.com/en-us/aspnet/core/migration/50-to-60-samples?view=aspnetcore-7.0
        //var builder = WebApplication.CreateBuilder(new WebApplicationOptions
        //{
        //    Args = args,
        //    ApplicationName = typeof(LocalAPIStarter).Assembly.FullName,
        //    ContentRootPath = rootPath,
        //    WebRootPath = "wwwroot"
        //});
        //builder.WebHost.UseContentRoot(rootPath);
        //builder.Host.UseContentRoot(rootPath);
        // Add services to the container.

        builder.Services.AddControllers()
            .AddApplicationPart(typeof(LocalAPIStarter).Assembly)
            .AddControllersAsServices()
            .AddJsonOptions(c =>

            {
                c.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                c.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                c.JsonSerializerOptions.IgnoreReadOnlyFields = true;
                c.JsonSerializerOptions.IgnoreReadOnlyProperties = true;//directory info
            });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddVersionedApiExplorer();
        //builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddTransient<RepoBlocksSimple>();
        builder.Services.AddTransient<ChromeData>();
        builder.Services.AddTransient<EmailSender>();
        builder.Services.AddTransient<ISystem_Environment>(_ => new clsISystem_Environment());
        builder.Services.AddTransient<IFileSystem>(_ => new FileSystem());
        builder.Services.AddTransient<IFile>((sp) => new FileSystem().File);
        builder.Services.AddTransient<IDirectory>((sp) => new FileSystem().Directory);
        builder.Services.AddTransient<clsISystem_Diagnostics_Process>();
        builder.Services.AddTransient<ChromeExtensions>();
        builder.Services.AddTransient<PowershellTools>();
        builder.Services.AddTransient<VSCodeExtensions>();
        builder.Services.AddTransient<NuGets>();
        builder.Services.AddTransient<NPMs>();
        builder.Services.AddTransient<Apps>();
        builder.Services.AddTransient<WingetApps>();
        builder.Services.AddTransient<dotNetTools>();
        builder.Services.AddTransient<BrowserRun>();
        builder.Services.AddTransient<BrowserActions>();
        builder.Services.AddTransient<WebPagesScreenshot>();
        builder.Services.AddTransient<WebPagesTypings>();
        builder.Services.AddTransient<WebPagesMouse>();
        builder.Services.AddTransient<WebPagesFinder>();
        builder.Services.AddTransient<WebPagesScript>();
        builder.Services.AddTransient<WebPagesInteraction>();
        //builder.Services.AddTransient<WebPages>();

        //builder.Configuration.GetDebugView();
        EmailConfig cfgEmail = new();
        builder.Configuration.GetSection("plugins:email").Bind(cfgEmail);
        cfgEmail.from = string.IsNullOrWhiteSpace(cfgEmail.from) ? "fromemail@test.test" : cfgEmail.from;
        var b = builder.Services
            .AddFluentEmail(cfgEmail.from)
            .AddLiquidRenderer()
            ;

        if (string.IsNullOrWhiteSpace(cfgEmail.username))
            b.AddSmtpSender(cfgEmail.host, cfgEmail.port);
        else
            b.AddSmtpSender(cfgEmail.host, cfgEmail.port, cfgEmail.username, cfgEmail.password);
        ;
        builder.Services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
        });
        builder.Services.AddVersionedApiExplorer(setup =>
        {
            setup.GroupNameFormat = "'v'VVV";
            setup.SubstituteApiVersionInUrl = true;
        });
        builder.Services.AddHttpClient();
        var p= await Playwright.CreateAsync();
        builder.Services.AddSingleton(p);
        builder.Services.AddSingleton<RunBrowserShareData>();
        builder.Services.AddProblemDetails();
        //builder.Services.AddAuthentication(NegotiateDefaults.AuthenticationScheme)
        //   .AddNegotiate();

        var app = builder.Build();

        app.UseExceptionHandler();
        app.UseStatusCodePages();

        app.UseDeveloperExceptionPage();

        app.UseCors(it => it
        .AllowAnyHeader()
        .AllowCredentials()
        .AllowAnyMethod()
        .SetIsOriginAllowed(it => true)
        );
        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                //foreach (var description in provider.ApiVersionDescriptions)
                //{
                //    options.SwaggerEndpoint(
                //        $"/swagger/{description.GroupName}/swagger.json",
                //        description.GroupName.ToUpperInvariant());
                //}
            });
        }
        app.UseApiVersioning();
        //app.UseHttpsRedirection();
        app.UseDefaultFiles();
        app.UseStaticFiles();
        //app.UseAuthorization();
        //later: use versioning
        app.MapControllers();
        app.UseAMS();
        app.MapFallbackToFile("/BlocklyAutomation/{**slug:nonfile}", "BlocklyAutomation/index.html");
        ManagementController.cts = new();
        app.Urls.Add("http://localhost:37283");
        //while (true)
        {//
            try
            {
                await app.RunAsync(ManagementController.cts.Token);
            }
            catch (OperationCanceledException)
            {
                //ManagementController.cts = new();
                Console.WriteLine("restarted");
            }
        } 
        return 0;
    }
}