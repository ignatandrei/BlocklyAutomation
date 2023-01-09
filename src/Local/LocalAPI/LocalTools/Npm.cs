
using System;
using System.Diagnostics;

namespace LocalTools;

public record npmPackage(string Id, string? Name)
{
    public static npmPackage? FromLine(string line)
    {
        string pac = "pacote:tarball:";
        if (!line.StartsWith(pac))
            return null;
        var package = line.Substring(pac.Length );
        if(string.IsNullOrWhiteSpace(package)) return null;
        var arond = package.LastIndexOf('@');
        if(arond>0)
            package= package.Substring(0, arond);
        if (package.StartsWith("file:"))
            return null;
        if (package.StartsWith("github:"))
            return null;

        
        return new npmPackage(package, package);
    }
    public string Url
    {
        get
        {
            //var rep = Id.Replace("@", "%40").Replace("/", "%2F");
            return "https://registry.npmjs.org/" + Id;
            //return "https://www.npmjs.com/package/" + Id;
        }
        set
        {
        }
    }

}

public class NPMs
{
    public async Task<npmPackage[]?> FindNPMs()
    {

        StringBuilder data = new();
        var si = new ProcessStartInfo(@"C:\Program Files\nodejs\npm.cmd");
        si.Arguments = "cache ls";
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
        var ret = lines
            .Select(it=> npmPackage.FromLine(it))
            .Where(it=> it != null)
            .Select(it=>it!)
            .ToArray();
        ret = ret.DistinctBy(p => p.Id).ToArray();
        return ret;
        
    }
}