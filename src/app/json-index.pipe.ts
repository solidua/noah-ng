import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonIndex'
})
export class JsonIndexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null) return value; 
    return value[args]; 
  }
}

