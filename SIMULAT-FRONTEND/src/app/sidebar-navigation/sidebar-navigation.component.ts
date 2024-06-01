import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrl: './sidebar-navigation.component.css'
})
export class SidebarNavigationComponent {

  isSidebarOpen = false;


  toggleSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
