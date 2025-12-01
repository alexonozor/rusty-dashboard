import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./users').then((m) => m.Users),
        children: [
            {
               path: 'list',
               loadComponent: () =>
                   import('./list-users/list-users').then((m) => m.ListUsers), 
            },
            {
                path: ':id/profile',
                loadComponent: () =>
                    import('./user-details/user-details').then((m) => m.UserDetails),
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
        ]
    },
];