import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() {
    this.categories = [];
  }

  addCategory(name: string) {
    if (this.categories.indexOf(name.toLowerCase()) < 0) {
      this.categories.push(name.toLowerCase());
    }
  }

  deleteCategory(name: string) {
    let index = this.categories.indexOf(name.toLowerCase());
    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  categories: Array<string>;
}
