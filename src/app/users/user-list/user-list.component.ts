import { Component, OnInit } from '@angular/core';

import { UserService } from 'services/user.service';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private service:UserService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers():void{
    this.service.getUsers().subscribe( (rep) =>{
      console.log(rep);
    })
  }

}
