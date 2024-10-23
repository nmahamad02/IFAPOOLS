import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDetailComponent } from './subcategory-detail.component';

describe('SubcategoryDetailComponent', () => {
  let component: SubcategoryDetailComponent;
  let fixture: ComponentFixture<SubcategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
