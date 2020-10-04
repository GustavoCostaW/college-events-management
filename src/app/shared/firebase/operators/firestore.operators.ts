import { CollectionReference } from '@angular/fire/firestore';

export const isColl = (path: string) => {
  return path.split('/').filter(v => v).length % 2;
};

export const orderBy = (prop: string | firebase.firestore.FieldPath, order: firebase.firestore.OrderByDirection = 'desc') => {
  return (ref: CollectionReference) => ref.orderBy(prop, order);
};

export const byId = (id: string) => {
  return (ref: CollectionReference) => ref.where('id', '==', id);
};

export const addColumn = <T = any>(prop: string) => {
  const shift = prop.split('.').pop();
  return (payload: T): T => {

    const column = prop.split('.')
      .reduce((p, c) => payload[p][c]);

    return ({ ...payload, [shift]: column });
  };
};
