namespace SqlServerDB;

public interface  ISimpleSql
{
    public Task<long> Connect(string connectionString);
    public Task Disconnect(long id);
    public Task<RowSimple[]> GetData(long id,string sql);

}

public class RowSimple
{
    public KeyValuePair<string, object?>[] values { get; set; }
}
