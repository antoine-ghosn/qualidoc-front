import { ActionReducer, MetaReducer } from '@ngrx/store';

function log(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const currentState = reducer(state, action);

    console.log('Action', action);
    console.log('Previous State', state);
    console.log('Current State', currentState);
    console.log('############################################');

    return currentState;
  };
}

export const metaReducers: MetaReducer[] = [log];
