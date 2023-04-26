using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SqlServerDB;
public  class BrentOzar : ManageSqlServerConnections
{

    public override Task<long> Connect(string connectionString)
    {
        return base.Connect(connectionString);
    }
    public override Task Disconnect(long id)
    {
        return base.Disconnect(id);
    }
    public async Task<int> InstallSpBlitz(long connectionId, BrentOzarInstallBlitz install)
    {
        var ret = 0;
        var nameFile = install.ToString().Replace("_", "-");
        var lines=File.ReadAllLines(nameFile);
        var str = "";
        for (int i = 0; i < lines.Length; i++)
        {
            var line = lines[i];
            if (line.StartsWith("GO"))
            {
                if (str.Replace("\r\n","").Trim().Length == 0) continue;
                //execute sql
                using var cmd = CreateCommand(connectionId);
                cmd.CommandText = str;
                ret += await cmd.ExecuteNonQueryAsync();
                //start from 0
                str = "";
                continue;
            }
            //not environment
            str +="\r\n"+ line;
            
        }
        return ret;
    }

    public async Task<DataTable> ExecuteSP(long connectionId, BrentOzarSP sp)
    {
        using var cmd = CreateCommand(connectionId);
        cmd.CommandText = "EXEC dbo."+sp;
        using var rd = await cmd.ExecuteReaderAsync();
        DataTable dt = new();
        dt.Load(rd);
        return dt;
    }
    public async Task<DataTable> ExecuteSpBlitzCache(long connectionId)
    {
        using var cmd = CreateCommand(connectionId);
        cmd.CommandText = "EXEC dbo.sp_BlitzCache";
        using var rd = await cmd.ExecuteReaderAsync();
        DataTable dt = new();
        dt.Load(rd);
        return dt;
    }
    public async Task<DataTable> ExecuteSpBlitzIndex(long connectionId)
    {
        using var cmd = CreateCommand(connectionId);
        cmd.CommandText = "EXEC dbo.sp_BlitzIndex";
        using var rd = await cmd.ExecuteReaderAsync();
        DataTable dt = new();
        dt.Load(rd);
        return dt;
    }
}
