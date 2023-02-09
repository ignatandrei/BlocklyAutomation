import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayBlocklyComponent } from 'projects/node2-blockly/src/lib/display-blockly/display-blockly.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PrimaryNavigComponent } from 'projects/node2-blockly/src/lib/primary-navig/primary-navig.component';
import { AppDetails } from 'projects/node2-blockly/src/lib/AppDetails';
import { Observable} from 'rxjs';
import { TransmitAction } from 'projects/node2-blockly/src/lib/TransmitAction';
import { BlocklyStudioComponent } from 'projects/node2-blockly/src/lib/blockly-studio/blockly-studio.component';
import { FindSavedBlocksComponent } from 'projects/node2-blockly/src/lib/find-saved-blocks/find-saved-blocks.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './LowerCaseUrlSerializer';

@NgModule({
  declarations: [
    AppComponent,
    DisplayBlocklyComponent,
    PrimaryNavigComponent,
    BlocklyStudioComponent,
    FindSavedBlocksComponent,
  ],
  imports: [

    BrowserModule,
    CodemirrorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    

  ],
  providers: [  AppDetails,TransmitAction,
  
    { provide: APP_INITIALIZER,useFactory: initializeApp1, deps: [AppDetails], multi: true}
  ,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    }
  ]
    
    ,
  bootstrap: [AppComponent]
})
export class AppModule { }


export function initializeApp1(appDet: AppDetails) {
  return (): Observable<string> => { 
    return appDet.Init();
  }
}

