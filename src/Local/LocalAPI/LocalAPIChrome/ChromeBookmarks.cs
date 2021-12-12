namespace LocalAPIChrome;
public class ChromeBookmarks
{
    public async Task<ChromeBookmark[]?> GetUrls()
    {
        switch (Environment.OSVersion.Platform)
        {
            case PlatformID.Win32NT:
                break;
            default:
                throw new ArgumentException($"not yet ready for "+Environment.OSVersion.Platform);
        }

        var local= Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var chromePathBookmark = Path.Combine(local, "Google", "Chrome", "User Data", "Default");
        chromePathBookmark = Path.Combine(chromePathBookmark, "Bookmarks");
        if (!File.Exists(chromePathBookmark))
            throw new FileNotFoundException(chromePathBookmark);

        var data = await File.ReadAllTextAsync(chromePathBookmark);
        var node = JsonNode.Parse(data);
        JsonNode? roots = node["roots"];
        if (roots == null)
            return null;
        JsonNode? bookmark_bar = roots["bookmark_bar"];
        if (bookmark_bar == null)
            return null;
        return parseRecursive(bookmark_bar);

     }

    private ChromeBookmark[] parseRecursive(JsonNode node)
    {
        var result = new List<ChromeBookmark>();
        if (node is JsonArray )
        {
            var arr = node.AsArray();
            //verify it is array
            if (arr != null && arr.Count > 0)
            {
                foreach (var child in arr)
                {
                    var data = parseRecursive(child);
                    result.AddRange(data.Where(it => it != null).ToArray());
                }
                return result.ToArray();
            }
        }

        
        JsonNode? children = node["children"];
        //verify it has children
        if(children != null)
        {
            var data=parseRecursive(children);
            result.AddRange(data.Where(it=>it != null).ToArray());
            return result.ToArray();
        }
        
        //try to deserialize 
        try
        {
            var res= node.Deserialize<ChromeBookmark>();
            result.Add(res);
            return result.ToArray();
        }
        catch (Exception ex)
        {
            //todo: log
        }
        return result.ToArray();
    }
}
