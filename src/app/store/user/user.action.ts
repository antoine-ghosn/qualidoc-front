import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DocumentType, User } from '../../open-api/generated';

export const UserActions = createActionGroup({
  source: 'user',
  events: {
    Opened: emptyProps(),
    'Get profile': emptyProps(),
  },
});

export const UserAPIActions = createActionGroup({
  source: 'user API',
  events: {
    'Load User Profile Success': props<{ user: User }>(),
    'Load User Profile Fail': props<{ error: any }>(),
  },
});
