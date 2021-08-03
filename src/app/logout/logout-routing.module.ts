import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';


//components
import { LogoutComponent } from './logout.component';



export const LogoutRoutes: Routes =[
  {
    path: 'logout',
    component:  LogoutComponent,
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];



