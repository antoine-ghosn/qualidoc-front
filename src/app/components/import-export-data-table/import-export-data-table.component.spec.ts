import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportExportDataTableComponent } from './import-export-data-table.component';

describe('ImportExportDataTableComponent', () => {
  let component: ImportExportDataTableComponent;
  let fixture: ComponentFixture<ImportExportDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportExportDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportExportDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
