import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Stage, Ticker, Bitmap } from 'createjs-module';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  constructor(private imageService: ImageService) {
    this.imageService.load.subscribe(() => {
      if (this.imageService.image) {
        let img = new Image();
        let fileReader = new FileReader();
        fileReader.onload = () => {
          img.src = fileReader.result;
        };
        fileReader.readAsDataURL(this.imageService.image);

        this.currentImage = new Bitmap(img);
        this.currentImage.image.onload = () => {
          let w = this.currentImage.image.width;
          let h = this.currentImage.image.height;
          let scale = this.stage.canvas.width / w;
          let offsetX = 0;
          let offsetY = (this.stage.canvas.height - h * scale) / 2;
          if (h > w) {
            scale = this.stage.canvas.height / h;
            offsetX = (this.stage.canvas.width - w * scale) / 2;
            offsetY = 0;
          }
          this.stage.scaleX = this.stage.scaleY = scale;
          this.currentImage.x = offsetX / scale;
          this.currentImage.y = offsetY / scale;
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
  }

  stage: any;
  currentImage: any;
}
