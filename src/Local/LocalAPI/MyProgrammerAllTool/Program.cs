using System.Reflection;

var folder = Assembly.GetExecutingAssembly().Location;
Console.WriteLine($"Executing {folder}");
var entry= Assembly.GetEntryAssembly();
folder = (entry == null) ? "N/A" : entry.Location; 
Console.WriteLine($"Entry {folder}");
Console.WriteLine($"appdir {AppContext.BaseDirectory}");

var exitCode = Microsoft.Playwright.Program.Main(new[] { "install" });
if (exitCode != 0)
{
    Console.WriteLine("Failed to install browsers");
    Environment.Exit(exitCode);
}
Console.WriteLine("finish install browsers");

string[] argus = new[]
{
    "--contentRoot",
    AppContext.BaseDirectory
};


await LocalAPIStarter.Main(argus);