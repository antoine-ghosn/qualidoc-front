import { Component, Input, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { Store } from '@ngrx/store';
import { DocumentActions } from '../../store/document/documents.action';
import { DialogComponent } from './dialog/dialog.component';
import { DocumentColumn } from '../../open-api/generated';
import { LanguageService } from '../../shared/i18n/language.service';

@Component({
  selector: 'app-ged-data-table',
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './ged-data-table.component.html',
  styleUrl: './ged-data-table.component.scss',
})
export class GedDataTableComponent {
  @Input() data: any;
  @Input() columns: DocumentColumn[] = [];

  dialog = inject(MatDialog);
  store = inject(Store);
  lang = inject(LanguageService);

  displayedColumns: string[] = [];
  ngOnChanges(): void {
    this.displayedColumns = [
      ...this.columns
        .filter((c) => c.visibility)
        .sort((a, b) => a.order - b.order)
        .map((c) => c.name),
      'action',
    ];
  }

  getColumnValue(dataRow: any, column: string) {
    if (!dataRow) return '';

    if (column === 'category') {
      return dataRow?.category?.name || 'VRAC';
    } else if (column === 'date') {
      return dataRow[column]
        ? new Date(dataRow[column]).toLocaleDateString('fr-FR')
        : '';
    }

    if (column.includes('+')) {
      return column
        .split('+')
        .map((expr) => expr.trim())
        .map((expr) => this.resolvePath(dataRow, expr))
        .filter((v) => v !== undefined && v !== null)
        .join(' ');
    }

    const val = this.resolvePath(dataRow, column);
    if (val === null || val === undefined) return '';
    if (typeof val === 'object') return this.formatObject(val);
    return val;
  }

  private resolvePath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  getColumnHeader(column: DocumentColumn): string {
    const key = 'col.' + column.name;
    const translated = this.lang.t(key);
    return translated !== key ? translated : column.displayedName;
  }

  private formatObject(obj: any): string {
    if (!obj || typeof obj !== 'object') return String(obj ?? '');
    const parts: string[] = [];
    for (const [, v] of Object.entries(obj)) {
      if (v && typeof v === 'object') {
        parts.push(this.formatObject(v));
      } else if (v && String(v).trim()) {
        parts.push(String(v));
      }
    }
    return parts.join(' - ');
  }

  onItemClick(action: string, element: any): void {
    if (action == 'EDIT') {
      let refDialog = this.dialog.open(FormComponent, {
        data: {
          columns: this.columns.filter((c) => c.editable && c.name != 'date'),
          document: element,
        },
      });
      refDialog.afterClosed().subscribe((result) => {
        if (result?.data) {
          const { id, ...documentData } = result.data;

          this.store.dispatch(
            DocumentActions.updateDocument({ id, document: documentData })
          );
        }
      });
    }
    if (action == 'SHOW') {
      this.dialog.open(DialogComponent, {
        height: '80vh',
        width: '800px',
        maxWidth: '100vw',
        data: {
          url: element.url,
        },
      });
    }
  }
}
