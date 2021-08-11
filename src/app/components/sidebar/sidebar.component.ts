import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles:any;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Feed',  icon: 'feed', class: '' , roles:['User','Admin','Super']},
    { path: '/users/profile', title: 'My Profile',  icon:'person', class: '',  roles:['User','Admin','Super'] },
    { path: '/post/view', title: 'My Post',  icon:'dynamic_feed', class: '',  roles:['User','Admin','Super'] },

    //User Routes
    { path: '/users/list', title: 'User List',  icon:'manage_accounts', class: '',  roles:['Admin','Super'] },
    { path: '/logout/logout', title: 'Logout',  icon:'logout', class: '',  roles:['User','Admin','Super'] },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currRole:string = "User";
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.currRole = JSON.parse(sessionStorage.getItem('currentUser')).role;
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
