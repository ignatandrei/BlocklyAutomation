using NetCore2BlocklyNew;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseDefaultFiles();
app.UseStaticFiles();
//app.UseAuthorization();


app.MapControllers();

app.UseBlocklyUI(app.Environment);
app.UseBlocklyAutomation();
//app.Map("BlocklyAutomation/{**slug:nonfile}", async ctx =>
//{
//    var q= ctx.Response;
//    //await q.SendFileAsync("BlocklyAutomation/index.html");
//    q.Redirect("/BlocklyAutomation/index.html", false, true);
//    //return Task.CompletedTask;
//    //ctx.Response
//});

//app.MapFallbackToFile("BlocklyAutomation/{**slug}", "index.html");
//app.UseBlocklyAutomation();
app.Run();
