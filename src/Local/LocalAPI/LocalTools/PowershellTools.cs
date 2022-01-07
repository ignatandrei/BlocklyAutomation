namespace LocalTools
{

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
        public string?[]? PowershellModules()
        {
            var location = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            var strFolder = Path.Combine(location, "WindowsPowerShell");
            
            if (!Directory.Exists(strFolder))
                return null;
            strFolder = Path.Combine(strFolder, "Modules");
            //Console.WriteLine(strFolder);
            if (!Directory.Exists(strFolder))
                return null;
            Console.WriteLine(strFolder);
            return Directory
                .GetDirectories(strFolder)
                .Select(it=>new DirectoryInfo(it))
                .Select(it=> it.Name)
                .ToArray()
                ;



        }
    }
}