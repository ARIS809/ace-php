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
  profileUploadUrl = location.origin+'/ace_file_upload/upload.php';
  constructor(
    private http: HttpClient
  ) { }

  // addUser(fname:string, lname:string, password:string, dob:string, email:string, user_name:string, bio:string, rowid:number): Observable<{success:boolean}> {
  //   let sendData = { fname:fname,
  //                    lname:lname,
  //                    password:password,
  //                    dob:dob,
  //                    email:email,
  //                    user_name:user_name,
  //                    rowid:rowid,
  //                    bio:bio };
  //   return this.http.post(this.configUrl, { functionname: 'addUser' , ...sendData}).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  addUser(form:FormData): Observable<{success:boolean}> {
    this.profilePicUpload(form).subscribe( (rep) =>{
    })
    return this.http.post(this.configUrl, form).pipe(
      //
      map((res: any) => {
        return res;
      })
    );
  }
  profilePicUpload(form:FormData): Observable<{success:boolean}> {
    return this.http.post(this.profileUploadUrl, form).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getUsers(): Observable<User> {
    let userid = JSON.parse(sessionStorage.getItem('currentUser')).rowid;
    return this.http.post(this.configUrl, { functionname: 'getUsers' ,userid:userid}).pipe(
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

  getUser(rowid:number):Observable<User>{
    return this.http.post(this.configUrl, { functionname: 'getUser', rowid:rowid }).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }
}