# BlocklyAutomation
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Blockly Automation :  is a tool for LowCode / automation of sites (Swagger / OpenAPI / RPA ) and PC made of Blockly. 

# How to use if you are

## a backend developer with an REST / OpenAPI / Swagger enabled site and I want to show the use of my site


Use the appropiate package: 

### [NetCore](https://github.com/ignatandrei/BlocklyAutomation/wiki/netcore) 

.NET Core: [![Nuget](https://img.shields.io/nuget/dt/NetCore2Blockly)](https://www.nuget.org/packages/NetCore2Blockly/)

More details at https://github.com/ignatandrei/BlocklyAutomation/wiki/netcore


### [Node](https://github.com/ignatandrei/BlocklyAutomation/wiki/node)

Node: [![npm](https://img.shields.io/npm/v/node2-blockly)](https://www.npmjs.com/package/node-blockly?)

More details at https://github.com/ignatandrei/BlocklyAutomation/wiki/node

### [PHP](https://github.com/ignatandrei/BlocklyAutomation/wiki/php)

Made by Carol Pelu
Packagist : [![php](https://img.shields.io/packagist/v/carolpelu/blockly-automation)](https://packagist.org/packages/carolpelu/blockly-automation)



### [Java](https://github.com/ignatandrei/BlocklyAutomation/wiki/java) 
Not yet ready as a package, you care read to add manually at https://github.com/ignatandrei/BlocklyAutomation/wiki/java
or

Download the HTML release [BlocklyAutomation](https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseBlocklyAutomation.zip/) .

Follow the instructions in the wiki file.  


## a frontend  developer that finds a bug in a REST / OpenAPI / Swagger enabled site

You want to show to the backend developer how to reproduce the problem .

If you control the site , then you can use the [BlocklyAutomation](https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseBlocklyAutomation.zip/) to reproduce the problem.

Follow the instructions in the wiki file.  

If you do not control the site, then install the application from http://ba.serviciipeweb.ro/ and then use it to reproduce the problem. ( wiki site coming with details) 

## a web site application tester
If you control the site , then can use the https://github.com/ignatandrei/BlocklyAutomation/releases/latest/download/releaseBlocklyAutomation.zip/  and then use it to reproduce the problem. ( wiki site coming with details) .

If you does not control the site, then install the application from http://ba.serviciipeweb.ro/ and then use it to make test cases. ( wiki site coming with details) 


## [Docker Extension](https://github.com/ignatandrei/BlocklyAutomation/wiki/DockerExtension)

Please see [Docker Extension](https://github.com/ignatandrei/BlocklyAutomation/wiki/DockerExtension)
See 
## not a programmer.  I want to automate/gather data from several sites ( public or private )

You want to obtain some data from the web. For example, extract the exchange between EUR / RON .

Install the application from http://ba.serviciipeweb.ro/ .

Follow the instructions in the wiki file.


## not a programmer andI want to automate things on my PC. 

You want to obtain some data from your PC. For example, extract and export to CSV the Chrome Bookmarks.

Install the application from http://ba.serviciipeweb.ro/ .

Follow the instructions in the wiki file.



## Suggest a public API for BlocklyAutomation

If you have a public API/site that you want to automate, please send file an issue at https://github.com/ignatandrei/BlocklyAutomation/issues 


## How to see a preview


To see the whole potential , please go to http://ba.serviciipeweb.ro/ and click Launch .

If you want to see some web Demo , please go to https://ignatandrei.github.io/BlocklyAutomation/ and test various HTTP request, Swaggers and more

## How to install on your PC

See [releases tab](https://github.com/ignatandrei/BlocklyAutomation/releases)

You can find the 

1. Angular site , ready to be deployed to any server
2. IIS site   , ready to be deployed on IIS
3. A .NET Core site, ready to be deployed on Linux or Windows, standalone ( as a service )

# You have a site with OpenAPI / Swagger. What should I do  ?

Download from [releases tab](https://github.com/ignatandrei/BlocklyAutomation/releases) the Angular site. Put index.html and all other files into a BLocklyAutomation folder inside your wwwroot  folder ( or in your project root ) and you are good to go.

1. It could be an idea to map everything that start with /BlocklyAutomation to /BlocklyAutomation/index.html - see src\Loaders\SimpleSite to have an C# example 
   
2. Modify assets/settings.json to change the name and the starting blocks
   
3. Modify assets/loadAtStartup/swaggers.json to add your swaggers

4. Modify assets/showUsage/demoBlocks/all.txt to add your demo for the blocks . 
   ( You can construct and then download and save as files)

5. Send me an email to help you  if something  is not working.
## How to customize

To customize the title , introduction and start blocks , see assets/settings.json

To load swaggers at startup, see  assets/loadAtStartup/swaggers.json

To customize demo blocks,download your blocks, put the txt file in  assets/showUsage/demoBlocks/ and modify assets/showUsage/demoBlocks/all.txt

##  How to contribute

If you are a beginner to blockly, see 

https://github.com/ignatandrei/BlocklyAutomation/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22

![GitHub issues by-label](https://img.shields.io/github/issues/ignatandrei/BlocklyAutomation/good%20first%20issue)

You will be mentioned below ;-)


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://aenyx-designs.com/"><img src="https://avatars.githubusercontent.com/u/33196341?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bogdan Bobe</b></sub></a><br /><a href="#design-arealshadow" title="Design">🎨</a> <a href="https://github.com/ignatandrei/BlocklyAutomation/commits?author=arealshadow" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/adrian-badulescu"><img src="https://avatars.githubusercontent.com/u/49490946?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adrian Badulescu</b></sub></a><br /><a href="#example-adrian-badulescu" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!