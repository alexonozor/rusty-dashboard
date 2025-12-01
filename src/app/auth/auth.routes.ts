import { Routes } from '@angular/router';
import { Auth } from './auth';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth').then((m) => m.Auth),
        children: [
            {
               path: 'login',
               loadComponent: () =>
                   import('./login/login').then((m) => m.Login), 
            },
            {
                path: 'signup',
                loadComponent: () =>
                    import('./signup/signup').then((m) => m.Signup),
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ]
    },
];
