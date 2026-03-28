import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../../../material.module';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { SettingActions } from '../../../../../store/settings/settings.action';

import { Store } from '@ngrx/store';
import { FlowType, ServerSetting } from '../../../../../open-api/generated';

@Component({
  selector: 'app-form',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule,
    CommonModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input() flow: any;
  _serverSetting: ServerSetting | undefined;

  @Input() set serverSetting(value: ServerSetting | undefined) {
    this._serverSetting = value;
    this.isEdit = !!value;
    if (this.serverForm) {
      this.serverForm.patchValue({
        id: value?.id,
        name: value?.name,
        flow: value?.flow,
        base_directory: value?.base_directory || '',
      });
    }
  }
  serverForm!: FormGroup;
  store = inject(Store);
  fb = inject(FormBuilder);
  isEdit: boolean = false;

  ngOnInit(): void {
    this.serverForm = this.fb.group({
      id: [this._serverSetting?.id],
      name: [this._serverSetting?.name],
      flow: [this._serverSetting?.flow],
      base_directory: [
        this._serverSetting?.base_directory || '',
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.serverForm.valid) {
      const { id, flow, name, base_directory, ip, port, password } =
        this.serverForm.value;
      if (this.isEdit)
        this.store.dispatch(
          SettingActions.updateSetting({
            id,
            setting: {
              id,
              name,
              flow,
              type: 'SERVER',
              base_directory,
            },
          })
        );
      else
        this.store.dispatch(
          SettingActions.addSetting({
            setting: {
              name,
              flow: this.flow as FlowType,
              type: 'SERVER',
              base_directory,
            },
          })
        );
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.serverForm.reset();
    this.serverForm.get('name')?.markAsPristine();
    this.serverForm.get('base_directory')?.markAsPristine();
    this.serverForm.markAsPristine();
    this.serverForm.markAsUntouched();
    this.serverForm.updateValueAndValidity();
  }

  onCancel(): void {
    this.resetForm();
  }
}
