import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DefaultService } from '../../open-api/generated';
import { AliasActions, AliasAPIActions } from './aliases.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class AliasEffects {
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  loadAliases$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        AliasActions.loadAliases,
        AliasAPIActions.removeAliasFromPrimaryWordSuccess,
        AliasAPIActions.updateAliasForPrimaryWordSuccess,
        AliasAPIActions.addAliasToPrimaryWordSuccess
      ),
      exhaustMap(() =>
        this.service.getAliases().pipe(
          map((aliases) => AliasAPIActions.loadAliasesSuccess({ aliases })),
          catchError((error) =>
            of(AliasAPIActions.loadAliasesFailure({ error }))
          )
        )
      )
    );
  });

  createAlias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.createAlias),
      exhaustMap(({ alias }) =>
        this.service.createAlias(alias).pipe(
          map(() => AliasAPIActions.createAliasSuccess({ alias })),
          catchError((error) =>
            of(AliasAPIActions.createAliasFailure({ error }))
          )
        )
      )
    )
  );

  updateAlias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.updateAlias),
      exhaustMap(({ alias }) =>
        this.service.replaceAlias(alias).pipe(
          map(() => AliasAPIActions.updateAliasSuccess({ alias })),
          catchError((error) =>
            of(AliasAPIActions.updateAliasFailure({ error }))
          )
        )
      )
    )
  );

  deleteAlias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.deleteAliasByPrimaryWord),
      exhaustMap(({ primaryWord }) =>
        this.service.deleteAliasByPrimaryWord(primaryWord).pipe(
          map(() => AliasAPIActions.deleteAliasSuccess({ primaryWord })),
          catchError((error) =>
            of(AliasAPIActions.deleteAliasFailure({ error }))
          )
        )
      )
    )
  );

  addAlias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.addAliasToPrimaryWord),
      exhaustMap(({ primaryWord, alias }) =>
        this.service.addAliasToPrimaryWord(primaryWord, { alias }).pipe(
          map(() =>
            AliasAPIActions.addAliasToPrimaryWordSuccess({ primaryWord })
          ),
          catchError((error) =>
            of(AliasAPIActions.addAliasToPrimaryWordFailure({ error }))
          )
        )
      )
    )
  );

  removeAlias$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.removeAliasFromPrimaryWord),
      exhaustMap(({ primaryWord, alias }) =>
        this.service.removeAliasFromPrimaryWord(primaryWord, alias).pipe(
          map(() =>
            AliasAPIActions.removeAliasFromPrimaryWordSuccess({
              primaryWord,
              alias,
            })
          ),
          catchError((error) =>
            of(AliasAPIActions.removeAliasFromPrimaryWordFailure({ error }))
          )
        )
      )
    )
  );

  updateAliasForPrimaryWord$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AliasActions.updateAliasForPrimaryWord),
      exhaustMap(({ primaryWord, oldAlias, newAlias }) =>
        this.service
          .updateAliasForPrimaryWord(primaryWord, { oldAlias, newAlias })
          .pipe(
            map(() =>
              AliasAPIActions.updateAliasForPrimaryWordSuccess({ primaryWord })
            ),
            catchError((error) =>
              of(AliasAPIActions.updateAliasForPrimaryWordFailure({ error }))
            )
          )
      )
    )
  );
}
