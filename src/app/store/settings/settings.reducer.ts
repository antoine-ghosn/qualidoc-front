import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingActions, SettingAPIActions } from './settings.action';
import { Setting } from '../../open-api/generated';

type SettingsState = {
  settings: Setting[];
  isLoading: boolean;
};

const initialState: SettingsState = {
  settings: [],
  isLoading: false,
};

export const settingsFeature = createFeature({
  name: 'settings',
  reducer: createReducer(
    initialState,

    on(SettingAPIActions.listSettingSuccess, (state, { settings }) => ({
      ...state,
      settings,
    }))
  ),
});

export const { name, reducer, selectSettings } = settingsFeature;
