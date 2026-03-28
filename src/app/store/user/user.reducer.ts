import { createFeature, createReducer, on } from '@ngrx/store';
import { UserAPIActions } from './user.action';
import { DocumentType, User } from '../../open-api/generated';

type UserProfileState = {
  user: User | undefined;
};

const initialState: UserProfileState = {
  user: undefined,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserAPIActions.loadUserProfileSuccess, (state, { user }) => ({
      ...state,
      user,
    }))
  ),
});

export const { name, reducer, selectUser } = userFeature;
