import { Component, signal, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  avatar: string;
}

@Component({
  selector: 'app-list-users',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  templateUrl: './list-users.html',
  styleUrl: './list-users.scss',
})
export class ListUsers {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  private router = inject(Router);
  
  displayedColumns: string[] = ['avatar', 'name', 'email', 'role', 'status', 'joinDate', 'actions'];
  
  private firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Maria', 'William', 'Jessica', 'Richard', 'Jennifer', 'Joseph', 'Amanda'];
  private lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas'];
  private roles = ['Admin', 'Editor', 'Viewer', 'Manager', 'Developer', 'Designer'];
  private statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
  private domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com', 'mail.com'];

  dataSource = new MatTableDataSource<User>(this.generateUsers(50));

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private generateUsers(count: number): User[] {
    const users: User[] = [];
    
    for (let i = 0; i < count; i++) {
      const firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
      const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      const name = `${firstName} ${lastName}`;
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${this.domains[Math.floor(Math.random() * this.domains.length)]}`;
      const role = this.roles[Math.floor(Math.random() * this.roles.length)];
      const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];
      
      // Generate random date in the last year
      const daysAgo = Math.floor(Math.random() * 365);
      const joinDate = new Date();
      joinDate.setDate(joinDate.getDate() - daysAgo);
      
      // Generate avatar URL using initials
      const initials = `${firstName[0]}${lastName[0]}`;
      const avatar = `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=40`;

      users.push({
        id: i + 1,
        name,
        email,
        role,
        status,
        joinDate: joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        avatar,
      });
    }
    
    return users;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'inactive':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'pending':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20';
      default:
        return '';
    }
  }

  onEdit(user: User): void {
    this.router.navigate([`/dashboard/users/${user.id}/profile`]);
  }

  onDelete(user: User): void {
    console.log('Delete user:', user);
  }
}
