
namespace LocalAPIChrome;
public record ChromeExtension(string Id, string Name)
{
    public static async Task<ChromeExtension?> FromDir(string dir)
    {
        if(dir == null)return null;
        var id=new DirectoryInfo( dir).Name;
        var version = Directory
            .GetDirectories(dir)
            .Select(it=>new DirectoryInfo(it))
            .OrderByDescending(it=>it.LastWriteTime)
            .FirstOrDefault();
        if(version == null) return null;
        var manifest = Path.Combine(version.FullName, "manifest.json");
        if(!File.Exists(manifest)) return null;
        var content= await File.ReadAllTextAsync(manifest);
        if(content == null) return null;
        var obj = JsonObject.Parse(content!)?.AsObject();
        if(obj == null) return null;
        if(!obj.ContainsKey("name"))
            return null;
        var name = obj["name"]!.GetValue<string>();
        if (name == null) return null;
        if (name.StartsWith("__MSG_"))
        {
            var key = name.Replace("__MSG_", "").Replace("__","");
            var locale = Path.Combine(version.FullName, "_locales");
            if (Directory.Exists(locale))
            {
                var dirs = Directory.GetDirectories(locale);
                if (dirs.Length > 0)
                {
                    var dirLang = dirs.FirstOrDefault(it => 
                    
                    it.EndsWith("en")
                    ||
                    it.EndsWith("en_US")
                    ||
                    it.EndsWith("en_GB")
                    ) ?? dirs[0];
                    var message = await File.ReadAllTextAsync(Path.Combine(dirLang, "messages.json"));
                    var mess = JsonObject.Parse(message!)?.AsObject();
                    if (mess != null) 
                    {
                        JsonObject? objLocale= null;
                        if (mess.ContainsKey(key))
                        {
                            objLocale = mess[key]!.AsObject();
                        }else if (mess.ContainsKey(key.ToLower())){
                            objLocale = mess[key.ToLower()]!.AsObject();
                        }
                        if(objLocale != null)
                        {
                            name = objLocale!["message"]?.ToString()??name;
                        }
                    }

                }
            }
        }

        return new ChromeExtension(id!, name);

    }
    public string Url
    {
        get
        {
            return "https://chrome.google.com/webstore/detail/" + Id;
        }
        set
        {

        }
    }
}

