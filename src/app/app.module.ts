import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostsService } from './posts.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { DashboardComponent} from './adminDashboard/dashboard.component';
import { MaterialModule } from '@angular/material';
import { UserComponent } from './adminDashboard/user/user.component';
import {ModalModule} from "ng2-modal";
import { SplashComponent } from './adminDashboard/splash/splash.component'
import { ScheduleComponent } from './adminDashboard/schedule/schedule.component';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { TimepickerModule } from 'ng2-bootstrap/timepicker';
import { AlertModule } from 'ng2-bootstrap';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  { path: 'login',
    component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent,

    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      { path: 'admin', component: SplashComponent },
      { path: 'users', component: UserComponent },
      { path: 'schedule', component: ScheduleComponent },
    ]
  },
  { path: '**',    component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    SplashComponent,
    ScheduleComponent,
    DateTimePickerComponent,




  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot(),
    ModalModule,
    NgbModalModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule.forRoot(),
    TimepickerModule.forRoot(),
    AlertModule.forRoot(),
    ToastModule
  ],
  exports: [

    DateTimePickerComponent
  ],
  providers: [PostsService, AuthenticationService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
