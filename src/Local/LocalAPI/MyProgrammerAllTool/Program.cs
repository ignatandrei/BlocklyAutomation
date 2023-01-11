using System.Reflection;

var folder = Assembly.GetExecutingAssembly().Location;
Console.WriteLine($"Executing {folder}");
var entry= Assembly.GetEntryAssembly();
folder = (entry == null) ? "N/A" : entry.Location; 
Console.WriteLine($"Entry {folder}");
await LocalAPIStarter.Main(null);