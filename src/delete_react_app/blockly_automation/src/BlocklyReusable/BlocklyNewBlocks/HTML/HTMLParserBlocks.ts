import * as Blockly from 'blockly/core';
import { IBlocksSimple } from '../../blocksInterface';


export default class HtmlParserBlocks implements IBlocksSimple{
 
  addWrapper(interpreter: any, globalObject: any) {
    var self=this;
    var wrapper20 = function(html:any,type:any, tagName:any) {                
      html= html ? html.toString() : '';
      return self.parseDOMFromStringElements(html,type,tagName);
    };
    interpreter.setProperty(globalObject, 'parseDOMFromStringElements',
        interpreter.createNativeFunction(wrapper20));
  }
  category: string='HTML';
  definitionBlocksSimple(blocks: any, javaScript: any) {
    blocks['simpleHtmlparser'] = {
      init: function () {
        this.appendValueInput('NAME')
          .setCheck(null)
          .appendField('Find ')
          .appendField(
            new Blockly.FieldDropdown([
              ['Tables', 'table'],
              ['Links', 'a'],
              ['Images', 'img'],
              ['List', 'ul,ol'],
              ['Headers', 'h1,h2,h3,h4,h5,h6'],
            ]),
            'To'
          );
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('');
      },
    };

    javaScript['simpleHtmlparser'] = function (block: any) {
      var dropdown_to = block.getFieldValue('To');
      var value_name = javaScript.valueToCode(
        block,
        'NAME',
        javaScript.ORDER_ATOMIC
      );
      var code = '(function(value){ \n';
      code += `var doc  = parseDOMFromStringElements(value,"text/html","${dropdown_to}");\n`;
      // code +='consoleLog("x",doc)\n';
      code += 'return doc;\n';
      code += '})(' + value_name + ')';
      return [code, javaScript.ORDER_NONE];
    };
  }

  fieldXML(): string {
    return `
    <category name='Parser'>
    <block type='text_print'>" 
               <value name='TEXT'>" 
                 
    <block type="simpleHtmlparser">
        <value name="NAME">
            <shadow type="text">
                <field name="TEXT"></field>
            </shadow>
        </value>
    </block>    
      </value>


      </block>
      </category>
        `;
  }

  table2array(table:any) {
    var rows = table.rows;
    //console.log(myData)
    var ret = [];
    if(!rows)
        return [];
    if(rows.length===0){
        return [];
    }
    //first row is header
    var cols = Array.from(rows[0].children).map(it=>(it as any).innerText);
    for (var i = 1; i < rows.length; i++) {
            var elemes = rows[i].children;
            var my_rowArr = {};
            for (var j = 0; j < elemes.length; j++) {
                (my_rowArr as any)[cols[j]] = elemes[j].innerText;
            }
            ret.push(my_rowArr);

    }
    return ret;
}
  parseDOMFromStringElements (htmlString:any, type:any, tagName:any){
    var i=0;
    var doc = new DOMParser().parseFromString(htmlString, type);
    var elements:Array<any>=[];
    if(tagName.toString().indexOf(",")>-1){
        var arrTags= tagName.split(",");
        for(i=0;i<arrTags.length;i++){
            elements=elements.concat(Array.from(doc.getElementsByTagName(arrTags[i])));
        }
    }
    else{
        elements=elements.concat(doc.getElementsByTagName(tagName));
        elements=elements[0];//asdad
    }
    var ret={};
    // console.log('a',elements);
    // console.log('b',elements[0]);
    
    if(elements.length === 0)
        return ret;
        
    switch(tagName){
        case "table":
            ret={};
            for(i=0;i<elements.length;i++){
                (ret as any)["table"+i]= this.table2array(elements[i]);     
            }             
            break;
        case "a":
            ret=[];
            var loc= window?.location?.host || "";
            if(loc.length>0){
                loc=window.location.protocol+"//"+loc;
            }
            // console.log('x',loc);
            for(i=0;i<elements.length;i++){
                var href=elements[i].href;
                if(loc.length>0 && href.startsWith(loc)){
                    href= href.substring(loc.length);
                }
                (ret as any).push({ "href" : href, 'text': elements[i].innerText});    
            }
            break;
        case "img":
            ret=[];
            for(i=0;i<elements.length;i++){
                (ret as any).push({ "src" : elements[i].src});     
            }
            break;    
        case "ul,ol":
            ret={};
            for(i=0;i<elements.length;i++){
                (ret as any)["list"+i]= this.list2array(elements[i]);     
            }      
            
            break;
        case "h1,h2,h3,h4,h5,h6":
            ret=[];
            for(i=0;i<elements.length;i++){
                (ret as any).push({ "header" : elements[i].innerText});     
            }
            break;
        default:
            throw new Error(`tag !${tagName}! not supported`);
    }
    // console.log('a',ret); 
    return JSON.stringify(ret);
}

list2array(list:any) :any[] {
  var rows =   list.getElementsByTagName('li');;
  //console.log(myData)
  var ret = [];
  if(rows.length===0){
      return [];
  }
  for (var i = 0; i < rows.length; i++) {
          ret.push({"li": rows[i].innerText});
  }
  return ret;
}
}
