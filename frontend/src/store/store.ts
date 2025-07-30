import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { authReducer } from './auth/reducer';
import type { AuthActionTypes } from './auth/types';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AuthActionTypes>;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
