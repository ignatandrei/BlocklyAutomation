namespace LocalAPIChrome;
public class ChromeData
{
    public async IAsyncEnumerable<ChromeBookmark> GetUrlsEnumerable()
    {

        switch (Environment.OSVersion.Platform)
        {
            case PlatformID.Win32NT:
                break;
            default:
                throw new ArgumentException($"not yet ready for " + Environment.OSVersion.Platform);
        }

        var local = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var chromePathBookmark = Path.Combine(local, "Google", "Chrome", "User Data", "Default");
        chromePathBookmark = Path.Combine(chromePathBookmark, "Bookmarks");
        if (!File.Exists(chromePathBookmark))
            throw new FileNotFoundException(chromePathBookmark);

        var data = await File.ReadAllTextAsync(chromePathBookmark);
        var node = JsonNode.Parse(data);
        JsonNode? roots = node["roots"];
        if (roots == null)
            yield break ;
        JsonNode? bookmark_bar = roots["bookmark_bar"];
        if (bookmark_bar == null)
            yield break;
        foreach(var item in parseRecursive(bookmark_bar))
        {
            yield return item;
        }
        
    }
    public async Task<ChromeBookmark[]?> GetUrls()
    {
        var result = new List<ChromeBookmark>();
        await foreach (var item in GetUrlsEnumerable())                                       
            result.Add(item);

        return result.ToArray();
        
    }
    private IEnumerable< ChromeBookmark> parseRecursive(JsonNode node)
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
                    if (child == null)
                        continue;
                    var data = parseRecursive(child);
                    foreach (var item in data.Where(it => it != null).ToArray())
                        yield return item;
                    
                }
                
            }
            yield break;
        }

        
        JsonNode? children = node["children"];
        //verify it has children
        if(children != null)
        {
            var data=parseRecursive(children);
            foreach (var item in data.Where(it => it != null).ToArray())
                yield return item;

            yield break;
        }

        //try to deserialize 
        ChromeBookmark? res = null;
        try
        {
            res= node.Deserialize<ChromeBookmark>();
        }
        catch (Exception ex)
        {
            //todo: log
        }
        if(res != null)
            yield return res;
        else
            yield break;
    }
}
