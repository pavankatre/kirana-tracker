import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // --- PUBLIC ROUTES ---
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent),
    title: 'Kirana - Login' 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
    title: 'Kirana - Register' 
  },

  // --- PROTECTED ROUTES (Require Login) ---
  { 
    path: '', 
    canActivate: [authGuard], // Protects the dashboard
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    title: 'Kirana - Dashboard'
  },
  { 
    path: 'inventory', 
    canActivate: [authGuard], 
    loadComponent: () => import('./features/inventory/inventory').then(m => m.Inventory),
    title: 'Kirana - Inventory'
  },
  { 
    path: 'shopping-list', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/purchase-list/purchase-list').then(m => m.PurchaseList),
    title: 'Kirana - Shopping List'
  },
  { 
    path: 'add-item', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/add-inventory-item/add-inventory-item').then(m => m.AddInventoryItem),
    title: 'Kirana - Add Item'
  },

  // --- WILDCARD ---
  { 
    path: '**', 
    redirectTo: '', // Redirects to Dashboard (which will trigger authGuard if not logged in)
    pathMatch: 'full' 
  }
];