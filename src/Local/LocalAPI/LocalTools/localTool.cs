namespace LocalTools;

public class LocalTool
{
    public int version { get; set; }
    public bool isRoot { get; set; }
    public Dictionary<string,LocalToolData>? tools { get; set; }
}
