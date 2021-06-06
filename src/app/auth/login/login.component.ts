import { Store } from '@ngrx/store';
import { loginAction, logoutAction } from './../store/actions/auth.actions';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.auth.user.pipe(take(1), filter(user => !!user))
    .subscribe(user => this.router.navigate(['events']))
  }

  public login(email: string, password: string): void {
    this.store.dispatch(loginAction({email, password}));
  }
  public logout(): void {
    this.store.dispatch(logoutAction());
  }
}
