import { Component, Inject, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogData } from './dialog-data';
import { MaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, FormsModule, MaterialModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  action: string = 'ADD';
  local_data!: DocumentType;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    //this.local_data = { ...data.type };
    //  this.action = this.data.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
