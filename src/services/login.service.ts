import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface Config {
    heroesUrl: string;
    textfile: string;
    date: any;
  }

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  private gameUrl = 'http://lpg.io/api/angulargames';
  configUrl = '/server/ace/login.php';
  constructor(
    private http: HttpClient
  ) { }

  getConfig1() {
    return this.http.get<Config>(this.configUrl);
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.post(this.configUrl, { functionname: 'getName' }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
 

    getGames(): Observable<[]> {
        return this.http.get<[]>(this.configUrl,{}).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {

            errorMessage = `An error occurred: ${err.error.message}`;
        } else {

            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}