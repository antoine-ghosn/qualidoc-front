import { DatePipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';

import { PdfViewerModule } from 'ng2-pdf-viewer';
 
@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, FormsModule, MaterialModule,PdfViewerModule ],
  providers: [DatePipe],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  url: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.url = data.url;
  }

  doAction(): void {
    this.dialogRef.close({});
  }

  closeDialog(): void {
    this.dialogRef.close({});
  }
}
