import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DocumentActions, DocumentActionsAPIActions } from './documents.action';
import { DefaultService } from '../../open-api/generated';
import { EMPTY } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import {
  selectPageIndex,
  selectPageSize,
  selectSearchCategory,
  selectSearchKeyWord,
} from './documents.reducer';

@Injectable()
export class DocumentEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  loadDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DocumentActions.loadDocument,
        DocumentActions.searchByCategory,
        DocumentActions.searchByKeyword,
        DocumentActions.changePageSize,
        DocumentActions.paginateDocument
      ),
      concatLatestFrom(() => [
        this.store.select(selectPageSize),
        this.store.select(selectPageIndex),
        this.store.select(selectSearchKeyWord),
        this.store.select(selectSearchCategory),
      ]),
      exhaustMap(([action, pageSize, pageIndex, keyWord, category]) =>
        this.service.getDocuments(category, keyWord, pageSize, pageIndex).pipe(
          map(({ items, total }) =>
            DocumentActionsAPIActions.loadDocumentSuccess({ items, total })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  updateDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentActions.updateDocument),
      exhaustMap(({ id, document }) =>
        this.service.updateDocument(id, document).pipe(
          map((result) =>
            DocumentActionsAPIActions.updateDocumentSuccess({
              document: result,
            })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });
  updateDocumentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentActionsAPIActions.updateDocumentSuccess),
      map(() => DocumentActions.loadDocument())
    );
  });
}
