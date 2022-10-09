import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { Observable, Subscription, timer } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationRepository } from 'src/app/@domain/repository/repository/authentication.repository';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  nombreEmpresa = 'Pillihuman Corporation app';
  estado: boolean = true;
  cantidadUsuario: number = 3;
  everySecond$: Observable<number> = timer(0, 100);
  appName: string = 'Gamachicas.com';
  logging: boolean = false;
  loginForm: FormGroup = this.formBuilder.group({
    user: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(15)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(30)],
    ],
  });
  hasError: boolean | undefined;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  returnUrl: string = '/home';

  constructor(
    private sidebarService: NbSidebarService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationRepository,
    private router: Router
  ) {}
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {}

  submit() {
    try {
      this.hasError = false;
      const loginSubscr = this.authService
        .login(this.f['user'].value, this.f['password'].value)
        .pipe(first())
        .subscribe((user: any | undefined) => {
          if (user) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        });

      this.unsubscribe.push(loginSubscr);
    } catch (e) {
      throw e;
    } finally {
    }
  }
}
