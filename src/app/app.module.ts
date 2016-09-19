import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { SignupMainComponent } from './signup-main/signup-main.component';
import { routing } from './app.routing';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBJBMTX6PcR1bZTm-Ns-Qg5zPFuZv06fPE",
  authDomain: "noah-acb8d.firebaseapp.com",
  databaseURL: "https://noah-acb8d.firebaseio.com",
  storageBucket: "noah-acb8d.appspot.com"
};

@NgModule({
  declarations: [
    AppComponent,
    SignupMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
