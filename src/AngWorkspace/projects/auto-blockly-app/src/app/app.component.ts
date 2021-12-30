import { Component } from '@angular/core';
import { saveLoadService } from 'projects/blockly-helpers/src/public-api';
import { BlocklyXHR } from 'projects/blockly-scripts/src/public-api';
import { BlocklyReturnSwagger } from 'projects/blockly-swagger/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoBlocklyApp';
  bs: BlocklyReturnSwagger=new BlocklyReturnSwagger("http://localhost:8080/swagger-ui.html");
  constructor(_saveLoadService: saveLoadService) {
    //this.bs.getBlocks();
    console.log(_saveLoadService.A());
    var x:BlocklyXHR=new BlocklyXHR();
    console.log(x.fieldXML());
  }
}
