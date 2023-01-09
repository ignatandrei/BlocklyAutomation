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
        si.Arguments = "show -id "+id;
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
        string name, string description, string url;
        foreach(var l in lines)
        {
            string f = "Found ";
            if (l.StartsWith(f))
            {
                name=l.Substring(f.Length);
                continue;
            }


        }

    }
}
public class WingetApps
{
    public WingetApps() { }
    public async Task<WinGetApp[]> WingetAppFromLocalPC()
    {
        List<WinGetApp> apps = new();
        var fileName=Path.GetRandomFileName();
        var si = new ProcessStartInfo(@"winget.exe");
        si.Arguments = "export -o " +fileName;
        si.UseShellExecute = false;
        
        var p = new Process();
        p.StartInfo = si;
        p.Start();
        await p.WaitForExitAsync();
        if (!File.Exists(fileName)) return apps.ToArray();
        var text = await File.ReadAllTextAsync(fileName);
        var r = Root.FromJson(text);
        if(r== null)
            return apps.ToArray();
        foreach(var source in r.Sources)
        {
            foreach(var p in source.Packages)
            {
                var id = p.PackageIdentifier;

            }
        }

        return apps.ToArray();
    }
}
