import { DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const snapLoad = ({ payload }) => ({ ...payload.data(), id: payload.id });


export const snapPayload = <T>(idField: string = 'id') => {
  return ({ payload }: DocumentChangeAction<T>) => {
    return { ...payload.doc.data(), [idField]: payload.doc.id };
  };
};

type ReturnMapSnapload<T> = (src: Observable<DocumentChangeAction<T>[]>) => Observable<(T & any)>;

export function mapSnapLoad<T = any>(idField: string = 'id'): ReturnMapSnapload<T> {

  return (src: Observable<DocumentChangeAction<T>[]>) =>
    src.pipe(
      map(actions => actions.map(snapPayload(idField)))
    );
}
