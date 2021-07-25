import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  rowid:string = "0";

  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    dob: new FormControl('',[Validators.required]),
  });

  constructor(
    private route:ActivatedRoute,
    private _service: UserService,
    private toast: ToastrService,
    private router:Router
  ) { 
    this.route.queryParams.subscribe(params => {
      if(params['rowid'] != null)
        this.rowid = params['rowid'];
      else
        this.rowid = "0";
    });
  }

  ngOnInit(): void {

  }

  saveUser():void{
    this._service.addUser(
      this.userForm.controls['fname'].value,
      this.userForm.controls['lname'].value,
      this.userForm.controls['password'].value,
      this.userForm.controls['dob'].value,
      this.userForm.controls['email'].value
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

}
