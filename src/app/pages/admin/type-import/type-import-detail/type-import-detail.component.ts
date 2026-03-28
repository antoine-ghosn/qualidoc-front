import { Component, effect, inject, Input, signal } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { TreeViewSettingsComponent } from '../../../../components/admin/type-doc-data-table/form/tree-view-settings/tree-view-settings.component';
import { ListViewSettingsComponent } from '../../../../components/admin/type-doc-data-table/form/list-view-settings/list-view-settings.component';
import { DocumentType } from '../../../../open-api/generated';
import { Store } from '@ngrx/store';
import { DocumentTypeActions } from '../../../../store/type/type.actions';
import { selectDocumentType } from '../../../../store/type/type.reducer';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../components/admin/type-doc-data-table/dialog/dialog.component';
@Component({
  selector: 'app-type-import-detail',
  imports: [
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    ListViewSettingsComponent,
    TreeViewSettingsComponent,
  ],
  templateUrl: './type-import-detail.component.html',
  styleUrl: './type-import-detail.component.scss',
})
export class TypeImportDetailComponent {
  dialog = inject(MatDialog);
  store = inject(Store);

  type = signal<DocumentType | null>(null);

  @Input() set documentType(value: string) {
    this.store.dispatch(
      DocumentTypeActions.loadDocumentTypeByTenant({ documentType: value })
    );
  }

  constructor() {
    const storeSignal = this.store.selectSignal(selectDocumentType);
    effect(() => {
      this.type.set(storeSignal());
    });
  }

  handleAction(action: string, obj: any): void {
    if (action === 'UPDATE') {
      this.type.set({ ...obj });
    }
  }

  onSave(docType: DocumentType) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'Update',
        msg: 'Êtes-vous sûr de vouloir sauvegarder les modifications apportées à ce type de document ?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event === 'CONFIRM') {
        this.store.dispatch(
          DocumentTypeActions.updateType({ documentType: docType })
        );
      }
    });
  }
}
