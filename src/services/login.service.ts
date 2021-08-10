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
  configUrl = 'server/login.php';
  constructor(
    private http: HttpClient
  ) { }

  checkIfEmailExist(email:string): Observable<HttpResponse<{}>> {
    return this.http.post(this.configUrl, { functionname: 'checkIfEmailExist' ,email:email}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}