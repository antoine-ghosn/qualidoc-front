import { createActionGroup, props } from '@ngrx/store';

export const ToastrActions = createActionGroup({
  source: 'Toastr',
  events: {
    notify: props<{ title: string; status: string; message: string }>(),
  },
});
