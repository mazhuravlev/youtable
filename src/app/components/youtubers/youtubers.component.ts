import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-youtubers',
  templateUrl: './youtubers.component.html',
  styleUrls: ['./youtubers.component.scss']
})
export class YoutubersComponent implements OnInit {
  public data: Observable<{ name: string; count: number }[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.data = this.api.getYoutubers();
  }

}
