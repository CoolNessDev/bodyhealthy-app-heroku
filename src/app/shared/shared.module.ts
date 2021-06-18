import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CircleSpinnerComponent } from './circle-spinner/circle-spinner.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    AlertComponent,
    PaginationComponent,
    CircleSpinnerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule
  ],
  exports:[
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    ToastrModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    SpinnerComponent,
    AlertComponent,
    PaginationComponent,
    CircleSpinnerComponent,
    NgbModule
  ]
})
export class SharedModule { }
