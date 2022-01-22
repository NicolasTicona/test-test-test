import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setImage'
})
export class SetImagePipe implements PipeTransform {

  transform(value: string): string {

    switch (value.toLowerCase()) {
      case 'clear':
        return 'assets/icons/sun.png';
      case 'clouds':
        return 'assets/icons/clouds.png';
      case 'rain':
        return 'assets/icons/rain.png';
      case 'snow':
        return 'assets/icons/snow.png';
      default:
        return '';
    }

  }

}
