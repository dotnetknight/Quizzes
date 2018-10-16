import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SidenavComponent } from './navigation/side-nav/side-nav.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './navigation/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MyprofileComponent } from './auth/myprofile/myprofile.component';
import {
  SidenavService,
  AuthService,
  SnackbarService,
  QuizService,
  QuestionService
} from './services';
import { SearchComponent } from './search/search.component';
import { QuizzComponent } from './quizz/quizz.component';
import { QuestionComponent } from './question/question.component';
import { AddquizzComponent } from './quizz/addquizz/addquizz.component';
import { EditquizzComponent } from './quizz/editquizz/editquizz.component';
import { AddquestionComponent } from './question/addquestion/addquestion.component';
import { PlayQuizzComponent } from './quizz/play-quizz/play-quizz.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    WelcomeComponent,
    SpinnerComponent,
    MyprofileComponent,
    SearchComponent,
    QuizzComponent,
    QuestionComponent,
    AddquizzComponent,
    EditquizzComponent,
    AddquestionComponent,
    PlayQuizzComponent,
    DialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [SidenavService, AuthService, SnackbarService, QuizService, QuestionService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
