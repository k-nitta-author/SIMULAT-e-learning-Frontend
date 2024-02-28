import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';


import { HomePageComponent } from './home-page/home-page.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AppComponent } from './app.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { ClassDashboardPageComponent } from './class-dashboard-page/class-dashboard-page.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
    ClassDashboardPageComponent,
    HomePageComponent,
    AppComponent,
    SupportPageComponent,
    AccountPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
