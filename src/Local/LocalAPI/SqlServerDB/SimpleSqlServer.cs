
using Microsoft.Data.SqlClient;
using System.Data;
using System.Dynamic;
using System.Xml.Linq;
using static Azure.Core.HttpHeader;

namespace SqlServerDB;

public class SimpleSqlServer: ISimpleSql
{
    private Dictionary<long, SqlConnection> connection=new();

    public async  Task<long> Connect(string connectionString)
    {
        var cn = new SqlConnection();
        cn.ConnectionString = connectionString;
        await cn.OpenAsync();
        lock (connection)
        {
            var nr=connection.Count;
            connection.Add(nr, cn);
            return nr;
        }
        
    }

    public async Task Disconnect(long id)
    {
        if (connection.ContainsKey(id))
        {
            await connection[id].CloseAsync();
            connection.Remove(id);
        }
    }

    public async Task<RowSimple[]> ExecuteReader(long id,string sql)
    {
        if (!connection.ContainsKey(id))
            throw new ArgumentException($"connection is not found {id}", nameof(id));

        var cn = connection[id];
        if(cn.State != System.Data.ConnectionState.Open)
        {
            throw new ArgumentException($"please reopen {id} because {cn.State}", nameof(id));

        }

        using var cmd = cn.CreateCommand();
        cmd.CommandText = sql;
        using var rd=await cmd.ExecuteReaderAsync();
        var nrFields = rd.FieldCount;
        List<string> cols = new();
        for (int i = 0; i < nrFields; i++)
        {
            cols.Add(rd.GetName(i));
        }
        List<RowSimple> ret = new();
        while (await rd.ReadAsync())
        {
            //List<ColValue> row = new();
            Dictionary<string, object?>? row = new();
            
                        
            for (int i = 0; i < nrFields; i++)
            {
                var data=rd.GetValue(i);
                if (await rd.IsDBNullAsync(i))
                {
                    data = null;
                }
                //Console.WriteLine("data" + data);
                //row.Add(new ColValue( cols[i], data));
                row.Add(cols[i], data);
            }
            var rs = new RowSimple();
            //rs.values=row.ToArray();
            rs.values = row;
            //rs.Data=new ExpandoObject();
            //rs.Data.TryAdd("id", id);
            ret.Add(rs);
        }
        
        return ret.ToArray();
    }
}
