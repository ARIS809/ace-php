import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';


//components
import { MessageComponent } from './message.component';



export const PostRoutes: Routes =[
  {
    path: 'view',
    component:  MessageComponent,
  }, 
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full',
  }
];



