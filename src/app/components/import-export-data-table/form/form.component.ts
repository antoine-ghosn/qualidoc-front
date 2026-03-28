import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../../shared/i18n/language.service';

@Component({
  selector: 'import-export-form',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  lang = inject(LanguageService);
  @Input() connectors: any;
  @Input() folders: any;
  @Input() flow: any;
  @Input() connectorTypes: any;
  @Input() connectorType: any;

  @Output() OnSelectionChanged = new EventEmitter<any>();
  @Output() transfert = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  selectedFiles: File[] = [];
  isLocalImport = false;
  isLocalExport = false;

  form = new FormGroup({
    base_directory: new FormControl(''),
    connector: new FormControl(0),
  });

  OnItemchange(value: any) {
    this.connectorType = value;
    this.isLocalImport = (value === 'LOCAL_IMPORT')  ;
    this.isLocalExport =   (value === 'LOCAL');
    this.OnSelectionChanged.emit(value);
    if (!this.isLocalImport) {
      this.selectedFiles = [];
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  submit() {
    this.transfert.emit({
      flow: this.flow,
      settingId: this.form.get('connector')?.value,
      folder: this.form.get('base_directory')?.value,
      files: this.isLocalImport ? this.selectedFiles : undefined,
      isLocalImport: this.isLocalImport,
      isLocalExport: this.isLocalExport,
    });
  }
}
