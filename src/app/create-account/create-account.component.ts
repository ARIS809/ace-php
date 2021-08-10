import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


import { UserService } from 'services/user.service';
import { LoginService } from 'services/login.service';
@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  emailExist:boolean = false;
  userForm = this.fb.group({
    fname: ['', [Validators.required]],
    role: ['User',[ ]],
    lname: ['',[Validators.required]],
    password: ['',[]],
    email: ['',[Validators.required,Validators.email,]],
    dob: ['',[Validators.required]],
    user_name: ['',[Validators.required]],
    bio: ['',[]],
});

  constructor( private _service: UserService,
    private route:ActivatedRoute,
    private toast: ToastrService,
    private router:Router,
    private fb: FormBuilder,
    private _log_service:LoginService) { }

  ngOnInit(): void {
  }


  saveUser():void{
    const uploadData = new FormData();

   for (const property in this.userForm.value) {
    uploadData.append(property, this.userForm.value[property]);
  }
  uploadData.append('functionname', 'addUser');
  uploadData.append('rowid', '0');

    this._service.addUser(uploadData).subscribe( (rep) =>{
      if(rep.success)
      {
        this.toast.success("Account Created!","Account Creation");
        this.router.navigate(['/login']);

      }else{
        this.toast.error("a database error occured. Please, contact support.")
      }
    })
  }

  checkIfEmailExist(email:string):void{
    this._log_service.checkIfEmailExist(email).subscribe( (rep:any) =>{
      if(rep.emailExist <= 0){
        this.emailExist = false;
        this.userForm.controls['email'].setErrors(null);
      }
      else {
        this.emailExist = true;
        this.userForm.controls['email'].setErrors({'incorrect': true});
      }
    } )
  }

}
