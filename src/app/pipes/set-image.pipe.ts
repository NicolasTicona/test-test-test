import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setImage'
})
export class SetImagePipe implements PipeTransform {

  imagesPath = 'assets/icons';

  transform(value: string): string {

    switch (value?.toLowerCase()) {
      case 'clear':
        return `${this.imagesPath}/sun.png`;
      case 'clouds':
        return `${this.imagesPath}/clouds.png`;
      case 'rain':
        return `${this.imagesPath}/rain.png`;
      case 'snow':
        return `${this.imagesPath}/snow.png`;
      case 'mist': 
        return `${this.imagesPath}/clouds.png`;
      default:
        return '';
    }

  }

}
