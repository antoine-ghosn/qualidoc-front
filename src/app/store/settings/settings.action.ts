import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Setting } from '../../open-api/generated';

export const SettingActions = createActionGroup({
  source: 'Setting',
  events: {
    Opened: emptyProps(),
    'List Setting': emptyProps(),
    'Add Setting': props<{ setting: Setting }>(),
    'Update Setting': props<{ id: number; setting: Setting }>(),
    'Delete Setting': props<{ id: number }>(),
  },
});

export const SettingAPIActions = createActionGroup({
  source: 'Setting',
  events: {
    Opened: emptyProps(),
    'List Setting Success': props<{ settings: Array<Setting> }>(),
    'List Setting Fail': props<{ error: any }>(),
    'Add Setting Success': emptyProps(),
    'Add Setting Fail': props<{ error: any }>(),
    'Update Setting Success': emptyProps(),
    'Update Setting Fail': props<{ error: any }>(),
    'Delete Setting Success': emptyProps(),
    'Delete Setting Fail': props<{ error: any }>(),
  },
});
