import { Injectable } from '@angular/core';
import * as _ from "lodash";
import {DataDto} from "../data.dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Data} from "../data";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public getToday(): Observable<Data[]>{
    return this.http.get('https://pikprice.pik.ru/api/stat/youToday').map(x => this.groupUser(x as DataDto[]));
  }

  public getYoutuber(name: string) {
    return this.http.get('https://pikprice.pik.ru/api/stat/youtubers?user='+name).map(x => this.groupUser(x as DataDto[]));
  }

  public getYoutubers() {
    return this.http.get('https://pikprice.pik.ru/api/stat/youtubers').map(x => this.getNames(x as DataDto[]));
  }

  private groupUser(dataDto: DataDto[]): Data[] {
    return _.orderBy(Object.values(_.groupBy(dataDto.filter(x => x.tabName.indexOf(': воспроизводится аудио') > 0)
      .map(x => ({...x, tabName: x.tabName.replace(': воспроизводится аудио', '')})), x => x.userName + x.tabName)).map(x => {
      return {user: x[0].userName, tab: x[0].tabName, date: x[0].dateTime, duration: x.length * 3} as Data;
    }), 'user');
  }

  private getNames(dataDtos: DataDto[]): {name: string, count: number}[] {
    return _.orderBy(Object.values(_.groupBy(dataDtos.filter(x => x.tabName.indexOf(': воспроизводится аудио') > 0), 'userName'))
      .map(x => ({name: x[0].userName, count: x.length * 3})), 'count', 'desc');
  }
}
