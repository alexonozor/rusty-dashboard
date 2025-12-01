import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly userName = signal('User');
  readonly currentTime = signal(new Date().toLocaleTimeString());
  readonly currentDate = signal(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  // Stats for the dashboard
  readonly stats = signal([
    { label: 'Total Projects', value: '12', icon: 'folder', color: 'text-blue-500', progress: 75 },
    { label: 'Active Tasks', value: '8', icon: 'assignment', color: 'text-green-500', progress: 65 },
    { label: 'Completed', value: '24', icon: 'check_circle', color: 'text-emerald-500', progress: 85 },
    { label: 'In Progress', value: '5', icon: 'trending_up', color: 'text-orange-500', progress: 45 },
  ]);

  constructor() {
    // Update time every second
    setInterval(() => {
      this.currentTime.set(new Date().toLocaleTimeString());
    }, 1000);
  }
}
