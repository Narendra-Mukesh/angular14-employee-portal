import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../../shared/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const router = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MaterialModule],
      providers: [{ provide: Router, useValue: router }]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it('should create the login form', () => {
    expect(component).toBeTruthy();
    expect(component.form.valid).toBeTrue();
  });

  it('should authenticate the demo administrator', () => {
    component.login();
    expect(localStorage.getItem('peoplehub.auth')).toBe('true');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
