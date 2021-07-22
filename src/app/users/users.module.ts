import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserListComponent } from './user-list/user-list.component';

//routing
import { UsersRoutingModule } from './users-routing.module'


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserAddEditComponent,
    UserListComponent
  ]
})

export class UsersModule {}
