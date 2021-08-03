import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';


//components
import { LoginComponent } from './login.component';



export const LoginRoutes: Routes =[
  {
    path: 'login',
    component:  LoginComponent,
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
];



