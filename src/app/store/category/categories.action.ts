import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DocumentCategory } from '../../models/Category';

export const categoryActions = createActionGroup({
  source: 'category',
  events: {
    Opened: emptyProps(),
    'select category': props<{ category: DocumentCategory }>(),
  },
});
