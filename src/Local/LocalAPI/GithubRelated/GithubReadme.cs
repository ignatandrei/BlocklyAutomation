namespace GithubRelated;

public class GithubReadme
{

    public async Task<string> GeneratedBadge(string owner, string repo)
    {
        var str = "";
        str += $"[![GitHub last commit](https://img.shields.io/github/last-commit/{owner}/{repo}?label=updated)](https://github.com/{owner}/{repo})";
        str += $"[![Stars](https://img.shields.io/github/stars/{owner}/{repo})](https://github.com/{owner}/{repo}/stargazers)";
        str += $"[![Sparkline](https://stars.medv.io/{owner}/{repo}.svg)](https://stars.medv.io/{owner}/{repo})";
        str += $"[![Nuget](https://img.shields.io/nuget/v/{repo})](https://www.nuget.org/packages/{repo})";
        str += $"[![NuGet Badge](https://buildstats.info/nuget/{repo})](https://www.nuget.org/packages/{repo}/)";
        var workflow = await FindLastExecutedWorkflow(owner, repo);
        if (!string.IsNullOrWhiteSpace(workflow))
        {
            str += $"[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/{owner}/{repo}/{workflow}?label={workflow})](https://github.com/{owner}/{repo}/actions/workflows/{workflow}.yml)";
        }
        return str;
    }


    private async Task<string> FindLastExecutedWorkflow(string owner, string repo)
    {
        var client = new HttpClient();
        string url = $"https://api.github.com/repos/{owner}/{repo}/actions/workflows";

        client.DefaultRequestHeaders.Add("User-Agent", "request");
        client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");

        try
        {
            //var response = await client.GetStringAsync(url);
            //var json = JsonSerializer.Deserialize<JsonElement>(response);
            var responseStream = await client.GetStreamAsync(url);
            var workflowsJson = await JsonSerializer.DeserializeAsync<JsonElement>(responseStream);
            var workflows = workflowsJson.GetProperty("workflows").EnumerateArray();

            DateTime latestUpdateTime = DateTime.MinValue;
            JsonElement latestWorkflow = new JsonElement();

            foreach (var workflow in workflows)
            {
                try
                {
                    var updatedAt = DateTime.Parse(workflow.GetProperty("updated_at").GetString() ?? string.Empty);
                    var name = latestWorkflow.GetProperty("name").GetString() ?? string.Empty;
                    if (name.Contains("dependabot"))
                        continue;
                    
                    if (updatedAt > latestUpdateTime)
                    {
                        latestUpdateTime = updatedAt;
                        latestWorkflow = workflow;
                    }
                }
                catch (Exception e)
                {
                    //do nothing
                }
            }

            if (latestUpdateTime > DateTime.MinValue)
            {
                return latestWorkflow.GetProperty("name").GetString()?? string.Empty;
            }
            return string.Empty;
        }
        catch (HttpRequestException e)
        {
            return string.Empty;
        }
    }
}
