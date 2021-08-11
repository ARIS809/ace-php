import { Component, OnInit } from '@angular/core';
import { Post } from 'app/classes/post';

import { PostAddEditComponent } from '../post-add-edit/post-add-edit.component';


//services
import { PostService } from 'services/post.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  posts:Post;
  postUrl = location.origin+'/ace_file_upload/uploads/post_pics/';
  userUrl = location.origin+'/ace_file_upload/uploads/profile_pics/';
  constructor( private _post_service:PostService,
               private toast:ToastrService,
               private dialog:MatDialog,){ }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts():void{
    this._post_service.getMyPosts().subscribe( (rep:any) =>{
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


  opendPostEdit(rowid:number, image:string, caption:string):void{
    const dialogRef = this.dialog.open(PostAddEditComponent,{
      width: '1000px',
      data: {rowid:rowid, image:image, caption:caption}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    }); 
  } 

}
