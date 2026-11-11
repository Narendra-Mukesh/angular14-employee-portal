import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  template: `
    <mat-toolbar color="primary">
      <span class="brand">PeopleHub</span>
      <span class="toolbar-spacer"></span>
      <span class="user-label">Administrator</span>
      <button mat-button (click)="logout()">LOG OUT</button>
    </mat-toolbar>
    <mat-sidenav-container class="layout">
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="selected"><mat-icon>dashboard</mat-icon> Dashboard</a>
          <a mat-list-item routerLink="/employees" routerLinkActive="selected"><mat-icon>people</mat-icon> Employees</a>
          <a mat-list-item routerLink="/departments" routerLinkActive="selected"><mat-icon>business</mat-icon> Departments</a>
          <a mat-list-item routerLink="/leaves" routerLinkActive="selected"><mat-icon>event_note</mat-icon> Leave requests</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content><router-outlet></router-outlet></mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .brand { font-weight: 700; letter-spacing: .3px; }
    .user-label { font-size: 13px; margin-right: 12px; }
    .layout { height: calc(100vh - 64px); }
    mat-sidenav { width: 230px; background: #fff; border-right: 1px solid #e2e8f0; }
    mat-nav-list a { display: flex; gap: 12px; color: #52606d; }
    mat-nav-list mat-icon { margin-right: 8px; }
    .selected { background: #edf2f7; color: #243b53 !important; font-weight: 600; }
    @media (max-width: 700px) { mat-sidenav { width: 175px; } }
  `]
})
export class ShellComponent {
  constructor(private router: Router) {}
  logout(): void {
    localStorage.removeItem('peoplehub.auth');
    localStorage.removeItem('peoplehub.token');
    this.router.navigate(['/login']);
  }
}
