import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerSettingsDataTableComponent } from './server-settings-data-table.component';

describe('ServerSettingsDataTableComponent', () => {
  let component: ServerSettingsDataTableComponent;
  let fixture: ComponentFixture<ServerSettingsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerSettingsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerSettingsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
