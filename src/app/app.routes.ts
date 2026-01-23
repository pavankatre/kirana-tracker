import { Routes } from '@angular/router';
import { Dashboard } from '../app/features/dashboard/dashboard';
import { Inventory } from './features/inventory/inventory';
import { PurchaseList } from './features/purchase-list/purchase-list';

export const routes: Routes = [

    { path: '', component: Dashboard }, // Default page
    { path: 'inventory', component: Inventory},
    { path: 'shopping-list' , component : PurchaseList },
  { path: '**', redirectTo: '' }
];
