



var builder = WebApplication.CreateBuilder(args);

// Add builder.Services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
                      builder =>
                      {
                          builder
                          .AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          ;
                      });
});
//maybe ODAta? 
//builder.Services.AddOData();
builder.Services.AddControllers()

    .AddJsonOptions(options =>
options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
#region for odata
//builder.Services.AddMvcCore(options =>
//{
//    foreach (var outputFormatter in options.OutputFormatters.OfType<ODataOutputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
//    {
//        outputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
//    }
//    foreach (var inputFormatter in options.InputFormatters.OfType<ODataInputFormatter>().Where(_ => _.SupportedMediaTypes.Count == 0))
//    {
//        inputFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/prs.odatatestxx-odata"));
//    }
//});
#endregion
#region for graphql
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});
builder.Services.Configure<IISServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});
#endregion
builder.Services.AddDbContext<testsContext>(options => options

  .UseInMemoryDatabase(databaseName: "MyDB"));


//this is not necessary to be added
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Please see blockly.html",
        Version = "v1",
        Description = " Please see https://github.com/ignatandrei/netcoreblockly"
    });

});
//builder.Services.AddScoped<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
//builder.Services.AddGraphQL(o => { o.ExposeExceptions = true; })
//                .AddGraphTypes(ServiceLifetime.Scoped);

//builder.Services.AddScoped<DepartmentRepository>();
//builder.Services.AddScoped<DepartmentSchema>();

//var key = Encoding.ASCII.GetBytes(Configuration["ApplicationSecret"]);
//please change also in AuthorizationToken . 
var key = Encoding.ASCII.GetBytes("mySecretKeyThatShouldBeStoredInConfiguration");
builder.Services.AddAuthentication()
    .AddJwtBearer("AuthoBearer", options =>
    {
        options.Authority = "https://ignatandrei.eu.auth0.com/";
        options.Audience = "mytest";
        //options.TokenValidationParameters = new TokenValidationParameters
        //{
        //    NameClaimType = ClaimTypes.NameIdentifier
        //};
    })
    .AddJwtBearer("CustomBearer", options =>
    {
        options.Events = new JwtBearerEvents()
        {
            OnMessageReceived = ctx =>
            {
                if(ctx == null)
                    return Task.CompletedTask;

                if (!(ctx?.Request?.Headers?.ContainsKey("Authorization") ?? true))
                {
                    ctx.NoResult();
                    return Task.CompletedTask;
                };
                var auth = ctx.Request.Headers["Authorization"].ToString();
                if (string.IsNullOrEmpty(auth))
                {
                    ctx.NoResult();
                    return Task.CompletedTask;
                }
                if (!auth.StartsWith("CustomBearer ", StringComparison.OrdinalIgnoreCase))
                {
                    ctx.NoResult();
                    return Task.CompletedTask;
                }

                ctx.Token = auth.Substring("CustomBearer ".Length).Trim();
                return Task.CompletedTask;

            }
        };
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false
        };
    });
builder.Services.AddAuthorization(options =>
{
    //var defaultAuthorizationPolicyBuilder = new AuthorizationPolicyBuilder(
    //    //JwtBearerDefaults.AuthenticationScheme,
    //    "CustomBearer");
    //defaultAuthorizationPolicyBuilder =
    //    defaultAuthorizationPolicyBuilder.RequireAuthenticatedUser();
    //options.DefaultPolicy = defaultAuthorizationPolicyBuilder.Build();
    options.AddPolicy("Auth0Policy", policy =>
    {
        policy.AuthenticationSchemes.Add("AuthoBearer");
        policy.RequireAuthenticatedUser();
    });
    options.AddPolicy("CustomBearer", policy =>
    {
        policy.AuthenticationSchemes.Add("CustomBearer");
        policy.RequireAuthenticatedUser();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
app.UseCors("AllowAll");
app.UseDefaultFiles();
app.UseStaticFiles();

{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();
app.UseAMS();
app.MapFallbackToFile("BlocklyAutomation/{*path:nonfile}", "/BlocklyAutomation/index.html");

using var scope = app.Services.CreateScope();
using var context = scope.ServiceProvider.GetRequiredService<testsContext>();
context.Database.EnsureCreated();


app.Run();
