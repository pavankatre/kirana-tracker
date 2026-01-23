import { Routes } from '@angular/router';
import { Dashboard } from '../app/features/dashboard/dashboard';

export const routes: Routes = [

    { path: '', component: Dashboard }, // Default page
  { path: '**', redirectTo: '' }
];
