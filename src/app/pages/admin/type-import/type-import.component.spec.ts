import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeImportComponent } from './type-import.component';

describe('TypeImportComponent', () => {
  let component: TypeImportComponent;
  let fixture: ComponentFixture<TypeImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeImportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
