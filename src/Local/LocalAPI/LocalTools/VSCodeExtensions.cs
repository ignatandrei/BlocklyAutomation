
namespace LocalTools;

public record VSCodeExtension(string Id, string Name)
{
    public static async Task<VSCodeExtension?> FromDir(string folder)
    {
        var dir = new DirectoryInfo(folder);
        var id = dir.Name.Split("-")[0];
        //read the .vsix file
        var f = Path.Combine(folder, ".vsixmanifest");
        if (!File.Exists(f))
            return null;
        var content = await File.ReadAllTextAsync(f);
        if ((content?.Length??0) < 10)
            return null;
        var x = new XmlDocument();
        x.LoadXml(content!);
       var node= x.SelectNodes("//*[local-name() = 'DisplayName']");
        if ((node?.Count??0) == 0)
            return null;
        var name = node![0]?.InnerText??id;
        return new VSCodeExtension(id, name);
    }
    public string Url
    {
        get
        {
            return "https://marketplace.visualstudio.com/items?itemName=" + Id;
        }
        set
        {
        }
    }
}
public class VSCodeExtensions
{
    public async Task<VSCodeExtension[]?> FindVSCodeExtension()
    {
        var dir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var vscodeExt = Path.Combine(dir, ".vscode", "extensions");
        if (!Directory.Exists(vscodeExt))
            return null;

        var all = Directory
            .GetDirectories(vscodeExt)
            //.Where(it=>it.Contains("alefragnani.bookmarks-13.2.2"))
            .Select(it => VSCodeExtension.FromDir(it));
        var ret = await Task.WhenAll(all);
        return ret.Where(it => it != null).Select(it=>it!).ToArray();
    }
}

