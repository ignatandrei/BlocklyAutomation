using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
