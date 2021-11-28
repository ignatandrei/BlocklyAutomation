import { Injectable } from '@angular/core'; 
import {Tabulator } from 'tabulator-tables';


@Injectable({
  providedIn: 'root'
})
export class TabulatorHelper
{
    a:Tabulator.Options| null = null;
    b:Tabulator.CellComponent|null=null;
    dataObject:Array<object> = [];
    objectsForGrid: Array<object> = [];
    stringsForGrid: Array<string> = [];
    hotInstance: Tabulator | null = null;
    get hot(): Tabulator | never {

        if(this.hotInstance != null)
            return this.hotInstance;

        throw new Error("hot is null");
    };
    initGrid(gridElement: any) {
    //console.log(gridElement); 
    
    this.hotInstance = new Tabulator(gridElement, {
        columns: [{ title: 'Step',field:'id' }],
        layout: "fitColumns",   
        // dataTree: false,
        // dataTreeStartExpanded: false,
        // movableRows: false,
        // movableColumns: true,
        // selectable: false,
        // selectableRangeMode: "click",
        // clipboard: "copy",
        footerElement: `<div>
        <!-- <a href="javascript:copyClip()">Copy Clipboard</a>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <a href="javascript:copyCSV()">CSV</a>
        -->
    </div>`,
        placeholder: "please press execute button", 
        // tooltips: function (cell:CellComponent) {
        //     //cell - cell component

        //     //function should return a string for the tooltip of false to hide the tooltip
        //     return cell.getColumn().getField() + " - " + cell.getValue(); //return cells "field - value";
        // },

    } as Tabulator.Options);

    this.hot.replaceData([]);
    // this.hot.clearFilter(true);
    // this.hot.clearHeaderFilter();
    this.hot.redraw(true);
}
    AddStringToGrid(value:string) {
    //window.alert(value);
    if (value.startsWith("{") && value.endsWith("}")) {
        try {
            var obj = JSON.parse(value);
            this.objectsForGrid.push(obj);
            return;
        }
        catch(err)  {
            //do nothing
        }
    };
    if (value.startsWith("[") && value.endsWith("]")) {
        try {
            var arr = JSON.parse(value);
            for (var i = 0; i < arr.length; i++) {
                this.objectsForGrid.push(arr[i]);
            };
            return;
        }
        catch(err) {
            //do nothing
        }

    };
    this.stringsForGrid.push(value);
    //window.alert('length:'+stringsForGrid.length);
}
    AddDataToGrid(value:any) {
        this.dataObject.push([value]);
    //gridElement.innerHTML = '';
    //hot.addData([dataObject]);
    //hot.redraw(true);
    //window.alert(JSON.stringify(value) + typeof value);
    if (typeof value === 'string') {
        this.AddStringToGrid(value);
        return;
    }
    if (typeof value === 'object') {
        this.AddStringToGrid(JSON.stringify(value));
        return;
    }
    this.AddStringToGrid(value.toString());
}
    ClearDataGrid() {
        this.dataObject = [];
        this.objectsForGrid = [];
        this.stringsForGrid = [];
    if (this.hot != null) {
        
        var cStep:Tabulator.ColumnDefinition ={title: 'Step',field:'id'};
        var cValue: Tabulator.ColumnDefinition ={title: 'Value',field:'val'};
        this.hot.setColumns([cStep,cValue]);
        this.hot.replaceData([]);
        //this.hot.clearFilter(true);
        // this.hot.clearHeaderFilter();
        this.hot.redraw(true);           

        
        
    }

}
hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
      
    if(obj == null)
        return false;

    return obj.hasOwnProperty(prop)
}
AddObjectToFinishGrid() {
    var headers = [];
    var obj = this.objectsForGrid;
    //console.log("object !", obj);

    for (var i = 0; i < obj.length; i++) {
        var data = obj[i];
        if (typeof data === 'string') {
            headers.push("_");
        }
        else {
            headers.push(...Object.keys(data));
        }
    }
    //console.log("headers 1", headers);
    var mySet = new Set(headers);
    headers = Array.from(mySet);

    var allHeaders = [...headers];
    var fullData = [];
    for (var i = 0; i < obj.length; i++) {
        var data = obj[i];
        //console.log(data);
        var res : any = { Nr: i + 1 };
        //res["_children"] = [];
        for (var p = 0; p < headers.length; p++) {
            var key = headers[p];
            var defKey = this.goodNameForKey(key);
            //console.log(`${key} ${data && data.hasOwnProperty(key)} `)
            if (data && this.hasOwnProperty(data,key)) {
                var val = data[key];
                if (typeof val === "object") {
                    res[defKey] = JSON.stringify(val);

                    //res["_children"].push(val);
                    //allHeaders.push(...Object.keys(val));
                }
                else
                    res[defKey] = val;
            }
            else {
                if (typeof data === 'string' && p === 0) {
                    res[defKey] = data;
                }
                else {
                    res[defKey] = '';   
                }
            }
        }
        fullData.push(res);
    }
    headers.splice(0, 0, "Nr");
    allHeaders.splice(0, 0, "Nr");
    var hs = this.Headers(allHeaders); 
    this.hot.setColumns(hs);
    this.hot.replaceData(fullData);
}
Headers(allHeaders:string[]): Tabulator.ColumnDefinition[] {
    
    return allHeaders.map(it => {
        return {

            // cellClick: function (e:any, cell:any) {
            //     var row = cell.getRow().getData().Nr;
            //     var col = cell.getColumn().getField();
            //     alert(`The row at : ${row} , col: ${row} has value :\n ` + cell.getValue()); //display the cells value
            // },
            title: it,
            field: this.goodNameForKey(it),
            // headerFilter: true,
            // formatter: function (cell:any, formatterParams:any, onRendered:any) {
            //     //cell - the cell component
            //     //formatterParams - parameters set for the column
            //     //onRendered - function to call when the formatter has been rendered
            //     try {
            //         var value = cell.getValue().toString();
            //         //return value;
            //         if (value.length < 2)
            //             return value;
            //         if (value.startsWith("[") && value.endsWith("]")) {
            //             try {
            //                 var arr = JSON.parse(value);
            //                 var row = cell.getRow().getData().Nr;
            //                 var col = cell.getColumn().getField();
            //                 var id = col + "_" + row;
            //                 onRendered(function () {
            //                     //window.alert('test');
            //                     var table = new Tabulator("#" + id, {
            //                         data: arr,
            //                         autoColumns: true,
            //                         layout: "fitDataFill",
            //                         headerSort: false,
            //                         // tooltips: function (cell:CellComponent) {
            //                         //     return cell.getColumn().getField() + " - " + JSON.stringify(cell.getValue()); //return cells "field - value";
            //                         // }
            //                     });
            //                 });
            //                 return "<div id='" + id + "'>" + value + "</div>";

            //             }
            //             catch (err) {
            //                 return value;
            //             }

            //         };
            //     }
            //     catch (e) {
            //         return value;
            //     }
            //     return cell.getValue();
            // }
        }
    });
}
 AddStringToFinishGrid() {

    var fullData = [];
    for (var i = 0; i < this.stringsForGrid.length; i++) {
        fullData.push({ Nr: i + 1, Text: this.stringsForGrid[i] });
    }
    //window.alert(fullData.length);
    var allHeaders = ["Nr", "Text"];
    var hs =this.Headers(allHeaders); 
    this.hot.setColumns(hs);
    this.hot.replaceData(fullData);

}
FinishGrid() {

    if (this.objectsForGrid.length + this.stringsForGrid.length == 0)
        return;

    if (this.objectsForGrid.length > 0) {
        this.AddObjectToFinishGrid();
    }
    else {
        this.AddStringToFinishGrid();

    }

    // this.hot.clearFilter(true);
    this.hot.redraw(true);           
}

goodNameForKey(key:string) {
    var ret = key;
    ret = ret.replace(".", "_");
    return ret;
}
copyClip() {
    this.hot.copyToClipboard("all");
}
copyCSV() {
    this.hot.download("csv", "data.csv", { bom: true });
}
}
