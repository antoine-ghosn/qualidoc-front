import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeImportDetailComponent } from './type-import-detail.component';

describe('TypeImportDetailComponent', () => {
  let component: TypeImportDetailComponent;
  let fixture: ComponentFixture<TypeImportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeImportDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeImportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
