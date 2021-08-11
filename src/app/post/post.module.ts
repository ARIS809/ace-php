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
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
 
//components
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { PostViewComponent } from './post-view/post-view.component';

//routing
import { PostRoutes } from './post-routing.module';


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
    MatCardModule,
    RouterModule.forChild(PostRoutes),
    MatDialogModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  declarations: [
    PostAddEditComponent,
    PostViewComponent
  ],
  exports:[
    PostAddEditComponent,
    PostViewComponent
  ]
})

export class PostModule {}
