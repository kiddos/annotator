import { Injectable } from '@angular/core';
import { BoundingBoxService } from './boundingbox.service';
import { ImageService } from './image.service';


declare var fs: any;

@Injectable({
  providedIn: 'root'
})

export class SaverService {
  constructor(private boundingBoxService: BoundingBoxService,
              private imageService: ImageService) {}

  save() {
    if (this.imageService.image) {
      let data = {
        image: this.imageService.image.path,
        boundingBox: this.boundingBoxService.boundingBoxes,
      }

      let content = JSON.stringify(data);
      fs.writeFile(this.imageService.image.name + '.label.json', content, (err) => {
        if (err) {
          alert('fail to write label');
        }
      });
    }
  }
}
