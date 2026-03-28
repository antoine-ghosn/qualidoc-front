import { Component, EventEmitter, Input, Output } from '@angular/core';
 import { MaterialModule } from '../../../../../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { DocumentColumn } from '../../../../../../open-api/generated';

@Component({
  selector: 'app-view-settings-item',
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './view-settings-item.component.html',
  styleUrl: './view-settings-item.component.scss',
})
export class ViewSettingsItemComponent {
  @Input() column!: DocumentColumn;
  @Output() OnChange = new EventEmitter<DocumentColumn>();

  OnValueChanged(field: string, value: any) {
    switch (field) {
      case 'name':
        this.column = { ...this.column, name: value };
        break;
      case 'displayedName':
        this.column = { ...this.column, displayedName: value };
        break;
      case 'visibility':
        this.column = { ...this.column, visibility: value };
        break;
    }
    this.OnChange.emit(this.column);
  }
}
