namespace LocalTools;

public record NuGet(string Id, string? Name)
{
    public static async Task<NuGet?> FromDir(string folder)
    {
        var dir = new DirectoryInfo(folder);
        if (!dir.Exists)  return null;
        var dirVersion = dir.GetDirectories()
                .OrderByDescending(it => it.LastWriteTimeUtc)
                .FirstOrDefault();
        if(dirVersion== null) return null;
        var f = dirVersion.GetFiles("*.nuspec").FirstOrDefault();
        if(f==null) return null;
        var content = await File.ReadAllTextAsync(f.FullName);
        if ((content?.Length ?? 0) < 10)
            return null;

        var x = new XmlDocument();
        x.LoadXml(content!);
        var node = x.SelectNodes("//*[local-name() = 'metadata']");

        if ((node?.Count ?? 0) == 0)
            return null;
        var meta = node![0]!;
        string? id = null;
        foreach(XmlNode child in meta.ChildNodes)
        {
            if (child.Name == "id") {
                id = child.InnerText;
                break;
            }
            
        }
        if (id == null)
            return null;
        var name = id;
        
        return new NuGet(id, name);
    }
    public string Url
    {
        get
        {
            return "https://www.nuget.org/packages/" + Id;
        }
        set
        {
        }
    }
}
public class NuGets
{
    public async Task<NuGet[]?> FindNuGets()
    {
        var dir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var nuget = Path.Combine(dir, ".nuget", "packages");
        if(Directory.Exists(nuget) && Directory.GetDirectories(nuget).Length==0)
        {
            nuget = @"D:\MyPackages\.nuget\packages";
        }
        if (!Directory.Exists(nuget))
        {
                return null;
        }

        var all = Directory
            .GetDirectories(nuget)
            //.Where(it=>it.Contains("alefragnani.bookmarks-13.2.2"))
            .Select(it => NuGet.FromDir(it));
        var ret = await Task.WhenAll(all);
        return ret.Where(it => it != null).Select(it => it!).ToArray();


    }
}
