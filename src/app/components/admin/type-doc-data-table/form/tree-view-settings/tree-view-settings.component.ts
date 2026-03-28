import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../../../material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TablerIconsModule } from 'angular-tabler-icons';
import {
  DocumentColumn,
  DocumentType,
} from '../../../../../open-api/generated';
import { FormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-view-settings',
  imports: [
    CommonModule,
    MaterialModule,
    TablerIconsModule,
    NgScrollbarModule,
    CdkDropList,
    CdkDrag,
    FormsModule,
  ],
  templateUrl: './tree-view-settings.component.html',
  styleUrl: './tree-view-settings.component.scss',
})
export class TreeViewSettingsComponent {
  _type!: DocumentType;
  leafFormat: string = '{filename}';
  available_columns!: string[];
  treeViewHierarchy!: string[];
  exampleData = { name: 'Contrat', date: '2025-10-10' };

  @Input() set type(type: any) {
    this._type = type;
    this.available_columns = [
      ...type.columns
        .filter(
          (c: DocumentColumn) =>
            !!!type.treeViewHierarchy.find((d: String) => d === c.name)
        )
        .map((c: DocumentColumn) => c.name),
    ];
    console.log(type);
    
    this.leafFormat = type.leafFormat ?? '{filename}';

    this.treeViewHierarchy = [...type.treeViewHierarchy];
  }
  @Output() typeChange = new EventEmitter<DocumentType>();
  @ViewChild(MatAutocompleteTrigger) autoTrigger!: MatAutocompleteTrigger;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this._type = {
        ...this._type,
        treeViewHierarchy: this.treeViewHierarchy,
      };

      this.typeChange.emit(this._type);
    }
  }

  onLeafFormatChange(value: string) {
    this._type = { ...this._type, leafFormat: value };
    this.typeChange.emit(this._type);
  }

  insertPlaceholder(event: MatAutocompleteSelectedEvent, option: MatOption) {
    const column = option.value;
    const placeholder = `{${column}}`;

    const input = document.activeElement as HTMLInputElement;
    const currentValue = this.leafFormat ?? '';

    if (input && input.selectionStart != null) {
      const start = input.selectionStart;
      const end = input.selectionEnd ?? start;

      const before = currentValue.substring(0, start);
      const after = currentValue.substring(end);

      const newValue = before + placeholder + after;
      this.leafFormat = newValue;

      input.value = newValue;
      this.onLeafFormatChange(newValue);

      setTimeout(() => {
        input.focus();
        input.selectionStart = input.selectionEnd = start + placeholder.length;
      });
    } else {
      this.leafFormat = (this.leafFormat ?? '') + placeholder;
      this.onLeafFormatChange(this.leafFormat);
    }

    setTimeout(() => this.autoTrigger.openPanel());
  }

  openAutocompleteOnBrace(event: KeyboardEvent) {
    if (event.key === '{') {
      setTimeout(() => this.autoTrigger.openPanel());
    }
  }

  formatLeaf(template?: string, data: Record<string, any> = {}): string {
    if (!template) return '';
    return template.replace(/{(\w+)}/g, (_, key) => data[key] ?? `{${key}}`);
  }

  onType(evt: Event) {
    const val = (evt.target as HTMLInputElement).value;
    this.leafFormat = val;
    this.onLeafFormatChange(val);
  }
}
