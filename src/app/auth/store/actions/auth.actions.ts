import { User } from './../../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  '[Auth] Login Action', 
  props<{email: string, password: string}>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login Action Success',
  props<{ user: User }>() 
);
