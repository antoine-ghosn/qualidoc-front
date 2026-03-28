import { Component, inject } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../material.module';
 import { DocumentType } from '../../../open-api/generated';
import { Router } from '@angular/router';
import { selectDocumentTypes } from '../../../store/type/type.reducer';

@Component({
  selector: 'app-type-doc-data-table',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
  ],
  templateUrl: './type-doc-data-table.component.html',
  styleUrl: './type-doc-data-table.component.scss',
})
export class TypeDocDataTableComponent {
  dataSource = new MatTableDataSource<DocumentType>([]);
  type!: DocumentType;
  store = inject(Store);
  router = inject(Router);
  data$ = this.store.selectSignal(selectDocumentTypes);

  displayedColumns: string[] = ['#', 'name', 'action'];

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDataSource(data: any) {
    this.dataSource.data = data;
    return this.dataSource;
  }

  onItemClick(action: string, type: any): void {
    this.router.navigate(['/admin/type-import', type.name]);
  }
}
