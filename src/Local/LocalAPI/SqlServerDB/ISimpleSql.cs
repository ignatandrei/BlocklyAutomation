using System.Data;
using System.Dynamic;

namespace SqlServerDB;

public interface  ISimpleSql
{
    public Task<long> Connect(string connectionString);
    public Task Disconnect(long id);
    //public Task<RowSimple[]> ExecuteReader(long id,string sql);


    public Task<DataTable> ExecuteReader(long id, string sql);
    Task<object?> ExecuteScalar(long id, string sql);
    Task<int> ExecuteNonQuery(long id, string sql);

    Task<DataTable> TableData(long id, string tableName);
    Task<long> TableNrRows(long id, string tableName);

}

//public record ColValue(string column,object? Value);
//public class RowSimple
//{
//    //public ColValue[]? values { get; set; }

//    public Dictionary<string, object?>? values { get; set; }

//    //public ExpandoObject? Data { get; set; }
//}
