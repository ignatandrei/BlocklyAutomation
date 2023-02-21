using Microsoft.Win32;
namespace WindowsRelated;
public record IdName(string Id, string? Name);
public class Apps
{
    public IdName[]? FromRegKey()
    {
        if (!OperatingSystem.IsWindows())
            return null;

        List<IdName> list = new();
        string registry_key = @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall";
        using (var key = Registry.LocalMachine.OpenSubKey(registry_key))
        {
            if (key == null)
                return null;
            foreach (string subkey_name in key.GetSubKeyNames())
            {
                if (subkey_name == null)
                    continue;
                using (var subkey = key.OpenSubKey(subkey_name))
                {
                    if (subkey == null) continue;
                    var name = subkey.GetValue("DisplayName")?.ToString();
                    if (string.IsNullOrEmpty(name))
                    {
                        continue;
                    }
                    var app = new IdName(subkey_name, name);
                    list.Add(app);
                }
            }
            return list.ToArray();
        }
    }
}