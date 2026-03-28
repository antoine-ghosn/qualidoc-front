import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedDataTableComponent } from './ged-data-table.component';

describe('GedDataTableComponent', () => {
  let component: GedDataTableComponent;
  let fixture: ComponentFixture<GedDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GedDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GedDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
