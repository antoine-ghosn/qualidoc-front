import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FtpSettingsDataTableComponent } from './ftp-settings-data-table.component';

describe('FtpSettingsDataTableComponent', () => {
  let component: FtpSettingsDataTableComponent;
  let fixture: ComponentFixture<FtpSettingsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FtpSettingsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FtpSettingsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
