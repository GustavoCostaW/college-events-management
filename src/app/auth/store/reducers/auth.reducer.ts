import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  email: string;
  id: string;
  auth: boolean;
  role?: string;
  loading?: boolean;
  loaded?: boolean;
  error?: string;
}

const initialState: AuthState = {
  id: undefined,
  email: undefined,
  role: undefined,
  auth: false,
  loaded: false,
  loading: false,
  error: undefined
};

const authReducerFactory = createReducer(
  initialState,
  on(AuthActions.loginAction, (state) => {
    return {
      ...initialState,
      loading: true,
    };
  }),
  on(AuthActions.loginSuccessAction, (state, user) => {
    return {
      ...user,
      auth: true,
      loading: false,
      loaded: true,
      error: undefined,
    };
  }),
  on(AuthActions.logoutAction, () => {
    return {
      ...initialState
    };
  }),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerFactory(state, action);
}
