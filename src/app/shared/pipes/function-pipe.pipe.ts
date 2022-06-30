import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionPipe'
})
export class FunctionPipe implements PipeTransform {
  
    transform(value: any, handler: (...params: any) => any, anotherParam?: any): any {
      return handler(value, anotherParam);
    }
  
}