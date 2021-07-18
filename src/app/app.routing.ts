import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';




const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
@Injectable()
export class AppRoutingModule implements CanActivate {

  constructor(
              private router:Router ){

  }
  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot):Observable<boolean>{
                return undefined
              }
 }
