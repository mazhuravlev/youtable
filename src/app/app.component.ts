import {Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataDto} from './data.dto';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import * as _ from 'lodash';
import {Data} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  @ViewChild('refresh') refreshButton;
  private data: Observable<Data[]>;

  constructor(private  http: HttpClient) {

  }

  title = 'app';

  ngOnInit() {
    this.data = Observable.fromEvent(this.refreshButton.nativeElement, 'click')
      .do(x => console.log(x))
      .startWith(null)
      .flatMap(_ => this.http.get('https://pikprice.pik.ru/api/stat/youToday'))
      .map(x => this.groupUser(x as DataDto[]));
  }

  groupUser(dataDto: DataDto[]): Data[]
  {
    return _.orderBy(Object.values(_.groupBy(dataDto, x => x.userName + x.tabName)).map(x => {
      return {user: x[0].userName, tab: x[0].tabName, date: x[0].dateTime, duration: x.length * 3} as Data;
    }), 'user');
  }

  onClick() {
    // this.setTemplates();
  }
}
