import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
    email: string;
    id: string;
    auth: boolean;
    loading?: boolean;
    loaded?: boolean;
    error?: string;
  }


const initialState: AuthState = {
    id: undefined,
    email: undefined,
    auth: false,
    loaded: false
};

const authReducerFactory = createReducer(
    initialState,
    on(AuthActions.loginAction, (state, ) => {
      return {
          id: undefined,
          email: undefined,
          auth: false,
          loading: true,
          loaded: false,
          error: undefined
      };
  }),
    on(AuthActions.loginSuccessAction, (state, { user }) => {
        return {
            ...user,
            auth: true,
            loading: false,
            loaded: true,
            error: undefined
        };
    }),
  );
  
  export function authReducer(state: AuthState | undefined, action: Action) {
    return authReducerFactory(state, action);
  }