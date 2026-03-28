import { Component, inject, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Store } from '@ngrx/store';
import { AliasActions } from '../../../store/alias/aliases.action';

@Component({
  selector: 'app-doc-alias-data-item',
  imports: [FormsModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './doc-alias-data-item.component.html',
  styleUrl: './doc-alias-data-item.component.scss',
})
export class DocAliasDataItemComponent {
  @Input({ required: true }) aliases: Array<string> = [];
  @Input({ required: true }) primaryWord: string = '';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  store = inject(Store);
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.store.dispatch(
        AliasActions.addAliasToPrimaryWord({
          primaryWord: this.primaryWord,
          alias: value,
        })
      );
      this.aliases.push(value);
    }
    event.chipInput!.clear();
  }
  remove(alias: string): void {
    this.store.dispatch(
      AliasActions.removeAliasFromPrimaryWord({
        primaryWord: this.primaryWord,
        alias,
      })
    );
  }
  edit(alias: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(alias);
      return;
    }

    this.store.dispatch(
      AliasActions.updateAliasForPrimaryWord({
        primaryWord: this.primaryWord,
        oldAlias: alias,
        newAlias: value,
      })
    );
  }
}
