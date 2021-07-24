import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/classes/user-classes/user-class';

//services



@Component({
  selector: 'user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  rowid:string = "0";
  constructor(
    private route:ActivatedRoute
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

}
