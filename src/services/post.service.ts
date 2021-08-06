import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

//classes
import { User } from 'app/classes/user-classes/user-classes.barrel'
import { Post } from 'app/classes/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  configUrl = 'server/post.php';
  postUploadUrl = location.origin+'/ace_file_upload/upload.php';
  constructor(
    private http: HttpClient
  ) { }


  addPost(form:FormData): Observable<{success:boolean}> {
    this.postPicUpload(form).subscribe( (rep) =>{
    })
    return this.http.post(this.configUrl, form).pipe(
      //
      map((res: any) => {
        return res;
      })
    );
  }

  postPicUpload(form:FormData): Observable<{success:boolean}> {
    return this.http.post(this.postUploadUrl, form).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  getPosts(): Observable<Post> {
    let user_id = JSON.parse(sessionStorage.getItem("currentUser")).rowid;
    return this.http.post(this.configUrl, { functionname: 'getPosts',user_id:user_id}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  likePost(post_id): Observable<Post> {
    let user_id = JSON.parse(sessionStorage.getItem('currentUser')).rowid;
    return this.http.post(this.configUrl, { functionname: 'likePost',user_id:user_id, post_id:post_id}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  unlikePost(post_id): Observable<Post> {
    let user_id = JSON.parse(sessionStorage.getItem('currentUser')).rowid;
    return this.http.post(this.configUrl, { functionname: 'unlikePost',user_id:user_id, post_id:post_id}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}