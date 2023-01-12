using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalTools;

public class LocalTool
{
    public int version { get; set; }
    public bool isRoot { get; set; }
    public Dictionary<string,LocalToolData>? tools { get; set; }
}

public class LocalToolData
{
    public string? version { get; set; }
    public List<string>? commands { get; set; }
}

