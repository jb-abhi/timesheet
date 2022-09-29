import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  //LOGIN
  loginFormGroup: FormGroup;
  isLoginSubmitted = false;
  authError = false;
  authMessage = '*Email or password is incorrect, Please try again';

  //SIGNUP
  signupFormGroup: FormGroup;
  isSubmitted = false;
  authsignMessage = '';
  authsignError = false;

  @ViewChild('form') form: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LocalstorageService: LocalstorageService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
    this._initSignupForm();
  }

  //LOGIN

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onLogin() {
    if (this.loginFormGroup.invalid) return;

    this.isLoginSubmitted = true;

    const loginData = {
      email: this.loginForm?.['email'].value,
      password: this.loginForm?.['password'].value,
    };
    this.auth.login(loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        this.LocalstorageService.setToken(user.token);
        if (user.isAdmin) {
          this.router.navigate(['/admin/home']);
        } else {
          this.router.navigate(['/dashboard/home']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, Please try again later';
        }
      }
    );
  }

  //SIGNUP

  private _initSignupForm() {
    this.signupFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get signupForm() {
    return this.signupFormGroup.controls;
  }

  onSignup() {
    if (this.signupFormGroup.invalid) return;
    this.isSubmitted = true;

    const signupData = {
      name: this.signupForm?.['name'].value,
      email: this.signupForm?.['email'].value,
      password: this.signupForm?.['password'].value,
    };

    this.auth
      .signup(signupData.name, signupData.email, signupData.password)
      .subscribe(
        (user) => {
          this.authsignError = false;
          this.signupFormGroup.reset();
          this.form.resetForm();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.authsignError = true;

          if (error.status === 400) {
            this.authsignMessage =
              'Error in the server, Please try again later';
          } else if (error.status === 500) {
            this.authsignMessage =
              'This mail id is already registered. Log in instead';
          } else {
            this.authsignMessage = 'Unexpected error occured, Please try again';
          }
        }
      );
  }
}
