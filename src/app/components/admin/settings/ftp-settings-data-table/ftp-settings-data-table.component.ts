import {
  Component,
  effect,
  inject,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
 import { MaterialModule } from '../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormComponent } from './form/form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { SettingActions } from '../../../../store/settings/settings.action';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { Setting } from '../../../../open-api/generated';
 
@Component({
  selector: 'app-ftp-settings-data-table',
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    NgScrollbarModule,
    CommonModule,
    FormComponent,
  ],
  templateUrl: './ftp-settings-data-table.component.html',
  styleUrl: './ftp-settings-data-table.component.scss',
})
export class FtpSettingsDataTableComponent implements OnChanges {
  @Input({ required: true }) flow!: string;
  @Input({ required: true }) settings!: Array<Setting>;
  ftpSetting?: Setting;
  dialog = inject(MatDialog);
  store = inject(Store);
  dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = [
    'name',
    'ip',
    'port',
    'action',
  ];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.settings
    this.ftpSetting = undefined;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onItemClick(action: string, obj: any): void {
     
    if (action === 'EDIT') {
      this.ftpSetting = obj;
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
