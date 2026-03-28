import { Component, Input, inject, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { SettingActions } from '../../../../store/settings/settings.action';
import { Store } from '@ngrx/store';
import { ServerSetting, Setting } from '../../../../open-api/generated';

@Component({
  selector: 'app-server-settings-data-table',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
    FormComponent,
  ],
  templateUrl: './server-settings-data-table.component.html',
  styleUrl: './server-settings-data-table.component.scss',
})
export class ServerSettingsDataTableComponent {
  @Input() serverSettings!: Array<Setting>;
  @Input({ required: true }) flow!: string;

  serverSetting?: ServerSetting;
  dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<ServerSetting>([]);
  store = inject(Store);

  displayedColumns: string[] = ['name','base_directory', 'action'];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.serverSettings as Array<ServerSetting>;
    this.serverSetting = undefined;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemClick(action: string, obj: any): void {
    if (action === 'EDIT') {
      this.serverSetting = obj;
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
