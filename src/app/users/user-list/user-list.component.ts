import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {Location} from '@angular/common';

//service
import { UserService } from 'services/user.service';

//classes
import { User } from 'app/classes/user-classes/user-classes.barrel';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User;
  constructor(
    private service:UserService,
    private router:Router,
    private location:Location,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers():void{
    this.service.getUsers().subscribe( (rep) =>{
      this.users = rep;
    })
  }

  goToAddUser():void{
    this.router.navigate(['/users/add']);
  }

}
