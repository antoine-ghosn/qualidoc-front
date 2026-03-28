import { Component, inject } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { MaterialModule } from '../../../material.module';
import { DocumentService } from '../../../services/document.service';
import { DocumentCategory } from '../../../models/Category';
import { selectCategories } from '../../../store/category/categories.reducer';

@Component({
  selector: 'app-category-doc-data-table',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
    FormComponent,
  ],
  templateUrl: './category-doc-data-table.component.html',
  styleUrl: './category-doc-data-table.component.scss',
})
export class CategoryDocDataTableComponent {
  documentService = inject(DocumentService);
  dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<DocumentType>([]);
  category!: DocumentCategory;
  store = inject(Store);
  data$ = this.store.selectSignal(selectCategories);

  displayedColumns: string[] = ['#', 'name', 'action'];

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDataSource(data: any) {
    this.dataSource.data = data;
    return this.dataSource;
  }

  onItemClick(action: string, obj: any): void {
    if (action === 'edit') {
      this.category = obj;
    } else {
      this.dialog.open(DialogComponent);
    }
  }
}
