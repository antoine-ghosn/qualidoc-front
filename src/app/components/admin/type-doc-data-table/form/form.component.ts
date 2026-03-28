import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Optional } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { Store } from '@ngrx/store';
import { MaterialModule } from '../../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListViewSettingsComponent } from './list-view-settings/list-view-settings.component';
import { TreeViewSettingsComponent } from './tree-view-settings/tree-view-settings.component';
import { DocumentColumn, DocumentType } from '../../../../open-api/generated';

@Component({
  selector: 'app-form',
  imports: [
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    ListViewSettingsComponent,
    TreeViewSettingsComponent,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  type?: any;
  store = inject(Store);
  columns: DocumentColumn[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type = data.type;
    this.columns = [
      ...[...data.type.columns].sort((a, b) => a.order - b.order),
    ];
  }

  handleAction(action: string, obj: any): void {
    switch (action) {
      case 'UPDATE':
        this.type = { ...obj };
        break;
      case 'CONFIRM':
        this.dialogRef.close({ event: 'CONFIRM', data: this.type });
        break;
      case 'CANCEL':
        this.dialogRef.close({ event: 'CANCEL' });
        break;
    }
  }
}
