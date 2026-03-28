import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map } from 'rxjs';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { DefaultService } from '../../open-api/generated';
import { StorageActions, StorageAPIActions } from './storage.action';

@Injectable()
export class StorageEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  loadUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StorageActions.loadStorage),
      exhaustMap(() =>
        this.service.listStorageFolders().pipe(
          map((data: any) => StorageAPIActions.loadStorageSuccess({ data })),
          catchError((error) => EMPTY)
        )
      )
    );
  });
}
