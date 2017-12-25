import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodayComponent} from "../components/today/today.component";
import {YoutuberComponent} from "../components/youtuber/youtuber.component";
import {YoutubersComponent} from "../components/youtubers/youtubers.component";

const routes: Routes = [
  {
    path: '',
    component: TodayComponent
  },
  {
    path: 'today',
    component: TodayComponent
  },
  {
    path: 'youtuber/:name',
    component: YoutuberComponent
  },
  {
    path: 'youtubers',
    component: YoutubersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
