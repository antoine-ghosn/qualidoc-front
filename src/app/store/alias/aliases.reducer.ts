import { createFeature, createReducer, on } from '@ngrx/store';
 import { AliasActions, AliasAPIActions } from './aliases.action';
import { Alias } from '../../open-api/generated';

type AliasesState = {
  aliases: Alias[];
  isLoading: boolean;
};

const initialState: AliasesState = {
  aliases: [],
  isLoading: false,
};

export const aliasesFeature = createFeature({
  name: 'aliases',
  reducer: createReducer(
    initialState,

    on(AliasActions.loadAliases, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(AliasAPIActions.loadAliasesSuccess, (state, { aliases }) => ({
      ...state,
      aliases,
      isLoading: false,
    })),
    on(AliasAPIActions.loadAliasesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),

    on(AliasAPIActions.createAliasSuccess, (state, { alias }) => ({
      ...state,
      aliases: [...state.aliases, alias],
    })),

    on(AliasAPIActions.updateAliasSuccess, (state, { alias }) => ({
      ...state,
      aliases: state.aliases.map((a) =>
        a.primaryWord === alias.primaryWord ? alias : a
      ),
    })),

    on(AliasAPIActions.deleteAliasSuccess, (state, { primaryWord }) => ({
      ...state,
      aliases: state.aliases.filter((a) => a.primaryWord !== primaryWord),
    })),

    on(
      AliasAPIActions.addAliasToPrimaryWordSuccess,
      (state, { primaryWord }) => ({
        ...state,
        isLoading: false,
      })
    ),

    on(
      AliasAPIActions.removeAliasFromPrimaryWordSuccess,
      (state, { primaryWord, alias }) => ({
        ...state,
        aliases: state.aliases.map((a) =>
          a.primaryWord === primaryWord
            ? { ...a, aliases: a.aliases.filter((al) => al !== alias) }
            : a
        ),
      })
    ),

    on(
      AliasAPIActions.updateAliasForPrimaryWordSuccess,
      (state, { primaryWord }) => ({
        ...state,
        isLoading: false,
      })
    )
  ),
});

export const {
  name,
  reducer,
  selectAliasesState,
  selectIsLoading,
  selectAliases,
} = aliasesFeature;
