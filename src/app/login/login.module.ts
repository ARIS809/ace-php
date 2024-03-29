import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatCardModule} from '@angular/material/card';
 
//components
import { LoginComponent } from './login.component';
import { CreateAccountComponent } from '../create-account/create-account.component'

//routing
import { LoginRoutes  } from './login-routing.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    ImageCropperModule,
    MatCardModule
  ],
  declarations: [
    LoginComponent,
    CreateAccountComponent
  ],
  exports:[
    LoginComponent,
    CreateAccountComponent
  ]
})

export class LoginModule {}
