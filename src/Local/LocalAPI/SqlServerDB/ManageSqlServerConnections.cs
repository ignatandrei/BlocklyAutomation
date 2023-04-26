
using Microsoft.Data.SqlClient;

namespace SqlServerDB;

public class ManageSqlServerConnections
{
    protected static Dictionary<long, SqlConnection> connection = new();
    public virtual async Task<long> Connect(string connectionString)
    {
        var cn = new SqlConnection();
        cn.ConnectionString = connectionString;
        await cn.OpenAsync();
        lock (connection)
        {
            var nr = connection.Count;
            connection.Add(nr, cn);
            return nr;
        }

    }
    public virtual async Task Disconnect(long id)
    {
        if (connection.ContainsKey(id))
        {
            await connection[id].CloseAsync();
            connection.Remove(id);
        }
    }
    protected SqlCommand CreateCommand(long id)
    {
        if (!connection.ContainsKey(id))
            throw new ArgumentException($"connection is not found {id}", nameof(id));

        var cn = connection[id];
        if (cn.State != System.Data.ConnectionState.Open)
        {
            throw new ArgumentException($"please reopen {id} because {cn.State}", nameof(id));

        }

        return cn.CreateCommand();

    }
}
