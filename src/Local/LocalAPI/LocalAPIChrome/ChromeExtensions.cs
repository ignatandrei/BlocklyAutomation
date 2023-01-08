﻿
namespace LocalAPIChrome;
public class ChromeExtensions
{
    public async Task<ChromeExtension[]?> MyPCChromeExtensions()
    {
        var d=Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        d = Path.Combine(d, "Google", "Chrome", "User Data", "Default", "Extensions");
        if(!Directory.Exists(d))    
            return null;

        var tasks = Directory
            .GetDirectories(d)
            //.Where(it=>it.Contains("aapocclcgogkmnckokdopfmhonfmgoek"))
            .Select(it => ChromeExtension.FromDir(it));

        var all = (await Task.WhenAll(tasks));

        return all.
            Where(it=>it!=null)
            .Select(ut=>ut!)
            .OrderBy(it=>it.Name)
            .ToArray();
    }

}

