import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
 import { TablerIconsModule } from 'angular-tabler-icons';
 import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../../material.module';
import { DocumentCategory } from '../../../../models/Category';
import { selectCategories } from '../../../../store/category/categories.reducer';
 
@Component({
  selector: 'app-form',
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() category?: DocumentCategory;
  store = inject(Store);

  data$ = this.store.selectSignal(selectCategories);

  onItemClick(action: string, obj: any): void {
    if (action === 'update') {
    }

    if (action === 'add') {
    }
  }
}
