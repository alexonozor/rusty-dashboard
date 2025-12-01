import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface Task {
  id: number;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface FileItem {
  id: number;
  name: string;
  fileCount: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-user-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatListModule,
    NgxChartsModule,
  ],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  readonly user = signal({
    name: 'Sarah Johnson',
    role: 'Product Manager',
    email: 'sarah.johnson@company.com',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff&size=150',
    skills: ['UI/UX', 'Product', 'Design', 'Strategy', 'Leadership'],
    bio: 'Experienced product manager with a passion for user-centered design and innovative solutions.',
    status: 'active',
  });

  readonly stats = signal({
    posts: 194,
    projects: 554,
    followers: '12.8k',
    following: '1.1k',
  });

  readonly projectsData = signal([
    { name: 'New', value: 45, color: '#3b82f6' },
    { name: 'In Progress', value: 65, color: '#f59e0b' },
    { name: 'Completed', value: 8, color: '#10b981' },
    { name: 'Canceled', value: 3, color: '#ef4444' },
  ]);

  readonly files = signal<FileItem[]>([
    { id: 1, name: 'UX', fileCount: 178, icon: 'folder', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
    { id: 2, name: 'Design', fileCount: 154, icon: 'folder', color: 'bg-red-100 dark:bg-red-900/30 text-red-600' },
    { id: 3, name: 'Mobile', fileCount: 98, icon: 'folder', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
    { id: 4, name: 'Illustration', fileCount: 154, icon: 'folder', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
  ]);

  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Call conference with a New Client', time: '10:21', priority: 'high', completed: false },
    { id: 2, title: 'Presentation Demo Ecological Project', time: '11:30', priority: 'medium', completed: false },
    { id: 3, title: 'Call with PR Manager', time: '12:30', priority: 'medium', completed: false },
    { id: 4, title: 'Interview with a new UI/UX', time: '14:00', priority: 'low', completed: false },
  ]);

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-amber-600 dark:text-amber-400';
      case 'low':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return '';
    }
  }
}
