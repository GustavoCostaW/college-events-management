import { User } from './../../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  '[Auth] Login Action', 
  props<{email: string, password: string}>()
);

export const loginFromSessionAction = createAction(
  '[Auth] Login From Session Action', 
  props<{email: string, id: string}>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login Action Success',
  props<User>()
);

export const logoutAction = createAction(
  '[Auth] Logout Action'
);

export const logoutActionSuccess = createAction(
  '[Auth] Logout Action Success'
);
