import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { TodosComponent } from './Mycomponents/todos/todos.component';
// import { VideoGameComponent } from './Mycomponents/video-game/video-game.component';
import { AddTodoComponent } from './Mycomponents/add-todo/add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AngularComponent } from './Mycomponents/angular/angular.component';
// import { JavascriptComponent } from './Mycomponents/javascript/javascript.component';
// import { IndexComponent } from './Mycomponents/index/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { NavbarHeaderComponent } from './Mycomponents/navbar-header/navbar-header.component';
// adding imports for adding dialog box using angular material
import{MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { DialogBodyComponent } from './Mycomponents/dialog-body/dialog-body.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OopsNotesComponent } from './Mycomponents/oops-notes/oops-notes.component';
import { LikedQuestionsComponent } from './Mycomponents/liked-questions/liked-questions.component';
import { AskedInComponent } from './Mycomponents/asked-in/asked-in.component';
import { EnrollService } from './Services/enroll.services';
import { RegistrationComponent } from './Mycomponents/registration/registration.component';
// import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './Mycomponents/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ScorecardComponent } from './Mycomponents/scorecard/scorecard.component';
// import { AnimalComponent } from './Mycomponents/animal/animal.component';
import { CodeeditorComponent } from './Mycomponents/codeeditor/codeeditor.component';
// import { NgChartsModule } from 'ng2-charts';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { SettingsComponent } from './Mycomponents/settings/settings.component';
import { NotFoundComponentComponent } from './Mycomponents/not-found-component/not-found-component.component';
import { CompanyAnalysisComponent } from './Mycomponents/company-analysis/company-analysis.component';
import { FlashMessageComponent } from './Mycomponents/flash-message/flash-message.component';
import { BadgesComponent } from './Mycomponents/badges/badges.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';
import { ImportantlistComponent } from './Mycomponents/importantlist/importantlist.component';

import {MatTableModule} from '@angular/material/table';
import { FeedbackDialogComponent } from './Mycomponents/feedback-dialog/feedback-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ArticleFormComponent } from './Mycomponents/article-form/article-form.component';
// import { ArticleFormComponent } from './article-form/article-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResumeBuilderComponent } from './Mycomponents/resume-builder/resume-builder.component';
import { ResumemadeComponent } from './Mycomponents/resumemade/resumemade.component';



@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    NavbarHeaderComponent,
    DialogBodyComponent,
    OopsNotesComponent,
    LikedQuestionsComponent,
    AskedInComponent,
    RegistrationComponent,
    LoginComponent,
    ScorecardComponent,
    
    CodeeditorComponent,
         SettingsComponent,
         NotFoundComponentComponent,
         CompanyAnalysisComponent,
         FlashMessageComponent,
         BadgesComponent,
         ImportantlistComponent,
         FeedbackDialogComponent,
         ArticleFormComponent,
         ResumeBuilderComponent,
         ResumemadeComponent,
         
    
    // EnrollService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatNativeDateModule,
    MonacoEditorModule,
    MatCardModule,
    HttpClientModule,
    NgxUiLoaderModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    FlexLayoutModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
