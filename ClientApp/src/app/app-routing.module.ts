import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from "./services/guards/auht-guard.service";
import { MyprofileComponent } from "./auth/myprofile/myprofile.component";
import { SearchComponent } from "./search/search.component";
import { AddquizzComponent } from "./quizz/addquizz/addquizz.component";
import { EditquizzComponent } from "./quizz/editquizz/editquizz.component";
import { AddquestionComponent } from "./question/addquestion/addquestion.component";
import { QuizzComponent } from "./quizz/quizz.component";
import { PlayQuizzComponent } from "./quizz/play-quizz/play-quizz.component";


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'myquizzes', component: QuizzComponent, canActivate: [AuthGuard] },
  { path: 'addquiz', component: AddquizzComponent, canActivate: [AuthGuard] },
  { path: 'editquiz/:id', component: EditquizzComponent, canActivate: [AuthGuard] },
  { path: 'addquestions', component: AddquestionComponent, canActivate: [AuthGuard] },
  { path: 'play/:quizId', component: PlayQuizzComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
