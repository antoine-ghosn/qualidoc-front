import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAliasDataTableComponent } from './doc-alias-data-table.component';

describe('DocAliasDataTableComponent', () => {
  let component: DocAliasDataTableComponent;
  let fixture: ComponentFixture<DocAliasDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocAliasDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAliasDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
