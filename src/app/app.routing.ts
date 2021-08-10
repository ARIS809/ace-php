import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthGuard } from './shared/security/auth.guard';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate:[AuthGuard]
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
      canActivate:[AuthGuard]
    },
   ]
  },
  {
    path: 'users',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    children: [
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate:[AuthGuard]
      },
    ]
  },
  {
    path: 'logout',
    pathMatch: 'full',
    children: [
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule),
        canActivate:[AuthGuard]
      },
    ]
  },
  {
    path: 'login',
    component:LoginComponent
  },{
    path:'create-account',
    component:CreateAccountComponent
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
export class AppRoutingModule {
 }
