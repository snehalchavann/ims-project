import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    {
        path: 'admin',
        loadChildren: () => import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule)
    },
    {
        path: 'user',
        loadChildren: () => import('./user/user-routing.module').then((m) => m.UserRoutingModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
