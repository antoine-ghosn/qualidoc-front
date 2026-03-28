import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DocumentTypeActions, DocumentTypeAPIActions } from './type.actions';
import { DefaultService } from '../../open-api/generated';
import { EMPTY } from 'rxjs';

@Injectable()
export class DocumentTypeEffects {
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  loadSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentTypes),
      exhaustMap(() =>
        this.service.listDocumentTypes().pipe(
          map((documentTypes) =>
            DocumentTypeAPIActions.loadDocumentTypesSuccess({
              documentTypes,
            })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  loadDocumentTypeByTenant$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentTypeActions.loadDocumentTypeByTenant),
      exhaustMap(({ documentType }) =>
        this.service.getDocumentTypeByTenant(documentType).pipe(
          map((documentType) =>
            DocumentTypeAPIActions.loadDocumentTypeByTenantSuccess({
              documentType,
            })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  updateTypeSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DocumentTypeActions.updateType),
      exhaustMap(({ documentType }) =>
        this.service
          .updateDocumentType(documentType.id || 0, documentType)
          .pipe(
            map((documentType) =>
              DocumentTypeAPIActions.updateDocumentTypesSuccess({
                documentType,
              })
            ),
            catchError((error) => EMPTY)
          )
      )
    );
  });
}
