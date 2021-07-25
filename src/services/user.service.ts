import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//classes
import { User } from 'app/classes/user-classes/user-classes.barrel'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  configUrl = 'server/user.php';
  constructor(
    private http: HttpClient
  ) { }

  addUser(fname:string, lname:string, password:string, dob:string, email:string): Observable<{success:boolean}> {
    return this.http.post(this.configUrl, { functionname: 'addUser', fname:fname,lname:lname,password:password,dob:dob,email:email }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUsers(): Observable<User> {
    return this.http.post(this.configUrl, { functionname: 'getUsers' }).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
  deleteUser(rowid:number): Observable<{success:boolean}> {
    return this.http.post(this.configUrl, { functionname: 'deleteUser',rowid:rowid }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}