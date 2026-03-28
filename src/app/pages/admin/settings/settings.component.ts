import {
  Component,
  input,
  inject,
  effect,
  signal,
  OnInit,
} from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FtpSettingsDataTableComponent } from '../../../components/admin/settings/ftp-settings-data-table/ftp-settings-data-table.component';
import { ServerSettingsDataTableComponent } from '../../../components/admin/settings/server-settings-data-table/server-settings-data-table.component';
import { EmailSettingsDataTableComponent } from '../../../components/admin/settings/email-settings-data-table/email-settings-data-table.component';
import { Store } from '@ngrx/store';
import { selectSettings } from '../../../store/settings/settings.reducer';
import { CommonModule } from '@angular/common';
import { LocalSettingsComponent } from '../../../components/admin/settings/local-settings/local-settings.component';
import { Setting } from '../../../open-api/generated';
import { SettingActions } from '../../../store/settings/settings.action';

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    MaterialModule,
    FtpSettingsDataTableComponent,
    ServerSettingsDataTableComponent,
    EmailSettingsDataTableComponent,
    LocalSettingsComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  readonly flow = input<string>('import');

  store = inject(Store);
  settings = this.store.selectSignal(selectSettings);
  ftp_settings = signal<Array<Setting>>(Array<Setting>());
  email_settings = signal<Array<Setting>>(Array<Setting>());
  server_settings = signal<Array<Setting>>(Array<Setting>());
  local_settings = signal<Setting>(null as any);

  constructor() {
    effect(() => {
      this.ftp_settings.set(
        this.settings().filter(
          (setting) => setting.flow === this.flow() && setting.type === 'FTP'
        )
      );
      this.email_settings.set(
        this.settings().filter(
          (setting) => setting.flow === this.flow() && setting.type === 'EMAIL'
        )
      );

      this.server_settings.set(
        this.settings().filter(
          (setting) => setting.flow === this.flow() && setting.type === 'SERVER'
        )
      );

      this.local_settings.set(
        this.settings().filter(
          (setting) => setting.flow === this.flow() && setting.type === 'LOCAL'
        )[0]
      );
    });
  }
  ngOnInit(): void {
    this.store.dispatch(SettingActions.listSetting());
  }
}
