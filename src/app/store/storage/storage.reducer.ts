import { createFeature, createReducer, on } from '@ngrx/store';
import { StorageAPIActions } from './storage.action';
import { FolderInfo } from '../../open-api/generated';

type StorageState = {
  folders: FolderInfo[];
};

const initialState: StorageState = {
  folders: [],
};


export const storageFeature = createFeature({
  name: 'storage',
  reducer: createReducer(
    initialState,
    on(StorageAPIActions.loadStorageSuccess, (state, { data }) => ({
      ...state,
      folders: data.folders,
    }))
  ),
});

export const { name, reducer,selectFolders } = storageFeature;
