import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginAction, logoutAction } from './../store/actions/auth.actions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    private store: Store,
    private router: Router,
    private fb: FormBuilder
  ) {}

  public loginFormGroup: FormGroup;
  public hide = true;

  ngOnInit(): void {
    this.auth.user
      .pipe(
        take(1),
        filter((user) => !!user)
      )
      .subscribe(() => this.router.navigate(['events']));

    this.loginFormGroup = this.fb.group({
      email: 'gustavo.costa.w@gmail.com',
      password: '123456',
    });
  }

  public login(email: string, password: string): void {
    this.store.dispatch(loginAction({ email, password }));
  }
  public logout(): void {
    this.store.dispatch(logoutAction());
  }
}
