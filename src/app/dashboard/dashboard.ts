import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

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
    RouterModule,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  readonly isMobile = signal<boolean>(false);
  readonly sidenavOpened = signal<boolean>(true);
  private router = inject(Router);
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
 }
