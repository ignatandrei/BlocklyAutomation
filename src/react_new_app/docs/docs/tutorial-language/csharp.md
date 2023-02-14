# Install into  ASP.NET 7

:::note

It is better to have swagger added in order to see the API 
Check [this `link`](https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-7.0).

:::
Step 1 : Install package 

```code
Install-Package NetCore2Blockly
```

Step 2: 

Put this after app.MapControllers();

```code csharp
app.UseBlocklyUI(app.Environment);
app.UseBlocklyAutomation();
```

Step 3:

Browse to /BlocklyAutomation or /BlocklyAutomation/index.html

:::tip

Modify file Properties/launchSettings.json in order to show first /BlocklyAutomation

```code
"launchUrl": "BlocklyAutomation",
```
:::

You will see this

![VisualAPI](/img/generated/root.png)

and on Swaggers you will see your API's as blocks .

:::tip

If your API do not show see customize swaggers next section
:::
Next : **TBD** Customize swaggers  
