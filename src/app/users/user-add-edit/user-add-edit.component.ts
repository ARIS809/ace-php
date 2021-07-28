import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { User } from 'app/classes/user-classes/user-class';

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

  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('',[Validators.required]),
    password: new FormControl('',[]),
    email: new FormControl('',[Validators.required,Validators.email]),
    dob: new FormControl('',[Validators.required]),
    user_name: new FormControl('',[Validators.required]),
    profile_pic: new FormControl('',[]),
    bio: new FormControl('',[])
  });

  constructor(
    private route:ActivatedRoute,
    private _service: UserService,
    private toast: ToastrService,
    private router:Router
  ) { 
    if(this.route.snapshot.params.rowid != null || this.route.snapshot.params.rowid != undefined)
        this.rowid = parseInt(this.route.snapshot.params.rowid);
      else
        this.rowid = 0;
  }

  ngOnInit(): void {
    if(this.rowid != 0)
      this.getUser();

  }

  saveUser():void{
    this._service.addUser(
      this.userForm.controls['fname'].value,
      this.userForm.controls['lname'].value,
      this.userForm.controls['password'].value,
      this.userForm.controls['dob'].value,
      this.userForm.controls['email'].value,
      this.userForm.controls['user_name'].value,
      this.userForm.controls['bio'].value,
      this.rowid,
    ).subscribe( (rep) =>{
      if(rep.success)
      {
        this.toast.success("User Saved","Adding a User");
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
    })
  }

}
