import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayBlocklyComponent } from './display-blockly/display-blockly.component';

const routes: Routes = [
  { path: '', redirectTo: 'automation/main', pathMatch: 'full' },
  { path: 'automation/main', component:DisplayBlocklyComponent },
  { path: 'automation/loadexample/:demoblock', component:DisplayBlocklyComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
