using System.Diagnostics;

namespace LocalAPIChrome;

[DebuggerDisplay($"{{{nameof(GetDebuggerDisplay)}(),nq}}")]
public class ChromeBookmark
{
    public string date_added { get; set; }
    public string guid { get; set; }
    public string id { get; set; }
    public string name { get; set; }
    public string type { get; set; }
    public string url { get; set; }

    private string GetDebuggerDisplay()
    {
        return ToString();
    }
}
