import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// import { IndexComponent } from './Mycomponents/index/index.component';
// import { TodosComponent } from './Mycomponents/todos/todos.component';
import { OopsNotesComponent } from './Mycomponents/oops-notes/oops-notes.component';
import { AddTodoComponent } from './Mycomponents/add-todo/add-todo.component';
import { LikedQuestionsComponent } from './Mycomponents/liked-questions/liked-questions.component';
import { AskedInComponent } from './Mycomponents/asked-in/asked-in.component';
import { LoginComponent } from './Mycomponents/login/login.component';
import { RegistrationComponent } from './Mycomponents/registration/registration.component';
import { AuthGuard } from './auth.guard';
import { ScorecardComponent } from './Mycomponents/scorecard/scorecard.component';
import { SettingsComponent } from './Mycomponents/settings/settings.component';
import { NotFoundComponentComponent } from './Mycomponents/not-found-component/not-found-component.component';
import { CompanyAnalysisComponent } from './Mycomponents/company-analysis/company-analysis.component';
import { BadgesComponent } from './Mycomponents/badges/badges.component';
import { CodeeditorComponent } from './Mycomponents/codeeditor/codeeditor.component';
import { ImportantlistComponent } from './Mycomponents/importantlist/importantlist.component';
import { ArticleFormComponent } from './Mycomponents/article-form/article-form.component';
import { ResumeBuilderComponent } from './Mycomponents/resume-builder/resume-builder.component';
import { ResumemadeComponent } from './Mycomponents/resumemade/resumemade.component';
// import { AnimalComponent } from './Mycomponents/animal/animal.component';

const routes: Routes = [  
  { path: '', component: RegistrationComponent },  
  { path: 'about', component: AppComponent },
  { path: 'score', component: ScorecardComponent }, 
  // { path: 'animal', component: AnimalComponent }, 
  {path:'main',component:AddTodoComponent,canActivate: [AuthGuard]} ,
  {path: 'oopsnotes', component: OopsNotesComponent,canActivate: [AuthGuard]},
  {path: 'LikedQuestions', component: LikedQuestionsComponent,canActivate: [AuthGuard]},
  {path: 'askedin', component: AskedInComponent,canActivate: [AuthGuard]},
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'companyanalysis',component:CompanyAnalysisComponent,canActivate:[AuthGuard]},
  {path:'badgespage',component:BadgesComponent,canActivate:[AuthGuard]},
  {path:'playlist',component:ImportantlistComponent,canActivate:[AuthGuard]},
  {path:'forgot-password',component:CodeeditorComponent},
  {path:'article',component:ArticleFormComponent},
  {path:'resume',component:ResumeBuilderComponent},
  {path:'resumemade',component:ResumemadeComponent},
  { path: '**', component: NotFoundComponentComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
