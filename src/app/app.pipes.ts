import { Pipe } from '@angular/core'; 

@Pipe({
  name: 'arrayInd'
})

export class ArrayInd {
  transform(val, args) {
    if (val === null) return val; 
    return val[args]; 
  }
}