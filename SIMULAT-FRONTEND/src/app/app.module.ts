import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './general/home-page/home-page.component';
import { SupportPageComponent } from './general/support-page/support-page.component';
import { AppComponent } from './app.component';
import { AccountPageComponent } from './general/account-page/account-page.component';
import { CoursesPageComponent } from './student-view/courses-page/courses-page.component';
import { ClassDashboardPageComponent } from './student-view/class-dashboard-page/class-dashboard-page.component';

import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HomePageComponent,
    SupportPageComponent,
    AppComponent,
    AccountPageComponent,
    CoursesPageComponent,
    ClassDashboardPageComponent
  ],
  exports:[
    RouterModule
  ]
})
export class AppModule { }

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'routes', useValue: routes }
  ]
});
