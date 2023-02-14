# Install into  ASP.NET 7

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

Next : **TBD** Customize swaggers  
