import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSettingsDataTableComponent } from './email-settings-data-table.component';

describe('EmailSettingsDataTableComponent', () => {
  let component: EmailSettingsDataTableComponent;
  let fixture: ComponentFixture<EmailSettingsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSettingsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSettingsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
