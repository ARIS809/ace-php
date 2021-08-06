import { Component, OnInit } from '@angular/core';
import { LoginService } from 'services/login.service';
import {MatDialog} from '@angular/material/dialog';

//component
import { PostAddEditComponent } from '../components/post/post-add-edit/post-add-edit.component';

//services
import { PostService } from 'services/post.service';
import { Post } from 'app/classes/post';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  posts:Post;
  postUrl = location.origin+'/ace_file_upload/uploads/post_pics/';
  userUrl = location.origin+'/ace_file_upload/uploads/profile_pics/';
  constructor(
    private loginservice:LoginService,
    private dialog:MatDialog,
    private _post_service:PostService,
    private toast:ToastrService
  ) { }
  ngOnInit() {
    this.getPosts();
  }

  openPostDialog():void{
    const dialogRef = this.dialog.open(PostAddEditComponent,{
      width: '1000px',
      data: {rowid:0}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    }); 
  }

  getPosts():void{
    this._post_service.getPosts().subscribe( (rep:any) =>{
      if(rep.success){
        this.posts = rep.data;
      }else{
        this.toast.error("an error occured while processing your request.","Feed Error")
      }
    }) 
  }

  likePost(post_id:number, post:any):void{
    post.i_liked = 1;
    post.likes = parseInt(post.likes) + 1;
    this._post_service.likePost(post_id).subscribe( (rep:any) =>{ 
      if(!rep.success)
        this.toast.error("an error has occured while trying to process your request","Like Post"); 
    }) 
  }
  unlikePost(post_id:number,post:any):void{
    post.i_liked = 0;
    post.likes = parseInt(post.likes) - 1;
    this._post_service.unlikePost(post_id).subscribe( (rep:any) =>{
      if(!rep.success)
        this.toast.error("an error has occured while trying to process your request","Unlike Post");
    }) 
  }

}
