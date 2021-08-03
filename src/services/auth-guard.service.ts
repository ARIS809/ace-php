import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//classes
import { User } from 'app/classes/user-classes/user-classes.barrel'
import { EmailValidator } from '@angular/forms';
import { AuthInfo } from 'app/classes/auth-info';
import { replaceAll } from 'chartist';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  configUrl = 'server/login.php';
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(
    private http: HttpClient,
    private toast:ToastrService,
    private router:Router
  ) { 
    this.isLogged = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  login(email:string, password:string): Observable<{}> {
    return this.http.post(this.configUrl, { functionname: 'login', email:email, password:password }).pipe(
      map((res: any) => {
        if(res.success)
          sessionStorage.setItem('currentUser',JSON.stringify(res.data[0]));
          
        return res.success;
      })
    );
  }
  
  isLoggedIn():boolean{
    let isLoggedin = false;
    if(sessionStorage.getItem("currentUser") != null){
        isLoggedin = true;
        this.router.navigate(['/dashboard']);
    }
    else if(sessionStorage.getItem("currentUser")==null){
    
      isLoggedin = false;

    }
    return isLoggedin;
  }

  logout():void{
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}