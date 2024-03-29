﻿
using System;
using System.Diagnostics;

namespace LocalTools;

public record npmPackage(string Id, string? Name)
{
    public static npmPackage? FromLine(string line)
    {
        string pac = "pacote:tarball:";
        if (!line.StartsWith(pac))
        {
            pac = "make-fetch-happen:request-cache:";
            if (!line.StartsWith(pac))
                return null;
        }
        var package = line.Substring(pac.Length );
        if(string.IsNullOrWhiteSpace(package)) return null;
        if (package.StartsWith("https://registry.npmjs.org/"))
        {
            package = package.Substring("https://registry.npmjs.org/".Length);
            string[] parts = package.Split('/');
            if (parts.Length >= 2)
            {

                package = parts[0]+"/"+parts[1];
                return new npmPackage(package, package);
            }
        }
        //var arond = package.LastIndexOf('@');
        //if(arond>0)
        //    package= package.Substring(arond);
        //if (package.StartsWith("file:"))
        //    return null;
        //if (package.StartsWith("github:"))
        //    return null;

        return null;
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
    private string LocationExe(string exe)
    {
        var p = new Process();
        p.StartInfo.FileName = "where";
        p.StartInfo.Arguments = exe;
        p.StartInfo.UseShellExecute = false;
        p.StartInfo.RedirectStandardOutput = true;
        p.Start();
        p.WaitForExit();
        var output = p.StandardOutput.ReadToEnd();
        var lines= output.Split(Environment.NewLine);
        output = lines[0];
        return output;
    }
    public async Task<npmPackage[]?> FindNPMs()
    {

        StringBuilder data = new();
        //var si = new ProcessStartInfo(@"C:\Program Files\nodejs\npm.cmd");
        string npmLocation = LocationExe("npm.cmd");
        var si = new ProcessStartInfo(npmLocation);
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