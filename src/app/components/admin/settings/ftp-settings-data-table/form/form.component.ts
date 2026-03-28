import {
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { passwordsMatchValidator } from '../../../../../shared/utils/validators/PasswordsMatchValidator';
import { Store } from '@ngrx/store';
import { SettingActions } from '../../../../../store/settings/settings.action';
import { selectTrackingRecords } from '../../../../../store/tracking/tracking.reducer';
import {
  FlowType,
  FTPSetting,
  Setting,
  Tracking,
} from '../../../../../open-api/generated';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input() flow: any;
  _ftpSetting: FTPSetting | undefined;

  @Input() set ftpSetting(value: Setting | undefined) {
    this._ftpSetting = value as FTPSetting;
    this.isEdit = !!value;
    if (this.ftpForm) {
      this.ftpForm.patchValue({
        id: value?.id,
        flow: value?.flow,
        name: (value as FTPSetting)?.name || '',
        ip: (value as FTPSetting)?.ip || '',
        port: (value as FTPSetting)?.port || '',
        username: (value as FTPSetting)?.username || '',
        password: (value as FTPSetting)?.password || '',
        confirmPassword: (value as FTPSetting)?.password || '',
      });
    }
  }
  ftpForm!: FormGroup;
  store = inject(Store);

  trackings$ = this.store.selectSignal(selectTrackingRecords);
  trackings = signal<Tracking[]>([]);

  constructor() {
    effect(() => {
      this.trackings.set(this.trackings$().filter((t) => t.flowType === this.flow));
    });
  }
  fb = inject(FormBuilder);
  isEdit: boolean = false;

  ngOnInit(): void {
    this.ftpForm = this.fb.group(
      {
        id: [this._ftpSetting?.id],
        flow: [this._ftpSetting?.flow],

        name: [
          (this._ftpSetting as FTPSetting)?.name || '',
          Validators.required,
        ],
        ip: [(this._ftpSetting as FTPSetting)?.ip || '', Validators.required],
        port: [
          (this._ftpSetting as FTPSetting)?.port || '',
          Validators.required,
        ],
        username: [
          (this._ftpSetting as FTPSetting)?.username || '',
          Validators.required,
        ],
        password: [
          (this._ftpSetting as FTPSetting)?.password || '',
          Validators.required,
        ],
        confirmPassword: [
          (this._ftpSetting as FTPSetting)?.password || '',
          Validators.required,
        ],
      },
      {
        validators: [passwordsMatchValidator],
      }
    );
  }

  onSubmit(): void {
    if (this.ftpForm.valid) {
      const { id, flow, name, ip, port,username, password } = this.ftpForm.value;
      if (this.isEdit)
        this.store.dispatch(
          SettingActions.updateSetting({
            id,
            setting: {
              name: name,
              flow,
              type: 'FTP',
              ip,
              port,
              username,
              password,
            },
          })
        );
      else
        this.store.dispatch(
          SettingActions.addSetting({
            setting: {
              name: name,
              flow: this.flow as FlowType,
              type: 'FTP',
              ip,
              port,
              username,
              password,
            },
          })
        );
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.ftpForm.reset();
    this.ftpForm.get('name')?.markAsPristine();
    this.ftpForm.get('ip')?.markAsPristine();
    this.ftpForm.get('port')?.markAsPristine();
    this.ftpForm.get('username')?.markAsPristine();
    this.ftpForm.get('password')?.markAsPristine();
    this.ftpForm.markAsPristine();
    this.ftpForm.markAsUntouched();
    this.ftpForm.updateValueAndValidity();
  }

  onCancel(): void {
    this.resetForm();
  }
}
