import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { ChatDialogComponent } from './chat-dialog/chat-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatToolbar,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly isMobile = signal<boolean>(false);
  readonly sidenavOpened = signal<boolean>(true);
  readonly currentUser = signal({ 
    name: 'Alex Onozor',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Onozor&background=6366f1&color=fff'
  });
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private drawer = viewChild<MatDrawer>('drawer');
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly setupMobileDetection = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      tap((result) => {
        this.isMobile.set(result.matches);
        // On desktop, keep sidebar open by default
        if (!result.matches) {
          this.sidenavOpened.set(true);
        } else {
          // On mobile, keep sidebar closed by default
          this.sidenavOpened.set(false);
        }
      })
    ),
    { initialValue: null }
  );

  public navigateAndClose(route: string): void {
    this.router.navigate([route]);
    // Only close sidenav on mobile
    if (this.isMobile() && this.drawer()) {
      this.drawer()!.toggle();
    }
  }

  public logout(): void {
    // TODO: Implement actual logout logic (clear auth token, etc)
    this.router.navigate(['/auth/login']);
  }

  public openChat(): void {
    this.dialog.open(ChatDialogComponent, {
      width: '100%',
      maxWidth: '500px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      panelClass: 'chat-dialog-panel'
    });
  }
 }
