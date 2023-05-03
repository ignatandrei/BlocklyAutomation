using Microsoft.Data.SqlClient;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.Unicode;
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
    //public string[]? SeeResources()
    //{
    //    Assembly assembly = this.GetType().Assembly;
    //    var mf = assembly.GetManifestResourceNames();
    //    return mf;
    //}
    public string SeeData(BrentOzarInstallBlitz install)
    {
        //does not matter for the moment
        return MyAdditionalFiles.Install_Core_Blitz_No_Query_Store_gen_sql;
    }

    public async Task<int> InstallSpBlitz(long connectionId, BrentOzarInstallBlitz install)
    {

        string data = MyAdditionalFiles.Install_Core_Blitz_No_Query_Store_gen_sql;
        var lines = data.Split('\r', '\n')
            .Where(it => it.Length>0)
            .ToArray();
        Console.WriteLine($"nr lines {lines.Length}");

        var str = "";
        for (int i = 0; i < lines.Length; i++)
        {
            var line = lines[i];
            var toExec = line.StartsWith("GO");
            toExec = toExec && (line.Trim().Length < 3);
            if (toExec)
            {
                if (str.Replace("\r\n","").Trim().Length == 0) continue;
                //execute sql
                Console.WriteLine("execute:" + str);
                using var cmd = CreateCommand(connectionId);
                cmd.CommandText = str;
                try
                {
                    await cmd.ExecuteNonQueryAsync();
                }catch(SqlException ex)
                {
                    throw new Exception("error at " + str, ex);
                }
                //start from 0
                str = "";
                continue;
            }
            //not environment
            str +="\r\n"+ line;
            
        }
        //execute the rest
        if(str?.Length > 0)
        {
            Console.WriteLine("final execute:" + str);
            using var cmd = CreateCommand(connectionId);
            cmd.CommandText = str;
            try
            {
                await cmd.ExecuteNonQueryAsync();
            }
            catch (SqlException ex)
            {
                throw new Exception("error at " + str, ex);
            }
        }
        return data?.Length??-1;
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
    
    
}
