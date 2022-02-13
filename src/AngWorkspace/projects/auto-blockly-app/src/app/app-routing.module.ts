import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocklyStudioComponent } from './blockly-studio/blockly-studio.component';
import { DisplayBlocklyComponent } from 'projects/node2-blockly/src/lib/display-blockly/display-blockly.component';

const routes: Routes = [
  { path: '', redirectTo: 'automation/main', pathMatch: 'full' },
  { path: 'automation/main', component:DisplayBlocklyComponent },
  { path: 'automation/studio', component:BlocklyStudioComponent },
  { path: 'automation/loadexample/:demoblock', component:DisplayBlocklyComponent },
  { path: '**',component: DisplayBlocklyComponent }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
