import { Component, inject, OnInit } from '@angular/core';
import { ImportExportDataTableComponent } from '../../components/import-export-data-table/import-export-data-table.component';
import { SettingActions } from '../../store/settings/settings.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-import',
  imports: [ImportExportDataTableComponent],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
})
export class ImportComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(SettingActions.listSetting());
  }
}
