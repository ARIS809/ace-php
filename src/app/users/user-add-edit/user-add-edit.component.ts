import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { User } from 'app/classes/user-classes/user-class';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { ToastrService } from 'ngx-toastr';


//services
import { UserService } from 'services/user.service'
@Component({
  selector: 'user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  rowid:number = 0;
  user:User;
  profileUrl = location.origin+'/ace_file_upload/uploads/profile_pics/';
  isMyprofile = false;

    userForm = this.fb.group({
        fname: ['', [Validators.required]],
        role: ['',[ ]],
        lname: ['',[Validators.required]],
        password: ['',[]],
        email: ['',[Validators.required,Validators.email]],
        dob: ['',[Validators.required]],
        user_name: ['',[Validators.required]],
        profile_pic: ['',[]],
        bio: ['',[]],
  });

  constructor(
    private route:ActivatedRoute,
    private _service: UserService,
    private toast: ToastrService,
    private router:Router,
    private fb: FormBuilder
  ) { 
    if(this.route.snapshot.params.rowid != null || this.route.snapshot.params.rowid != undefined)
        this.rowid = parseInt(this.route.snapshot.params.rowid);
    else if(this.router.url === "/users/profile"){
      this.rowid = JSON.parse(sessionStorage.getItem("currentUser")).rowid;
      this.isMyprofile = true;
    }
    else
      this.rowid = 0;    
  }

  ngOnInit(): void {
    if(this.rowid != 0)
      this.getUser();

  }

  saveUser():void{
    const uploadData = new FormData();

   for (const property in this.userForm.value) {
    uploadData.append(property, this.userForm.value[property]);
  }
  uploadData.append('functionname', 'addUser');
  uploadData.append('rowid', this.rowid.toString());
  uploadData.append('profile_pic', this.userForm.get('profile_pic').value);

    this._service.addUser(uploadData).subscribe( (rep) =>{
      if(rep.success)
      {
        this.toast.success("User Saved","Adding a User");
        if(this.isMyprofile)
          this.router.navigate(['/dashboard']);
        else
          this.router.navigate(['/users/list']);

      }else{
        this.toast.error("a database error occured. Please, contact support.")
      }
    })
  }

  getUser():void{
    this._service.getUser(this.rowid).subscribe( (rep) =>{
      this.user = new User(rep[0]);
      this.userForm.patchValue(this.user);
      this.userForm.get('profile_pic').setValue('');
    })
  }

  uploadDocument(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.userForm.get('profile_pic').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  userButtonLanguage():string{
    let language = "";
    if(this.rowid != 0){
      language = "Edit User";
      if(this.isMyprofile)
        language = "Edit profile"
    }else{
      language = "Add User";
    }
    return language;
  }

}
