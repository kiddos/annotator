import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})

export class PanelComponent implements OnInit {
  constructor() {
    this.show = false;
    this.showChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  @Input('show')
  show: boolean;

  @Output()
  showChange: EventEmitter<boolean>;

  hide() {
    this.show = false;
    this.showChange.emit(this.show);
  }
}
