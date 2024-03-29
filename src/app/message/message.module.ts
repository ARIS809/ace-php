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
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
 
//components
import { MessageComponent } from './message.component';

//routing
import { PostRoutes } from './message-routing.module';


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
    FlexLayoutModule,
    ChatModule
  ],
  declarations: [
    MessageComponent,
    
  ],
  exports:[
    MessageComponent
  ]
})

export class MessageModule {}
