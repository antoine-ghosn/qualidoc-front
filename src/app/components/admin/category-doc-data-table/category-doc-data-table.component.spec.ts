import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDocDataTableComponent } from './category-doc-data-table.component';

describe('CategoryDocDataTableComponent', () => {
  let component: CategoryDocDataTableComponent;
  let fixture: ComponentFixture<CategoryDocDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDocDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDocDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
