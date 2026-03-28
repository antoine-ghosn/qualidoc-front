import { Component, inject, OnInit } from '@angular/core';
import { DocAliasDataTableComponent } from '../../components/doc-alias-data-table/doc-alias-data-table.component';
import { selectAliases } from '../../store/alias/aliases.reducer';
import { Store } from '@ngrx/store';
import { AliasActions } from '../../store/alias/aliases.action';

@Component({
  selector: 'app-lexique',
  imports: [DocAliasDataTableComponent],
  templateUrl: './lexique.component.html',
  styleUrl: './lexique.component.scss',
})
export class LexiqueComponent implements OnInit {
  store = inject(Store);
  aliases = this.store.selectSignal(selectAliases);

  ngOnInit(): void {
    this.store.dispatch(AliasActions.loadAliases());
  }
}
