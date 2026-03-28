import { Component, Inject, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, FormsModule, MaterialModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  action: string = 'CONFIRM';
  local_data!: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.action = data.action;
    this.local_data = data.payload;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'CANCEL' });
  }
}
