import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {Data} from "../../data";
import "rxjs/add/observable/combineLatest";

@Component({
  selector: 'app-youtuber',
  templateUrl: './youtuber.component.html',
  styleUrls: ['./youtuber.component.scss']
})
export class YoutuberComponent implements OnInit {
  @ViewChild('refresh') refreshButton;
  public data: Observable<Data[]>;
  public youtuber: string;

  constructor(private  api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.data = Observable.combineLatest(this.route.paramMap.map(x => x.get('name')), Observable.fromEvent(this.refreshButton.nativeElement, 'click').startWith(null))
      .do(([x, _]) => this.youtuber = x)
      .flatMap(([x, _]) => this.api.getYoutuber(x));
  }
}
