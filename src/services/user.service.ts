import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  configUrl = 'server/user.php';
  constructor(
    private http: HttpClient
  ) { }

  addUser(): Observable<HttpResponse<{}>> {
    return this.http.post(this.configUrl, { functionname: 'addUser',  }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}