import { Component, inject, effect, signal, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { GedTreeViewComponent } from '../../components/ged-tree-view/ged-tree-view.component';
import { GedDataTableComponent } from '../../components/ged-data-table/ged-data-table.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectDocuments } from '../../store/document/documents.reducer';
import { selectTrackingRecords } from '../../store/tracking/tracking.reducer';
import { DocumentColumn } from '../../open-api/generated';
import { DocumentActions } from '../../store/document/documents.action';
import { SettingActions } from '../../store/settings/settings.action';
import { DocumentTypeActions } from '../../store/type/type.actions';
import { TrackingActions } from '../../store/tracking/tracking.action';
import { selectDocumentType } from '../../store/type/type.reducer';
import { StorageActions } from '../../store/storage/storage.action';
import { selectFolders } from '../../store/storage/storage.reducer';
import { LanguageService } from '../../shared/i18n/language.service';

@Component({
  selector: 'app-ged',
  imports: [
    CommonModule,
    MaterialModule,
    GedDataTableComponent,
    GedTreeViewComponent,
    TablerIconsModule,
  ],
  templateUrl: './ged.component.html',
  styleUrl: './ged.component.scss',
})
export class GedComponent implements OnInit {
  store = inject(Store);
  lang = inject(LanguageService);
  documents = this.store.selectSignal(selectDocuments);
  type = this.store.selectSignal(selectDocumentType);
  columns = signal<DocumentColumn[]>([]);
  folders = this.store.selectSignal(selectFolders);
  searchValue = signal('');
  categoryValue = signal('');

  constructor() {
    effect(() => {
      this.columns.set(this.type()?.columns || []);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(StorageActions.loadStorage());
    this.store.dispatch(DocumentActions.loadDocument());
    this.store.dispatch(SettingActions.listSetting());
    this.store.dispatch(DocumentTypeActions.loadDocumentTypes());
  }

  search(keyWord: any) {
    this.store.dispatch(DocumentActions.searchByKeyword({ keyWord }));
  }
  selectCategory(category: any) {
    this.store.dispatch(DocumentActions.searchByCategory({ category }));
  }
}
