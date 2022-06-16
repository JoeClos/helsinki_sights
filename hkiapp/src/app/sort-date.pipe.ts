import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(value: any, key?: any): any {
    return value.sort(
      (a: any, b: any) =>
        new Date(a[key]).getTime() - new Date(b[key]).getTime()
    );
  }
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

}
