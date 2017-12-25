import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Data} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  @ViewChild('refresh') refreshButton;
  public data: Observable<Data[]>;

  constructor(private  api: ApiService) {
  }

  ngOnInit() {
    this.data = Observable.fromEvent(this.refreshButton.nativeElement, 'click')
      .do(x => console.log(x))
      .startWith(null)
      .flatMap(_ => this.api.getToday());
  }
}
