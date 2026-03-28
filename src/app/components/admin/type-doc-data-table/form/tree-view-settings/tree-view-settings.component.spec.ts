import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewSettingsComponent } from './tree-view-settings.component';

describe('TreeViewSettingsComponent', () => {
  let component: TreeViewSettingsComponent;
  let fixture: ComponentFixture<TreeViewSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeViewSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeViewSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
