import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() {
    this.categories = [];
    this.selected = '';
  }

  addCategory(name: string) {
    if (this.categories.indexOf(name.toLowerCase()) < 0) {
      this.categories.push(name.toLowerCase());

      if (!this.selected) {
        this.selected = name.toLowerCase();
      }
    }
  }

  deleteCategory(name: string) {
    let index = this.categories.indexOf(name.toLowerCase());
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selectCategory(name: string) {
    this.selected = name;
  }

  categories: Array<string>;
  selected: string;
}
