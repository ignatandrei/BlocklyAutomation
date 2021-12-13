
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddVersionedApiExplorer();
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<ChromeData>();
builder.Services.AddTransient<EmailSender>();
builder.Services
    .AddFluentEmail("fromemail@test.test")
    .AddLiquidRenderer()
    .AddSmtpSender("host",23)    
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
var app = builder.Build();

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
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseAuthorization();
//later: use versioning
app.MapControllers();

app.Run();
