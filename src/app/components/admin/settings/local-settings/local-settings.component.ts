import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalSetting, Setting } from '../../../../open-api/generated';
import { Store } from '@ngrx/store';
import { SettingActions } from '../../../../store/settings/settings.action';

@Component({
  selector: 'app-local-settings',
  standalone: true,
  imports: [
    MaterialModule,
    TablerIconsModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './local-settings.component.html',
  styleUrl: './local-settings.component.scss',
})
export class LocalSettingsComponent {
  store = inject(Store);
  _localSettings: LocalSetting = { size_limit: 0 } as LocalSetting;
  @Input() set localSettings(value: Setting | undefined) {
    this._localSettings = value as LocalSetting;

    this._localSettings = {
      ...this._localSettings,
      name: 'local_setting',
      type: 'LOCAL',
      size_limit: this._localSettings?.size_limit || 0,
    };
  }

  updateLocalSettings() {
    const { id, flow, name, size_limit } = this._localSettings;

    if (id === undefined) {
      this.store.dispatch(
        SettingActions.addSetting({
          setting: {
            name: 'local_setting',
            flow: 'export',
            type: 'LOCAL',
            size_limit: size_limit,
          },
        })
      );
    } else {
      this.store.dispatch(
        SettingActions.updateSetting({
          id: id || 0,
          setting: {
            name: 'local_setting',
            flow: 'export',
            type: 'LOCAL',
            size_limit: size_limit,
          },
        })
      );
    }
  }
}
