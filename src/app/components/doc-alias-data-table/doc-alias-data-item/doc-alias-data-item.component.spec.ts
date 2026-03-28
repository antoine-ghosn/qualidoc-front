import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAliasDataItemComponent } from './doc-alias-data-item.component';

describe('DocAliasDataItemComponent', () => {
  let component: DocAliasDataItemComponent;
  let fixture: ComponentFixture<DocAliasDataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAliasDataItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAliasDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
