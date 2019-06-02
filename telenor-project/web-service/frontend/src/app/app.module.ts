import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
  	ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
