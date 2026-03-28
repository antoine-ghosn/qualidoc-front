import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from '../../../../../material.module';
import { CommonModule } from '@angular/common';
import { passwordsMatchValidator } from '../../../../../shared/utils/validators/PasswordsMatchValidator';
import { SettingActions } from '../../../../../store/settings/settings.action';
import { Store } from '@ngrx/store';
import { EmailSetting, Setting } from '../../../../../open-api/generated';
import { ShowErrorOnTouchMatcher } from '../../../../../shared/utils/validators/ErrorStateMatcher';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
  ],
})
export class FormComponent implements OnInit {
  matcher = new ShowErrorOnTouchMatcher();

  @Input() flow: any;
  @Input() set emailSetting(value: Setting | undefined) {
    this._emailSetting = value as EmailSetting;
    this.isEdit = !!value;
    if (this.emailForm) {
      this.emailForm.patchValue({
        id: value?.id,
        flow: value?.flow,
        username: (value as EmailSetting)?.username || '',
        name: (value as EmailSetting)?.name || '',
        host: (value as EmailSetting)?.host || '',
        port: (value as EmailSetting)?.port || '',
        protocol: (value as EmailSetting)?.protocol || '',
        password: (value as EmailSetting)?.password || '',
        confirmPassword: (value as EmailSetting)?.password || '',
      });
    }
  }
  _emailSetting: EmailSetting | undefined;
  isEdit = false;
  emailForm!: FormGroup;
  store = inject(Store);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group(
      {
        id: [this._emailSetting?.id],
        flow: [this._emailSetting?.flow],
        name: [
          (this.emailSetting as EmailSetting)?.name || '',
          Validators.required,
        ],
        username: [
          (this.emailSetting as EmailSetting)?.username || '',
          Validators.required,
        ],
        host: [
          (this.emailSetting as EmailSetting)?.host || '',
          [Validators.required],
        ],
        port: [
          (this.emailSetting as EmailSetting)?.port || '',
          [Validators.required],
        ],
        protocol: [
          (this.emailSetting as EmailSetting)?.protocol || '',
          [Validators.required],
        ],
        password: [
          (this.emailSetting as EmailSetting)?.password || '',
          Validators.required,
        ],
        confirmPassword: [
          (this.emailSetting as EmailSetting)?.password || '',
          Validators.required,
        ],
      },
      {
        validators: [passwordsMatchValidator],
      }
    );
  }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const { id, flow, name, username, host, port, password, protocol } =
        this.emailForm.value;
      if (this.isEdit)
        this.store.dispatch(
          SettingActions.updateSetting({
            id,
            setting: {
              id,
              name,
              flow: this.flow,
              type: 'EMAIL',
              username,
              host,
              port,
              password,
              protocol,
            },
          })
        );
      else
        this.store.dispatch(
          SettingActions.addSetting({
            setting: {
              name,
              flow: this.flow,
              type: 'EMAIL',
              username,
              host,
              port,
              password,
              protocol
            },
          })
        );

      this.resetForm();
    }
  }
  private resetForm(): void {
    this.emailForm.reset();

    Object.values(this.emailForm.controls).forEach((control) => {
      control.markAsPristine();
      control.markAsUntouched();
      control.updateValueAndValidity();
    });

    this.emailForm.markAsPristine();
    this.emailForm.markAsUntouched();
    this.emailForm.updateValueAndValidity();
  }

  onCancel(): void {
    this.resetForm();
  }
}
