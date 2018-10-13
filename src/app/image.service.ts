import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() {
    this.image = null;
    this.load = new EventEmitter<any>();
  }

  image: any;
  load: EventEmitter<any>;

  setCurrentImage(image) {
    this.image = image;
    this.load.emit(null);
  }
}
