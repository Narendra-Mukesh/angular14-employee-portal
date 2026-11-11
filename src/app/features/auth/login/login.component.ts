import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-wrap">
      <mat-card class="login-card">
        <h1>PeopleHub</h1>
        <p class="muted">Sign in to your employee workspace</p>
        <form [formGroup]="form" (ngSubmit)="login()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email address</mat-label>
            <input matInput formControlName="email" type="email">
            <mat-error *ngIf="form.controls.email.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="form.controls.email.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error>Password is required</mat-error>
          </mat-form-field>
          <p class="error" *ngIf="error">{{ error }}</p>
          <button mat-raised-button color="primary" class="full-width" type="submit">Sign in</button>
        </form>
        <p class="hint">Demo: admin@example.com / password123</p>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrap { min-height: 100vh; display: grid; place-items: center; padding: 20px; background: linear-gradient(135deg,#e6eef8,#f7fafc); }
    .login-card { width: 100%; max-width: 420px; padding: 28px; }
    h1 { margin: 0; color: #243b53; }
    .error { color: #b00020; font-size: 13px; }
    .hint { margin: 18px 0 0; color: #718096; font-size: 12px; }
  `]
})
export class LoginComponent {
  error = '';
  form = this.fb.group({
    email: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['password123', Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  login(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.getRawValue();
    if (email === 'admin@example.com' && password === 'password123') {
      localStorage.setItem('peoplehub.auth', 'true');
      localStorage.setItem('peoplehub.token', 'demo-token');
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid email or password.';
    }
  }
}
