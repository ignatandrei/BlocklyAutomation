using GithubRelated;

namespace LocalAPI.Controllers;

[ApiController]
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]/[action]")]
[AutoActions(template = TemplateIndicator.AllPostWithRecord, FieldsName = new[] { "*" }, ExcludeFields = new[] { "_logger" })]

public partial class GitHubReadmeController: ControllerBase
{
    private readonly GithubReadme githubReadme;
    public GitHubReadmeController(GithubReadme githubReadme)
    {
        this.githubReadme = githubReadme; 
    }
}

