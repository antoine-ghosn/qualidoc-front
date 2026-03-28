import {
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  Input,
  effect,
  signal,
  OnInit,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule, DatePipe } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../../material.module';
import { Store } from '@ngrx/store';
import { selectCategories } from '../../store/category/categories.reducer';
import { selectTrackingRecords } from '../../store/tracking/tracking.reducer';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { selectSettings } from '../../store/settings/settings.reducer';
import { Setting, Tracking } from '../../open-api/generated';
import { SettingType } from '../../models/enum/setting-type';
import { FormComponent } from './form/form.component';
import { TrackingActions } from '../../store/tracking/tracking.action';
import { selectFolders } from '../../store/storage/storage.reducer';
import { StorageActions } from '../../store/storage/storage.action';
import { LanguageService } from '../../shared/i18n/language.service';

@Component({
  selector: 'app-import-export-data-table',

  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
    FormComponent,
  ],
  providers: [DatePipe],
  templateUrl: './import-export-data-table.component.html',
  styleUrl: './import-export-data-table.component.scss',
})
export class ImportExportDataTableComponent implements OnInit, AfterViewInit {
  @Input() flow!: string;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'folder',
    'ok',
    'ko',
    'total',
    'status',
    'action',
  ];

  dataSource = new MatTableDataSource<Tracking>([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  dialog = inject(MatDialog);

  store = inject(Store);
  lang = inject(LanguageService);
  categories = this.store.selectSignal(selectCategories);
  trackings = this.store.selectSignal(selectTrackingRecords);
  settings = this.store.selectSignal(selectSettings);
  connectorType = signal<SettingType>('FTP');
  connectorTypes = signal<SettingType[]>([]);
  connectors = signal<Setting[]>([]);
  folders = this.store.selectSignal(selectFolders);
  constructor() {
    effect(() => {
      this.dataSource.data = this.trackings().filter(
        (tracking: Tracking) => tracking.flowType === this.flow
      );
      this.connectors.set(
        this.settings().filter(
          (setting: Setting) =>
            setting.flow === this.flow && setting.type === this.connectorType()
        )
      );
      this.connectorTypes.set(
        Array.from(
          new Set(
            this.settings()
              .filter((setting) => setting.flow === this.flow  &&  setting.type !== "SERVER")
              .map((setting) => setting.type as SettingType)
          )
        )
      );
    });
  }

  ngOnInit(): void {
    this.store.dispatch(TrackingActions.loadTracking({ flow: undefined }));
    this.store.dispatch(StorageActions.loadStorage());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Delete(element: Tracking) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'Delete',
        msg: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CONFIRM') {
        this.store.dispatch(
          TrackingActions.deleteTransfert({ id: element.id })
        );
      }
    });
  }
  Cancel(element: Tracking) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'Cancel',
        msg: 'Êtes-vous sûr de vouloir annuler ce transfert ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CONFIRM') {
        this.store.dispatch(
          TrackingActions.cancelTransfert({ flow: this.flow, id: element.id })
        );
      }
    });
  }
  resume(element: Tracking) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'Resume',
        msg: 'Êtes-vous sûr de vouloir relancer ce transfert ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CONFIRM') {
        this.store.dispatch(
          TrackingActions.resumeTransfert({ flow: this.flow, id: element.id })
        );
      }
    });
  }

  download(element: Tracking) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'Download',
        msg: 'Êtes-vous sûr de vouloir télécharger ce transfert ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'CONFIRM') {
        this.store.dispatch(
          TrackingActions.downloadTransfert({ id: element.id })
        );
      }
    });
  }

  OnItemchange(value: any) {
    this.connectorType.set(value);
  }

  transfert(event: any) {
    if (event.isLocalImport) {
      this.store.dispatch(
        TrackingActions.uploadFiles({
          flow: event.flow,
          folder: event.folder,
          files: event.files,
        })
      );
    } else if (event.isLocalExport) {
      this.store.dispatch(
        TrackingActions.downloadTransfertFolder({
          folder: event.folder,
        })
      );
    } else {
      this.store.dispatch(
        TrackingActions.startTransfert({
          flow: event.flow,
          settingId: event.settingId,
          folder: event.folder,
        })
      );
    }
  }
}
