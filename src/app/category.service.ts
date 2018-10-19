import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Array<string>;
  selected: string;

  constructor(private configurationService: ConfigurationService) {
    this.categories = [];
    this.selected = '';

    this.configurationService.load(() => {
      if (this.configurationService.data.categories) {
        this.categories = this.configurationService.data.categories;
      }
    });
  }

  addCategory(name: string) {
    if (this.categories.indexOf(name.toLowerCase()) < 0) {
      this.categories.push(name.toLowerCase());
      this.configurationService.add('categories', this.categories);

      if (!this.selected) {
        this.selected = name.toLowerCase();
      }
    }
  }

  deleteCategory(name: string) {
    let index = this.categories.indexOf(name.toLowerCase());
    if (index >= 0) {
      this.categories.splice(index, 1);
      this.configurationService.add('categories', this.categories);
    }
  }

  selectCategory(name: string) {
    this.selected = name;
  }
}
