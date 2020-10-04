import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

export const toDate = (value: Date | firebase.firestore.Timestamp): Date => {
  if (!value) {
    return null;
  }
  return value instanceof firestore.Timestamp ? value.toDate() : value;
};

export const snapDate = <T = any>(column: string) => {
  return (payload: T): T => {
    return ({ ...payload, [column]: toDate(payload[column]) });
  };
};

export function docToDate<T = any>(column: string | string[]): (doc: T) => T {
  return (doc: T): T => {
    Array.isArray(column)
      ? column.map(c => doc[c] = toDate(doc[c]))
      : doc[column] = toDate(doc[column]);
    return doc;
  };
}

export function mapToDate<T = any>(column: string | string[]): (src: Observable<T>) => Observable<T> {
  return (src: Observable<T>) =>
    src.pipe(map(docToDate(column)));
}

