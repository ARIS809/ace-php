import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import {tap, take, map} from 'rxjs/operators';
// tslint:disable-next-line:import-blacklist



//services
import { AuthGuardService } from 'services/auth-guard.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthGuardService,
        private router:Router 
    ){

    }
    canActivate(route:ActivatedRouteSnapshot,
                state:RouterStateSnapshot):Observable<boolean> {
        return this.authService.isLogged.pipe(
            take(1),
            map(isLoggedIn => {
                if (isLoggedIn) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }

}