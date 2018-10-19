import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaverComponent } from './saver.component';

describe('SaverComponent', () => {
  let component: SaverComponent;
  let fixture: ComponentFixture<SaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
