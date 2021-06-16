import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {}

  public login(
    email: string,
    password: string
  ): Observable<User> {
    return from(this.auth.signInWithEmailAndPassword(email, password))
    .pipe(
      map(auth => {
        return { email: auth.user.email, id: auth.user.uid }
      })
    )
  }

  public logout(): Observable<any> {
    return from(this.auth.signOut())
  }

  public findUserById(id: string): Observable<User> {
    return this.afs
    .doc<any>(`users/${id}`)
    .valueChanges()
    .pipe(
      take(1),
      map((user) => {
        return {
          id,
          ...user,
        };
      })
    );
  }

  public isCoordenator = (user) => user.role === 'coordenator';
  public isAdmin = (user) => user.role === 'admin';
}



