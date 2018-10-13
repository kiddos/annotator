import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
    this.inputCategoryName = '';
  }

  ngOnInit() {
  }

  get categories() {
    return this.categoryService.categories;
  }

  get selected() {
    return this.categoryService.selected;
  }

  addCategory(name: string) {
    if (this.inputCategoryName !== '') {
      this.categoryService.addCategory(this.inputCategoryName);
    }
  }

  deleteCategory(name: string) {
    this.categoryService.deleteCategory(name);
  }

  selectCategory(name: string) {
    this.categoryService.selectCategory(name);
  }

  inputCategoryName: string;
}
