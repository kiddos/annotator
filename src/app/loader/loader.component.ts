import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  load(event) {
    if (event.target.files && event.target.files[0]) {
      this.imageService.setCurrentImage(event.target.files[0]);
    }
  }
}
