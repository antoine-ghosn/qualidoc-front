import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocDataTableComponent } from './type-doc-data-table.component';

describe('TypeDocDataTableComponent', () => {
  let component: TypeDocDataTableComponent;
  let fixture: ComponentFixture<TypeDocDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeDocDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeDocDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
