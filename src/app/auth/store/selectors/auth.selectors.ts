import { AuthState } from '../reducers/auth.reducer';
import { AppState } from './../../../app.state';

export const selectCurrentUser = (state: AppState): AuthState => state.auth;