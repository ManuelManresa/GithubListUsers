import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-mini';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, format: string, ...args: unknown[]): unknown {
    return moment(value).format(format);
  }
}
