import { Injectable, EventEmitter } from '@angular/core';

import { BoundingBox } from './boundingbox';

@Injectable({
  providedIn: 'root'
})
export class BoundingBoxService {
  eventEmitter: EventEmitter<string>;
  boundingBoxes: Array<BoundingBox>;

  constructor() {
    this.boundingBoxes = [];
    this.eventEmitter = new EventEmitter<string>();
  }

  addBoundingBox(box: BoundingBox) {
    this.boundingBoxes.push(box);
    this.eventEmitter.emit('add');
  }

  deleteBoundingBox(box: BoundingBox) {
    for (let i = 0; i < this.boundingBoxes.length; ++i) {
      if (this.boundingBoxes[i].x === box.x &&
          this.boundingBoxes[i].y === box.y &&
          this.boundingBoxes[i].w === box.w &&
          this.boundingBoxes[i].h === box.h &&
          this.boundingBoxes[i].cat === box.cat) {
        this.boundingBoxes.splice(i, 1);
        this.eventEmitter.emit('delete');
        break;
      }
    }
  }
}
