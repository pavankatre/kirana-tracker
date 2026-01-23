import { Routes } from '@angular/router';
import { Dashboard } from '../app/features/dashboard/dashboard';
import { Inventory } from './features/inventory/inventory';

export const routes: Routes = [

    { path: '', component: Dashboard }, // Default page
    { path: 'inventory', component: Inventory},
  { path: '**', redirectTo: '' }
];
