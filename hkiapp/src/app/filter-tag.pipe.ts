import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTag'
})
export class FilterTagPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
