import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from '../../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ViewSettingsItemComponent } from './view-settings-item/view-settings-item.component';
import {
  DocumentColumn,
  DocumentType,
} from '../../../../../open-api/generated';

@Component({
  selector: 'app-list-view-settings',
  imports: [
    MaterialModule,
    TablerIconsModule,
    NgScrollbarModule,
    CdkDropList,
    CdkDrag,
    ViewSettingsItemComponent,
  ],
  templateUrl: './list-view-settings.component.html',
  styleUrl: './list-view-settings.component.scss',
})
export class ListViewSettingsComponent {
  _type!: DocumentType;
  columns!: DocumentColumn[];
  @Input() set type(type: DocumentType) {
    this._type = type;
    this.columns = type.columns || [];
  }
  @Output() typeChange = new EventEmitter<DocumentType>();

  handleItemAction(action: string, event: any): void {
    switch (action) {
      case 'TOGGLE_COLUMN_VISIBILITY':
        this.columns = [
          ...this.columns.map((column: DocumentColumn) =>
            column.id === event.id
              ? { ...column, visibility: !column.visibility }
              : column
          ),
        ];
        break;
      case 'UPDATE_TYPE_NAME':
        this._type = { ...this._type, name: event };
        break;
      case 'UPDATE_COLUMN':
        this.columns = [
          ...this.columns.map((c) => (c.id === event.id ? { ...event } : c)),
        ];
        break;
      case 'UPDATE_COLUMN_ORDER':
        {
          let array = [...this.columns];
          moveItemInArray(array, event.previousIndex, event.currentIndex);
          this.columns = [...array.map((c, i) => ({ ...c, order: i + 1 }))];
        }

        break;
    }
    this._type = {
      ...this._type,
      columns: [...this.columns],
    };
    this.typeChange.emit(this._type);
  }
}
