import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'DateFormat'
})

@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    moment.locale('fr');
    return moment(new Date(date)).fromNow();
  }
}
