import { Component, OnInit } from '@angular/core';
import { SaverService } from '../saver.service';

@Component({
  selector: 'saver',
  templateUrl: './saver.component.html',
  styleUrls: ['./saver.component.css']
})

export class SaverComponent implements OnInit {

  constructor(private saverService: SaverService) { }

  ngOnInit() {
  }

  save() {
    this.saverService.save();
  }
}
