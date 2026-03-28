import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  AddAliasToPrimaryWordRequest,
  Alias,
  UpdateAliasForPrimaryWordRequest,
} from '../../open-api/generated';

export const AliasActions = createActionGroup({
  source: 'Alias',
  events: {
    Opened: emptyProps(),

    'Create Alias': props<{ alias: Alias }>(),
    'Update Alias': props<{ alias: Alias }>(),
    'Delete Alias By Primary Word': props<{ primaryWord: string }>(),

    'Add Alias To Primary Word': props<{
      primaryWord: string;
      alias: string;
    }>(),
    'Remove Alias From Primary Word': props<{
      primaryWord: string;
      alias: string;
    }>(),
    'Update Alias For Primary Word': props<{
      primaryWord: string;
      oldAlias: string;
      newAlias: string;
    }>(),

    'Load Aliases': emptyProps(),
  },
});

export const AliasAPIActions = createActionGroup({
  source: 'Alias API',
  events: {
    'Load Aliases Success': props<{ aliases: Alias[] }>(),
    'Load Aliases Failure': props<{ error: string }>(),

    'Create Alias Success': props<{ alias: Alias }>(),
    'Create Alias Failure': props<{ error: string }>(),

    'Update Alias Success': props<{ alias: Alias }>(),
    'Update Alias Failure': props<{ error: string }>(),

    'Delete Alias Success': props<{ primaryWord: string }>(),
    'Delete Alias Failure': props<{ error: string }>(),

    'Add Alias To Primary Word Success': props<{ primaryWord: string }>(),
    'Add Alias To Primary Word Failure': props<{ error: string }>(),

    'Remove Alias From Primary Word Success': props<{
      primaryWord: string;
      alias: string;
    }>(),
    'Remove Alias From Primary Word Failure': props<{ error: string }>(),

    'Update Alias For Primary Word Success': props<{ primaryWord: string }>(),
    'Update Alias For Primary Word Failure': props<{ error: string }>(),
  },
});
