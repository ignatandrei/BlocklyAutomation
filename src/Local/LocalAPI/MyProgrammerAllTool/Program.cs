using System.Diagnostics;
using System.Reflection;
using System.Runtime.InteropServices;

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


await Task.WhenAll(OpenBrowser("http://localhost:37283"), LocalAPIStarter.Main(argus));


static async Task OpenBrowser(string url)
{
    await Task.Delay(3000);

    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
    {
        Process.Start(new ProcessStartInfo(url) { UseShellExecute = true }); 
    }
    else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
    {
        Process.Start("xdg-open", url);  
    }
    else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
    {
        Process.Start("open", url); 
    }
    else
    {
        throw new ArgumentException("What os is this?");
    }
}