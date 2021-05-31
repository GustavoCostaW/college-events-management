import { AppState } from './../../../app.state';
import { User } from './../../../models/user.model';

export const selectCurrentUser = (state: AppState): User => state.auth;