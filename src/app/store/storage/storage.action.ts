import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StorageActions = createActionGroup({
  source: 'storage',
  events: {
    'Load Storage': emptyProps(),
  },
});

export const StorageAPIActions = createActionGroup({
  source: 'storage API',
  events: {
    'Load Storage Success': props<{ data: any }>(),
    'Load Storage Fail': props<{ error: any }>(),
  },
});
