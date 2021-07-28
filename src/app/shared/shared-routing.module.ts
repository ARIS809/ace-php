import { Injectable, NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CanActivate } from "@angular/router";
import { Observable } from 'rxjs';



const routes: Routes =[ 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
@Injectable()
export class SharedRoutingModule implements CanActivate {

  constructor(
              private router:Router ){

  }
  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot):Observable<boolean>{
                return undefined
              }
 }
