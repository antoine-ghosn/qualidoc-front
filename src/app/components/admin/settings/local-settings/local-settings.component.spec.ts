import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalSettingsComponent } from './local-settings.component';

describe('LocalSettingsComponent', () => {
  let component: LocalSettingsComponent;
  let fixture: ComponentFixture<LocalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
