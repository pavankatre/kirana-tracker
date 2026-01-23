 import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    // Optimization: Use lazy loading for the Dashboard
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    title: 'Kirana - Dashboard' // Built-in title support
  },
  { 
    path: 'inventory', 
    loadComponent: () => import('./features/inventory/inventory').then(m => m.Inventory),
    title: 'Kirana - Inventory'
  },
  { 
    path: 'shopping-list', 
    loadComponent: () => import('./features/purchase-list/purchase-list').then(m => m.PurchaseList),
    title: 'Kirana - Shopping List'
  },
  { 
    path: 'add-item', 
    loadComponent: () => import('./features/add-inventory-item/add-inventory-item').then(m => m.AddInventoryItem),
    title: 'Kirana - Add Item'
  },
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];