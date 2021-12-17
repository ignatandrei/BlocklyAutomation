namespace LocalFS;

//[AutoGenerateInterface]
public class RepoBlocksSimple 
{
    private readonly IFileSystem fs;
    private const string folder = "localBlocks";
    public RepoBlocksSimple(IFileSystem fs)
    {
        this.fs = fs;
        if (!fs.Directory.Exists(folder))
        {
            fs.Directory.CreateDirectory(folder);
        }
    }
    public async Task<BlocksSave[]> GetBlocks()
    {
        var fileLocation = fs.Path.Combine(folder, "all.txt");
        var ret = Array.Empty<BlocksSave>();
        if (!fs.File.Exists(fileLocation))
            return ret;

        var fileContent = await fs.File.ReadAllTextAsync(fileLocation);
        if (string.IsNullOrWhiteSpace(fileContent))        
            return ret;
        
        var b= JsonSerializer.Deserialize<BlocksSave[]>(fileContent);
        if(b == null)
            return ret;
        
        return b;
    }
    public async Task<int> SaveNewBlock(BlocksSave b, string content)
    {
        var fileLocation = fs.Path.Combine(folder, $"{b.id}.txt");
        await fs.File.WriteAllTextAsync(fileLocation,content);
        var blocks=await GetBlocks();

        var newBlocks = blocks.ToList();
        newBlocks.RemoveAll((it => it.id == b.id));        
        
        newBlocks.Add(b);
        fileLocation = fs.Path.Combine(folder, "all.txt");
        var data=JsonSerializer.Serialize(newBlocks);
        await fs.File.WriteAllTextAsync(fileLocation, data);
        return newBlocks.Count;

    }
    public async Task<string> GetBlocksContent(string id)
    {
        var fileLocation = fs.Path.Combine(folder, $"{id}.txt");
        var data = await File.ReadAllTextAsync(fileLocation);
        return data;
    }
}
