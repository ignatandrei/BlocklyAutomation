
namespace LocalTools;

public class Clean
{
    public long DeleteNodeModulesFromDesktop()
    {
        var docs = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
        return DeleteNodeModulesFromFolder(docs);
    }
    public long DeleteNodeModulesFromMyDocuments()
    {
        var docs = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        return DeleteNodeModulesFromFolder(docs);
    }
    public long DeleteNodeModulesFromFolder(string folder)
    {
        return DeleteFoldersWithName(folder, "node_modules");
    }
    public long DeleteCSharpBinObjFromDesktop()
    {
        var docs = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
        return DeleteCSharpBinObjFromFolder(docs);
    }
    public long DeleteCSharpBinObjFromMyDocuments()
    {
        var docs = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        return DeleteCSharpBinObjFromFolder(docs);
    }
    public long DeleteCSharpBinObjFromFolder(string folder)
    {
        var ret =DeleteFoldersWithName(folder, "bin");
        ret += DeleteFoldersWithName(folder, "obj");
        return ret;
    }

    public long DeleteFoldersWithName(string folder, string name)
    {
        long nr = 0;
        try
        {
            var dirs = Directory.GetDirectories(folder);
            if (dirs.Length == 0) return nr;
            foreach (var item in dirs)
            {
                var dir = new DirectoryInfo(item);
                if (name == dir.Name)
                    nr += DeleteRecursively(item);
                else
                    nr += DeleteFoldersWithName(item,name);
            }
        }
        catch(Exception)
        {
            //todo: log
        }
        return nr;
    }

    private int DeleteRecursively(string item)
    {
        
        var dir = new DirectoryInfo(item);
        
        dir.Delete(true);
        return 1;
    }
}
