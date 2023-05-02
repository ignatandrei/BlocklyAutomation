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

        //var nameFile = install.ToString().Replace("_", "-");
        //EmbeddedFileProvider embeddedProvider = new (Assembly.GetExecutingAssembly());
        //var mf=assembly.GetManifestResourceNames();
        //var name = "SqlServerDB.sql." + nameFile + ".sql";
        //var b = mf[0] == name;
        string data = MyAdditionalFiles.Install_Core_Blitz_No_Query_Store_gen_sql;
        //Assembly assembly = this.GetType().Assembly;
        //using Stream? stream = assembly.GetManifestResourceStream(name);
        //ArgumentNullException.ThrowIfNull(stream);
        //using StreamReader reader = new(stream);
        //data = reader.ReadToEnd();
        


        //var f = embeddedProvider.GetFileInfo(name);
        
        //using var reader = f.CreateReadStream();
        //var chunks = Math.Max(2048, f.Length / 3);
        //byte[] buffer = new byte[chunks]; // read in chunks of 2KB
        //using var stream = new MemoryStream();
        //int bytesRead;
        //while ((bytesRead = reader.Read(buffer, 0, buffer.Length)) > 0)
        //{
        //    stream.Write(buffer, 0, bytesRead);
        //}
        //byte[] result = stream.ToArray();
        //var data = System.Text.Encoding.UTF8.GetString(result);
        var lines =data.Split(Environment.NewLine);
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
