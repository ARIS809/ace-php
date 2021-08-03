import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from 'app/shared/security/auth.guard';
import { AuthGuardService } from 'services/auth-guard.service';

import { ToastrModule } from 'ngx-toastr';
import { LoginModule }  from './login/login.module';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqLUKbhhaedF0LgQmnIlaRUrmEJpabybY'
    }),
    BrowserModule,
    ToastrModule.forRoot(),
    ImageCropperModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [ {provide: APP_BASE_HREF, useValue: '/',},AuthGuard,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
