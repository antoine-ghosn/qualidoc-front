import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SettingActions, SettingAPIActions } from './settings.action';
import { DefaultService, Setting } from '../../open-api/generated';
import { EMPTY } from 'rxjs';

@Injectable()
export class SettingEffects {
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  createSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.addSetting),
      exhaustMap(({ setting }) =>
        this.service.createSetting(setting).pipe(
          map(() => SettingAPIActions.addSettingSuccess()),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  updateSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.updateSetting),
      exhaustMap(({ id, setting }) =>
        this.service.updateSetting(id, setting).pipe(
          map(() => SettingAPIActions.updateSettingSuccess()),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  deleteSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.deleteSetting),
      exhaustMap(({ id }) =>
        this.service.deleteSetting(id).pipe(
          map(() => SettingAPIActions.deleteSettingSuccess()),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  loadSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        SettingActions.listSetting,
        SettingAPIActions.deleteSettingSuccess,
        SettingAPIActions.updateSettingSuccess,
        SettingAPIActions.addSettingSuccess
      ),
      exhaustMap(() =>
        this.service.listSettings().pipe(
          map((settings) => SettingAPIActions.listSettingSuccess({ settings })),
          catchError((error) => EMPTY)
        )
      )
    );
  });
}
