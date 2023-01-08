namespace LocalTools
{
    public record PowershellModule(string Id, string Name)
    {
        public static PowershellModule FromDir(string folder)
        {
            var id = new DirectoryInfo(folder).Name;
            return new PowershellModule(id, id);
        }
        public string Url
        {
            get
            {
                return "https://www.powershellgallery.com/packages/" + Id;
            }
            set
            {
            }
        }
    }
    public class PowershellTools
    {

        public async Task<string?> PowershellProfile()
        {
            var location = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            var strFolder = Path.Combine(location, "WindowsPowerShell");
            if (!Directory.Exists(strFolder))
                return null;
            var file = Path.Combine(strFolder, "Microsoft.PowerShell_profile.ps1");
            if (!File.Exists(file))
                return null;

            return await File.ReadAllTextAsync(file);

        }
        public PowershellModule[]? PowershellModules()
        {
            var location = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            var strFolder = Path.Combine(location, "WindowsPowerShell");
            
            if (!Directory.Exists(strFolder))
                return null;
            strFolder = Path.Combine(strFolder, "Modules");
            //Console.WriteLine(strFolder);
            if (!Directory.Exists(strFolder))
                return null;
            //Console.WriteLine(strFolder);
            return Directory
                .GetDirectories(strFolder)
                //.Select(it=>new DirectoryInfo(it))
                .Select(it=> PowershellModule.FromDir( it))
                .Where(it=> it!=null)
                .OrderBy(it => it.Name)
                .ToArray()
                ;



        }
    }
}