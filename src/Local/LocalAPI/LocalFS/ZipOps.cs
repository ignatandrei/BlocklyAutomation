using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocalFS;

public class ZipOps
{
    public void UnzipFolder(string filePath)
    {
        ArgumentNullException.ThrowIfNullOrEmpty(filePath);
        string? folder=Path.GetDirectoryName(filePath);
        ArgumentNullException.ThrowIfNull(folder);
        ZipFile.ExtractToDirectory(filePath, folder,true);
        return ;
    }
}
