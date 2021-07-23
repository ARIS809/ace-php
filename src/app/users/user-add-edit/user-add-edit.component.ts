import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/user-classes/user-class';

//services
import { UserService } from 'services/user.service';


@Component({
  selector: 'user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  constructor(
    private _service:User
  ) { }

  ngOnInit(): void {
  }

}
