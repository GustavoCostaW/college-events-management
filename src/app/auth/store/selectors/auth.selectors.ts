import { AuthState } from '../reducers/auth.reducer';
import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';

export const selectCurrentUser = (state: AppState): AuthState => state.auth;