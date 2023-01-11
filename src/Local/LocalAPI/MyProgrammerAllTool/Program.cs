using System.Reflection;

var folder = Assembly.GetExecutingAssembly().Location;
Console.WriteLine($"Executing {folder}");
var entry= Assembly.GetEntryAssembly();
folder = (entry == null) ? "N/A" : entry.Location; 
Console.WriteLine($"Entry {folder}");
Console.WriteLine($"appdir {AppContext.BaseDirectory}");
string[] argus = new[]
{
    "--contentRoot",
    AppContext.BaseDirectory
};
await LocalAPIStarter.Main(argus);