import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewSettingsComponent } from './list-view-settings.component';

describe('ListViewSettingsComponent', () => {
  let component: ListViewSettingsComponent;
  let fixture: ComponentFixture<ListViewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
