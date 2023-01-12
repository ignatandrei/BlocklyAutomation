using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.XPath;

namespace LocalTools
{
    public record dotNetTool(string Id, string? Name)
    {
        public static dotNetTool? FromLine(string line)
        {
            if(string.IsNullOrWhiteSpace(line)) return null;
            var columns = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            if(columns.Length < 3) return null;
            return new dotNetTool(columns[0], columns[0]);

        }
        public static dotNetTool? FromLocal(KeyValuePair<string, LocalToolData> data)
        {
            return new dotNetTool(data.Key, data.Key);
        }
        public string Url { 
            get 
            {
                return "https://nuget.org/packages/" + Id;
            } 
            set { }
             
        }
    }
    public class dotNetTools
    {
        public  async Task<dotNetTool[]> GlobalDotNetTools()
        {
            List<dotNetTool> ret = new() ;
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "dotnet",
                    Arguments = "tool list -g",
                    RedirectStandardOutput = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                }
            };
            process.Start();
            await process.WaitForExitAsync();
            string output = await process.StandardOutput.ReadToEndAsync();

            var lines = output.Split(new[] { "\r\n", "\r", "\n" }, StringSplitOptions.None);
            bool isFirstLine = true;
            foreach (string line in lines)
            {
                if (isFirstLine)
                {
                    isFirstLine = false;
                    continue;
                }
                var data = dotNetTool.FromLine(line);
                if (data != null) ret.Add(data);

            }
            return ret.ToArray();
        }

        public async Task<dotNetTool[]> LocalDotNetTools()
        {
            Dictionary<string,dotNetTool> ret = new();
            var f = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            f = Path.Combine(f, "Microsoft", "VisualStudio");
            var files = Directory.GetFiles(f, "ApplicationPrivateSettings.xml", SearchOption.AllDirectories);
            if (files.Length == 0)
                return ret.Values.ToArray();
            var fi = files.Select(it => new FileInfo(it)).ToArray();
            var last = fi[0];
            foreach (var item in fi)
            {
                if (last.LastWriteTimeUtc < item.LastWriteTimeUtc)
                    last = item;
            }
            var doc = XDocument.Load(last.FullName);
            var recentNode = doc.XPathSelectElement("/content/indexed/collection[@name='CodeContainers.Offline']/value");
            if (recentNode == null)
                return ret.Values.ToArray();
            var val = recentNode.Value;
            var obj = JsonDocument.Parse(val).RootElement;
            var lst = new List<string>();
            foreach (var item in obj.EnumerateArray())
            {
                if (!item.TryGetProperty("Key", out var it))
                    continue;
                var data = it.GetString();
                if (data == null) continue;
                lst.Add(data);

            }
            foreach (var fileToAnalyze in lst)
            {
                var folder = Path.GetDirectoryName(fileToAnalyze);
                if (folder == null) continue;
                var fileTool = Path.Combine(folder, ".config", "dotnet-tools.json");
                if(fileTool== null) continue;
                if(!File.Exists(fileTool)) continue;
                var text = await File.ReadAllTextAsync(fileTool);
                if (text == null) continue;
                
                var myDeserializedClass = JsonSerializer.Deserialize<LocalTool>(text);
                if (myDeserializedClass == null) continue;
                if (myDeserializedClass.tools == null) continue;
                foreach (var item in myDeserializedClass.tools)
                {
                    var tool = dotNetTool.FromLocal(item);
                    if (tool == null) continue;
                    if(ret.ContainsKey(tool.Id)) continue;
                    ret.Add(tool.Id,tool);
                }
            }
            return ret.Values.ToArray();
        }

        public async Task<dotNetTool[]> AllDotNetTools()
        {
            var tools = new[] {LocalDotNetTools(),GlobalDotNetTools()};
            var data=await Task.WhenAll( tools.ToArray());
            Dictionary<string, dotNetTool> ret =new ();
            foreach(var item in data)
            {
                foreach(var netTool in item)
                {
                    if (ret.ContainsKey(netTool.Id)) continue;
                    ret.Add(netTool.Id, netTool);
                }
            }
            return ret.Values.ToArray().OrderBy(it=>it.Name).ToArray();
        }
    }
}
