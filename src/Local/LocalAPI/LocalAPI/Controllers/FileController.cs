using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;

namespace LocalAPI.Controllers;
public record recPathContent(string path,string content);
public record recByteSave(byte[] content, string filePath) : IValidatableObject
{
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if((content?.Length??0) == 0)
        {
            //yield new ValidationResult("content null", new[] { "content" });
            yield break;
        }
        if (string.IsNullOrWhiteSpace(filePath))
        {
            yield break;
        }



    }
}
[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
//[AutoActions(template = TemplateIndicator.AllPostWithRecord, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]
public partial class FileController : ControllerBase
{
    private readonly IFile fs;

    public FileController(IFile fs)
    {
        this.fs = fs;

    }
    [HttpPost]
    public void WriteAllTextOK(string path, string content)
    {
        fs.WriteAllText(path, content);
    }
    [HttpPost]
    public async Task SaveByte(recByteSave byteSave)
    {
        await fs.WriteAllBytesAsync(byteSave.filePath, byteSave.content);

    }
}
