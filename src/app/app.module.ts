import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodayComponent } from './components/today/today.component';
import {RoutingModule} from "./modules/routing.module";
import {ApiService} from "./services/api.service";
import { YoutuberComponent } from './components/youtuber/youtuber.component';
import { YoutubersComponent } from './components/youtubers/youtubers.component';


@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    YoutuberComponent,
    YoutubersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
