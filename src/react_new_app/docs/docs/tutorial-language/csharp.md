import TOCInline from '@theme/TOCInline';


# Install into  ASP.NET 7

<TOCInline
  // Only show h2 and h4 headings
  toc={toc.filter((node) => node.level === 2 || node.level === 4)}
  minHeadingLevel={2}
  // Show h4 headings in addition to the default h2 and h3 headings
  maxHeadingLevel={4}
/>

:::note

It is better to have swagger added in order to see the API 
Check [this `link`](https://learn.microsoft.com/en-us/aspnet/core/tutorials/web-api-help-pages-using-swagger?view=aspnetcore-7.0).

:::
## **Step 1 : Install package NetCore2Blockly**

```code
Install-Package NetCore2Blockly
```

## **Step 2: Add to Program.cs**

Put this after app.MapControllers();

```code csharp
app.UseBlocklyUI(app.Environment);
app.UseBlocklyAutomation();
```

## **Step 3: Run app**

Browse to /BlocklyAutomation or /BlocklyAutomation/index.html

:::tip

Modify file Properties/launchSettings.json in order to show first /BlocklyAutomation

```code
"launchUrl": "BlocklyAutomation",
```
:::

You will see this

![VisualAPI](/img/generated/root.png)

and on _TBD_ image Swaggers section you will see your API's as blocks .

:::tip

If your API do not show in swaggers sections see customize loading swaggers 
:::


## **Next : _TBD_ Customize swaggers** 
