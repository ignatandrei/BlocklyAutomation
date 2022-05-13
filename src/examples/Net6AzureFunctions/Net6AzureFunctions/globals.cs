global using System;
global using System.IO;
global using System.Threading.Tasks;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Azure.WebJobs;
global using Microsoft.Azure.WebJobs.Extensions.Http;
global using Microsoft.AspNetCore.Http;
global using Microsoft.Extensions.Logging;
global using Newtonsoft.Json;
global using System.Net;
global using AzureFunctions.Extensions.Swashbuckle.Attribute;
global using AzureFunctions.Extensions.Swashbuckle;
global using System.Net.Http;
global using Microsoft.Azure.Functions.Extensions.DependencyInjection;
global using System.Reflection;
global using Net6AzureFunctions;

[assembly: FunctionsStartup(typeof(Startup))]
