using System;
using System.Diagnostics;
using System.Formats.Tar;

namespace WindowsRelated;

public class PSR
{
    public bool Stop()
    {
        var p = psr("/stop",true);
        if (psr == null) return false;
        p.Start();
        p.WaitForExit();
        return true;
    }
    private Process? psr(string args, bool createNoWindow)
    {
        var psrPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.System), "psr.exe");
        if (!File.Exists(psrPath))
        {
            return null;
        }
        Process p = new Process();
        p.StartInfo.FileName = psrPath;
        p.StartInfo.CreateNoWindow = createNoWindow;
        p.StartInfo.Arguments = args;
        //p.StartInfo.WorkingDirectory = Environment.GetFolderPath(Environment.SpecialFolder.System);
        p.StartInfo.UseShellExecute = true;
        return p;
    }
    public bool Start(string output, bool gui, int nrScreenshots)
    {
        
        var args =$"""/start /output "{output}" /gui {(gui?1:0)} /sc 1 /sketch 1 /maxsc {nrScreenshots}""";
        var p = psr(args,!gui);
        if (p == null) return false;
        p.Start();
        return true;
    }
}
