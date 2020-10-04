import { FirebasePath } from '../types/firebase-path';

export function normalizePath(path: FirebasePath): string {
  return Array.isArray(path) ? path.join('/') : path;
}
