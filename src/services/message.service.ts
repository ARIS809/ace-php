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
export class MessageService {
  configUrl = 'server/message.php';
  profileUploadUrl = location.origin+'/ace_file_upload/upload.php';
  constructor(
    private http: HttpClient
  ) { }


  getMessages(to_userid:number): Observable<User> {
    let from_userid = JSON.parse(sessionStorage.getItem('currentUser')).rowid;
    return this.http.post(this.configUrl, { functionname: 'getMessages' ,from_userid:from_userid,to_userid:to_userid}).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  deleteMessage(rowid:number): Observable<{success:boolean}> {
    return this.http.post(this.configUrl, { functionname: 'deleteMessage',rowid:rowid }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  sendMessage(to_userid:number, from_userid:number, message:string): Observable<{success:boolean}> {
    return this.http.post(this.configUrl, { functionname: 'sendMessage',to_userid:to_userid,from_userid:from_userid,message:message }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  

}