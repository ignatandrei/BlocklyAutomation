using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WindowsRelated;

public record WinGetApp(string id, string name, string description, string url)
{
    public static async Task<WinGetApp> FromId(string id)
    {
        StringBuilder data = new();
        var si = new ProcessStartInfo(@"winget.exe");
        si.Arguments = "show --id "+id;
        si.UseShellExecute = false;
        si.RedirectStandardOutput = true;
        si.RedirectStandardError = true;

        var p = new Process();
        p.StartInfo = si;
        p.OutputDataReceived += (object sender, DataReceivedEventArgs e) =>
        {
            if (!string.IsNullOrWhiteSpace(e.Data))
                data.AppendLine(e.Data);
        };
        p.ErrorDataReceived += (object sender, DataReceivedEventArgs e) =>
        {

        };
        p.Start();
        p.BeginOutputReadLine();
        p.BeginErrorReadLine();
        await p.WaitForExitAsync();
        var lines = data.ToString().Split(Environment.NewLine);
        string name="", description = "", url = "";
        foreach(var l in lines)
        {
            if (FoundData("Found ", l, ref name))
                continue;
            if (FoundData("Description:", l, ref description))
                continue;
            if (FoundData("Homepage:",l, ref url))
                continue;
            if (name.Length * description.Length * url.Length > 0)
                break;
        }
        return new WinGetApp(id, name, description, url);

    }
    static bool FoundData(string start, string l, ref string data)
    {

        if (l.StartsWith(start))
        {
            data = l.Substring(start.Length);
            return true;
        }
        return false;
    }
}
public class WingetApps
{
    public WingetApps() { }
    public async Task<WinGetApp[]> WingetAppFromLocalPC()
    {
        List<WinGetApp> apps = new();
        var fileName=Path.GetRandomFileName();
        fileName = Path.Combine(Path.GetTempPath(), fileName);
        var si = new ProcessStartInfo(@"winget.exe");
        si.Arguments = "export -o " +fileName;
        si.UseShellExecute = false;
        
        var p = new Process();
        p.StartInfo = si;
        p.Start();
        await p.WaitForExitAsync();
        if (!File.Exists(fileName)) return apps.ToArray();
        var text = await File.ReadAllTextAsync(fileName);
        File.Delete(fileName);
        var r = Root.FromJson(text);
        if(r== null)
            return apps.ToArray();
        foreach(var source in r.Sources)
        {
            foreach(var pac in source.Packages)
            {
                var id = pac.PackageIdentifier;
                var pack =await WinGetApp.FromId(id);
                if (pack==null) continue;
                apps.Add(pack);
            }
        }

        return apps.ToArray();
    }
}
