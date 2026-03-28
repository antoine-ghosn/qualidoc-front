import { CommonModule } from '@angular/common';
import { Component, inject, Optional, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TablerIconsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  Object = Object;
  document!: any;
  groupedFields: Record<string, string[]> = {};
  rootFields: string[] = [];
  store = inject(Store);

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    Object = Object;
    this.document = structuredClone(data.document);
    this.processFields(this.document);
  }

  private processFields(obj: any, prefix = ''): void {
    Object.keys(obj).forEach((key) => {
      const path = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const nestedKeys = Object.keys(value)
          .filter((sub) => typeof value[sub] !== 'object')
          .map((sub) => `${path}.${sub}`);

        if (nestedKeys.length > 0) {
          this.groupedFields[path] = nestedKeys;
        }

        this.processFields(value, path);
      } else if (!prefix) {
        this.rootFields.push(key);
      }
    });
  }

  getColumnValue(path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], this.document);
  }

  setColumnValue(path: string, value: any): void {
    const keys = path.split('.');
    const newDoc = structuredClone(this.document);

    let target = newDoc;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!target[k]) target[k] = {};
      target = target[k];
    }

    target[keys[keys.length - 1]] = value;
    this.document = newDoc;
  }

  onItemClick(action: string): void {
    if (action === 'EDIT')
      this.dialogRef.close({ event: 'EDIT', data: this.document });
    if (action === 'CANCEL') this.dialogRef.close({ event: 'CANCEL' });
  }
}
