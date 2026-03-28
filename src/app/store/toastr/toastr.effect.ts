import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { ToastrActions } from './toastr.action';
import { filter, map, tap } from 'rxjs';

@Injectable()
export class Toastrffects {
  private actions$ = inject(Actions);
  private toastrService = inject(ToastrService);

  successNotify$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastrActions.notify),
        filter(({ status }) => status === 'success'),
        map(({ message, title }) => {
          const cleanTitle = title?.includes(']')
            ? title.split(']').pop()?.trim() ?? title
            : title;
          return { title: cleanTitle, message };
        }),
        tap(({ message, title }) =>
          this.toastrService.success(message, title, { timeOut: 3000 })
        )
      );
    },
    { dispatch: false }
  );

  errorNotify$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ToastrActions.notify),
        filter(({ status }) => status === 'error'),
        map(({ message, title }) => {
          const cleanTitle = title?.includes(']')
            ? title.split(']').pop()?.trim() ?? title
            : title;
          return { title: cleanTitle, message };
        }),
        tap(({ message, title }) =>
          this.toastrService.error(message, title, { timeOut: 3000 })
        )
      );
    },
    { dispatch: false }
  );
}
