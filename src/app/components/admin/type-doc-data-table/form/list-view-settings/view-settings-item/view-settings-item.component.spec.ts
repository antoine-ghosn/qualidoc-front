import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSettingsItemComponent } from './view-settings-item.component';

describe('ViewSettingsItemComponent', () => {
  let component: ViewSettingsItemComponent;
  let fixture: ComponentFixture<ViewSettingsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSettingsItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSettingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
