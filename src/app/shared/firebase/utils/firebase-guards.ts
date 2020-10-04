import { hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

export const allowOnly = (role: string) => hasCustomClaim(role);
export const ifNotAuth = (route = ['login']) => redirectUnauthorizedTo(route);
export const afterAuth = (route = ['/']) => redirectLoggedInTo(route);
export const allowAccount = (next) => hasCustomClaim(`account-${next.params.id}`);
