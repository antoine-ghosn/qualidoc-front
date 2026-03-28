import { Component, inject, OnInit } from '@angular/core';
import { ImportExportDataTableComponent } from '../../components/import-export-data-table/import-export-data-table.component';
import { Store } from '@ngrx/store';
import { SettingActions } from '../../store/settings/settings.action';

@Component({
  selector: 'app-export',
  imports: [ImportExportDataTableComponent],
  templateUrl: './export.component.html',
  styleUrl: './export.component.scss',
})
export class ExportComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(SettingActions.listSetting());
  }
}
