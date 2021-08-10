import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

//service 
import { AuthGuardService } from 'services/auth-guard.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password:['',  [Validators.required]] 
  })
  constructor(
    private fb:FormBuilder,
    private _service:AuthGuardService,
    private router:Router,
    private toast:ToastrService
  ) { }

  ngOnInit(): void {

  }

  login():void{
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;

    this._service.login(email,password).subscribe( (rep) =>{
      if(rep){
        this.toast.success("You have successfully logged in.","login");
        this.router.navigate(['/dashboard']);
        window.location.reload();
      }else{
        this.toast.error("No user was found with those credentials. Please try again.","login")
      }
    })
  }
  createAccount():void{
    this.router.navigate(['create-account']);
  }
}
