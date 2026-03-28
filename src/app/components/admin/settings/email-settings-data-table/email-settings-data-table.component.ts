import { Component, OnChanges, inject, Input } from '@angular/core';
 import { MaterialModule } from '../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatNativeDateModule } from '@angular/material/core';
import { FormComponent } from './form/form.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { Store } from '@ngrx/store';
import { SettingActions } from '../../../../store/settings/settings.action';
import { Setting } from '../../../../open-api/generated';

@Component({
  selector: 'app-email-settings-data-table',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    CommonModule,
    FormComponent,
  ],
  templateUrl: './email-settings-data-table.component.html',
  styleUrl: './email-settings-data-table.component.scss',
})
export class EmailSettingsDataTableComponent implements OnChanges {
  @Input({ required: true }) settings!: Array<Setting>;
  @Input({ required: true }) flow!: string;

  emailSetting?: Setting;
  dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<Setting>([]);
  store = inject(Store);
  displayedColumns: string[] = ['name', 'host','port','username','protocol','action'];

  ngOnChanges(): void {
    this.dataSource.data = this.settings.filter(
      (setting) => setting.flow === 'import' && setting.type === 'EMAIL'
    );

    this.emailSetting = undefined;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemClick(action: string, obj: any): void {
    if (action === 'EDIT') {
      this.emailSetting = obj;
    } else {
      let refDialog = this.dialog.open(DialogComponent, {
        data: {
          obj,
          action,
        },
      });
      refDialog.afterClosed().subscribe((result) => {
        result.event === 'DELETE' &&
          this.store.dispatch(SettingActions.deleteSetting({ id: obj.id }));
      });
    }
  }
}
