using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace WindowsRelated
{
    public class ServiceMgmtLocal
    {
        public IdName[]? GetLocalServices()
        {
            if (!OperatingSystem.IsWindows())
                return null;

            var scServices = ServiceController.GetServices();
            if (scServices == null)
                return null;

            return scServices.Select(it => 
                new IdName(it.ServiceName,it.DisplayName)
            ).ToArray();
        }
        private ServiceController? FindService(string serviceName)
        {
            if (!OperatingSystem.IsWindows())
                return null;
            if (string.IsNullOrWhiteSpace(serviceName))
                return null;

            var scServices = ServiceController.GetServices();
            if (scServices == null)
                return null;
            serviceName = serviceName.Trim();
            var service = scServices.FirstOrDefault(it => 0 == string.Compare(it.ServiceName, serviceName, StringComparison.InvariantCultureIgnoreCase)); ;
            return service;

        }
        public bool StopService(string serviceName)
        {
            if (!OperatingSystem.IsWindows())
                return false;

            var service = FindService(serviceName);
            if (service == null)
                return false;

            if (service.Status == ServiceControllerStatus.Stopped || service.Status == ServiceControllerStatus.StopPending)
                return true;
            try
            {

                service.Stop(true);
            }
            catch (InvalidOperationException ioe)
            {
                throw new Exception("not have rights", ioe);
            }
            return true;
        }
    }
}
