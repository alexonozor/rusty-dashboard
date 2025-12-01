import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard').then((m) => m.Dashboard),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./home/home').then((m) => m.Home),
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.routes').then((m) => m.USER_ROUTES),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            }
        ], 
    }
];
