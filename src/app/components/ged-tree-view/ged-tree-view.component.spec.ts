import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedTreeViewComponent } from './ged-tree-view.component';

describe('GedTreeViewComponent', () => {
  let component: GedTreeViewComponent;
  let fixture: ComponentFixture<GedTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GedTreeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GedTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
