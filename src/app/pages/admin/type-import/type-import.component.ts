import { Component, inject, OnInit } from '@angular/core';
import { TypeDocDataTableComponent } from '../../../components/admin/type-doc-data-table/type-doc-data-table.component';
import { Store } from '@ngrx/store';
import { DocumentTypeActions } from '../../../store/type/type.actions';

@Component({
  selector: 'app-type-import',
  imports: [TypeDocDataTableComponent],
  templateUrl: './type-import.component.html',
  styleUrl: './type-import.component.scss',
})
export class TypeImportSettingComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(DocumentTypeActions.loadDocumentTypes());

    
  }



  

}
