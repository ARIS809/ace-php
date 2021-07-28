import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';


//components
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserListComponent } from './user-list/user-list.component';



export const UserRoutes: Routes =[
  {
    path: 'list',
    component:  UserListComponent,
  }, 
  {
    path: 'add',
    component:  UserAddEditComponent,
  },
  {
    path: 'edit/:rowid',
    component:  UserAddEditComponent,
  }, 
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }
];



