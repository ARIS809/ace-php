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
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
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
    PostAddEditComponent,
  ],
  exports:[
    PostAddEditComponent
  ]
})

export class LoginModule {}
