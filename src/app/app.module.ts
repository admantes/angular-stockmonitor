import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//Custom Pipes
import { AdvisePipe } from './helpers/pipes/action.color';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdvisePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
