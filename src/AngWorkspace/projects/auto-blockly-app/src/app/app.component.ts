import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppDetails } from 'projects/node2-blockly/src/lib/AppDetails';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AutoBlocklyApp';
  constructor(private titleService : Title, appDetails: AppDetails) {
    console.log(appDetails.settings?.title);
    this.titleService.setTitle((appDetails.settings?.title||''));
  }
}
