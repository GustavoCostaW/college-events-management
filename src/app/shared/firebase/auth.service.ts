import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

type AuthProviderName = 'google' | 'github';

@Injectable()
export class AuthService {
  auth$: Observable<firebase.User>;
  currentUser: Promise<firebase.User>;

  constructor(private afa: AngularFireAuth) {
    this.auth$ = this.afa.authState;
    this.currentUser = this.afa.currentUser;
  }

  createWithEmail(email: string, password: string): Promise<auth.UserCredential> {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }

  createWithProvider(provider: AuthProviderName): Promise<auth.UserCredential> {
    if (!['google', 'github'].includes(provider)) {
      throw new Error(`${provider} is not a provider`);
    }
    return this.afa.signInWithPopup(
      this.getProviderByName(provider)
    );
  }

  getProviderByName(providerName: AuthProviderName): auth.AuthProvider {
    switch (providerName) {
      case 'github': return this.githubAuthProvider();
      case 'google': return this.googleAuthProvider();
    }
  }

  googleAuthProvider(): auth.GoogleAuthProvider {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: 'seu-email@gmail.com',
    });
    provider.addScope('email');
    provider.addScope('profile');
    return provider;
  }

  githubAuthProvider(): auth.GithubAuthProvider {
    const provider = new auth.GithubAuthProvider();
    provider.addScope('user');
    provider.addScope('repo');
    return provider;
  }
}
