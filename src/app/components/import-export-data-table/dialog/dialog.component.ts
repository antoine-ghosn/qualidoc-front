import { Component, Inject, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';
import { DialogData } from './dialog-data';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MaterialModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  local_data: any;
  msg: string = '';
  action: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.msg = this.local_data.msg;
  }

  doAction(): void {
    this.dialogRef.close({ event: 'CONFIRM', data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'CANCEL' });
  }
}
