
namespace LocalAPIChrome;
public class ChromeExtensions
{
    public async Task<ChromeExtension[]?> Data()
    {
        var d=Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        d = Path.Combine(d, "Google", "Chrome", "User Data", "Default", "Extensions");
        if(!Directory.Exists(d))    
            return null;

        var tasks = Directory
            .GetDirectories(d)
            .Select(it => ChromeExtension.FromDir(it));

        var all = (await Task.WhenAll(tasks));

        return all.
            Where(it=>it!=null)
            .Select(ut=>ut!)
            .ToArray();
    }

}

