import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

//service
import { PostService } from 'services/post.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  rowid: number;
}

@Component({
  selector: 'post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.css']
})
export class PostAddEditComponent implements OnInit {
  postForm = this.fb.group({
    caption: ['',[ Validators.required ]],
    image: ['',[ Validators.required ]],
});
imageSrc:any = null;
  constructor(
    private _service:PostService,
    private fb:FormBuilder,
    private toast:ToastrService,
    public dialogRef: MatDialogRef<PostAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  ngOnInit(): void {
  }

  savePost():void{
    const uploadData = new FormData();

    for (const property in this.postForm.value) {
     uploadData.append(property, this.postForm.value[property]);
    }
    uploadData.append('functionname', 'addPost');
    uploadData.append('user_id', JSON.parse(sessionStorage.getItem("currentUser")).rowid);
    uploadData.append('post_pic', this.postForm.get('image').value);
    uploadData.append('rowid', this.data.rowid.toString());
  
     this._service.addPost(uploadData).subscribe( (rep) =>{
       if(rep.success){
        this.toast.success("Post added","Publish Post");
        this.dialogRef.close();
       }
       else
         this.toast.error("a database error occured. Please, contact support.", "Publish Post")
     })
  }

  uploadDocument(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.postForm.get('image').setValue(event.target.files[0]);
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
        reader.readAsDataURL(file);
    }
}

}
