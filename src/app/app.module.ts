import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelComponent } from './panel/panel.component';
import { LoaderComponent } from './loader/loader.component';
import { DisplayComponent } from './display/display.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelComponent,
    LoaderComponent,
    DisplayComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
