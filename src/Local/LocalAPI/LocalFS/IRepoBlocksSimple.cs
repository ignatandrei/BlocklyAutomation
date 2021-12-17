namespace LocalFS;

public interface IRepoBlocksSimple
{
    Task<BlocksSave[]?> GetBlocks();
}
//[AutoGenerateInterface]
public class RepoBlocksSimple : IRepoBlocksSimple
{
    private readonly IFileSystem fs;

    public RepoBlocksSimple(IFileSystem fs)
    {
        this.fs = fs;
    }
    public async Task<BlocksSave[]> GetBlocks()
    {
        var ret = Array.Empty<BlocksSave>();
        if (!fs.File.Exists("all.txt"))
            return ret;

        var file = await fs.File.ReadAllTextAsync("all.txt");
        if (string.IsNullOrWhiteSpace(file))        
            return ret;
        
        var b= JsonSerializer.Deserialize<BlocksSave[]>(file);
        if(b == null)
            return ret;
        
        return b;
    }
    public async Task<int> SaveNewBlock(BlocksSave b, string content)
    {
        await fs.File.WriteAllTextAsync($"{b.id}.txt",content);
        var blocks=await GetBlocks();

        var newBlocks = blocks.ToList();
        newBlocks.RemoveAll((it => it.id == b.id));

        newBlocks.Add(b);
        return newBlocks.Count;

    }
    public async Task<string> GetBlocksContent(string id)
    {
        var data = await File.ReadAllTextAsync($"{id}.txt");
        return data;
    }
}
