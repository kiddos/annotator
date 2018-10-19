import { Component, OnInit } from '@angular/core';
import { Stage, Ticker, Bitmap, Shape, Text } from 'createjs-module';

import { ImageService } from '../image.service';
import { CategoryService } from '../category.service';
import { BoundingBoxService } from '../boundingbox.service';

import { BoundingBox } from '../boundingbox';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  stage: any;
  scale: number;
  currentImage: any;
  currentBoundingBox: BoundingBox;
  boundingBoxes: Array<Shape>;
  boundingBoxesLabels: Array<Text>;

  constructor(private imageService: ImageService,
              private categoryService: CategoryService,
              private boundingBoxService: BoundingBoxService) {
    this.onImageChange();
    this.currentBoundingBox = new BoundingBox(0, 0, 0, 0, '');

    this.boundingBoxes = [];
    this.boundingBoxesLabels = [];

    this.boundingBoxService.eventEmitter.subscribe(() => {
      this.drawBoundingBoxes();
    });
  }

  onImageChange() {
    this.imageService.load.subscribe(() => {
      if (this.imageService.image) {
        let img = new Image();
        let fileReader = new FileReader();
        fileReader.onload = () => {
          img.src = fileReader.result.toString();
        };
        fileReader.readAsDataURL(this.imageService.image);

        this.currentImage = new Bitmap(img);
        this.currentImage.image.onload = () => {
          let w = this.currentImage.image.width;
          let h = this.currentImage.image.height;
          this.scale = this.stage.canvas.width / w;
          let offsetX = 0;
          let offsetY = (this.stage.canvas.height - h * this.scale) / 2;
          if (h > w) {
            this.scale = this.stage.canvas.height / h;
            offsetX = (this.stage.canvas.width - w * this.scale) / 2;
            offsetY = 0;
          }
          this.stage.scaleX = this.stage.scaleY = this.scale;
          this.currentImage.x = offsetX / this.scale;
          this.currentImage.y = offsetY / this.scale;
        }

        this.stage.removeAllChildren();
        this.stage.addChild(this.currentImage);
      }
    });
  }

  ngOnInit() {
    this.stage = new Stage('display');
    Ticker.addEventListener('tick', (event) => {
      this.stage.update();
    });

    this.stage.mouseEnabled = true;

    this.stage.addEventListener('stagemousedown', (event) => {
      this.currentBoundingBox.x = event.stageX / this.scale;
      this.currentBoundingBox.y = event.stageY / this.scale;
    });

    this.stage.addEventListener('stagemouseup', (event) => {
      let w = event.stageX / this.scale - this.currentBoundingBox.x;
      let h = event.stageY / this.scale - this.currentBoundingBox.y;

      if (this.currentImage) {
        if (this.categoryService.selected &&
            this.categoryService.selected !== '') {
          let b = new BoundingBox(this.currentBoundingBox.x,
                                  this.currentBoundingBox.y, w, h,
                                  this.categoryService.selected);
          this.boundingBoxService.addBoundingBox(b);
        } else {
          alert('No selected categories');
        }
      } else {
        alert('No image selected');
      }
    });

    this.stage.addEventListener('pressmove', (event) => {
      this.currentBoundingBox.w = event.stageX / this.scale -
        this.currentBoundingBox.x;
      this.currentBoundingBox.h = event.stageY / this.scale -
        this.currentBoundingBox.y;
    });
  }

  drawBoundingBoxes() {
    // remove bounding box
    for (let i = 0; i < this.boundingBoxes.length; ++i) {
      this.stage.removeChild(this.boundingBoxes[i]);
    }

    // remove bounding box label
    for (let i = 0; i < this.boundingBoxesLabels.length; ++i) {
      this.stage.removeChild(this.boundingBoxesLabels[i]);
    }

    // draw new bounding boxes
    this.boundingBoxes = [];
    this.boundingBoxesLabels = [];
    for (let i = 0; i < this.boundingBoxService.boundingBoxes.length; ++i) {
      let b = new Shape();
      b.graphics.setStrokeStyle(1.0 / this.scale);
      b.graphics.beginStroke('#00FF00').rect(
        this.boundingBoxService.boundingBoxes[i].x,
        this.boundingBoxService.boundingBoxes[i].y,
        this.boundingBoxService.boundingBoxes[i].w,
        this.boundingBoxService.boundingBoxes[i].h);

      this.boundingBoxes.push(b);
      this.stage.addChild(b);

      let l = new Text(this.boundingBoxService.boundingBoxes[i].cat,
        "30px Arial", "#00FF00");
      l.x = this.boundingBoxService.boundingBoxes[i].x;
      l.y = this.boundingBoxService.boundingBoxes[i].y;
      this.boundingBoxesLabels.push(l);
      this.stage.addChild(l);
    }
  }
}
