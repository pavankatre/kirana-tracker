// import { Injectable, signal, computed, inject } from '@angular/core';
// import { KiranaItem } from '../../models/kirana-item';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment.development';
// import { HttpClient } from '@angular/common/http';

// @Injectable({ providedIn: 'root' })
// export class InventoryService {

//   http = inject(HttpClient);
//   private itemsSignal = signal<KiranaItem[]>([
//     // Adding sample data so you can see it on screen immediately
//   { 
//     id: '1', 
//     name: 'Lux Soap', 
//     category: 'Personal Care', 
//     stockCount: 5, 
//     minThreshold: 1,
//     lastUpdated: new Date() 
//   },
//   { 
//     id: '2', 
//     name: 'Sugar', 
//     category: 'Groceries', 
//     stockCount: 1, // Will show as Low Stock
//     minThreshold: 1,
//     lastUpdated: new Date() 
//   },
//   { 
//     id: '3', 
//     name: 'Amul Milk (1L)', 
//     category: 'Dairy', 
//     stockCount: 10, 
//     minThreshold: 3,
//     lastUpdated: new Date() 
//   },
//   { 
//     id: '4', 
//     name: 'Basmati Rice (5kg)', 
//     category: 'Grains', 
//     stockCount: 2, // Will show as Low Stock
//     minThreshold: 3,
//     lastUpdated: new Date() 
//   },
//   { 
//     id: '5', 
//     name: 'Tata Salt', 
//     category: 'Groceries', 
//     stockCount: 8, 
//     minThreshold: 1,
//     lastUpdated: new Date() 
//   },
//   { 
//     id: '6', 
//     name: 'Dishwash Liquid', 
//     category: 'Household', 
//     stockCount: 0, // Out of Stock!
//     minThreshold: 1,
//     lastUpdated: new Date() 
//   }
//   ]);

//   items = this.itemsSignal.asReadonly();

//   lowStockItems = computed(() => 
//     this.items().filter(item => item.stockCount <= item.minThreshold)
//   );


//   consumeItem(id: string) {
//   this.itemsSignal.update(items => 
//     items.map(item => 
//       item.id === id 
//         ? { ...item, stockCount: Math.max(0, item.stockCount - 1), lastUpdated: new Date() } 
//         : item
//     )
//   );
// }

// addStock(id: string) {
//   this.itemsSignal.update(items => 
//     items.map(item => 
//       item.id === id 
//         ? { ...item, stockCount: item.stockCount + 1, lastUpdated: new Date() } // Added timestamp
//         : item
//     )
//   );
// }

// // Use this if you want the form to ADD to current stock
// updateStock(id: string, addedQuantity: number) {
//   this.itemsSignal.update(items =>
//     items.map(item =>
//       item.id === id 
//         ? { 
//             ...item, 
//             // We take the existing stock and ADD the new amount
//             stockCount: Number(item.stockCount) + Number(addedQuantity), 
//             lastUpdated: new Date() 
//           } 
//         : item
//     )
//   );
// }

// // addItem(item: KiranaItem) {
// //   this.itemsSignal.update(currentItems => [...currentItems, item]);
// // }

// // addItem(newItem: Omit<KiranaItem, 'id' | 'lastUpdated'>) {
// //   this.itemsSignal.update(items => [
// //     ...items,
// //     {
// //       ...newItem,
// //       id: Date.now().toString(), // Simple unique ID generator
// //       lastUpdated: new Date()
// //     }
// //   ]);
// // }



// addItem(item: any): Observable<any> {
//   return this.http.post(`${environment.apiUrl}/products/add`, item);
// }


// }



import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { KiranaItem } from '../../models/kirana-item';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/products`;

  // 1. Private Signal to hold the real data from DB
  private itemsSignal = signal<KiranaItem[]>([]);

  // 2. Public Readonly Signal for components
  items = this.itemsSignal.asReadonly();

  // 3. Derived Signal for Low Stock (Computed logic stays the same)
  lowStockItems = computed(() =>
    this.items().filter(item => item.stockCount <= item.minThreshold)
  );

  /**
   * FETCH ALL: Gets data from MongoDB and updates the Signal
   */
  getInventory(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/all`).pipe(
      tap(response => {
        // Update the signal with the actual data from backend
        this.itemsSignal.set(response.data || []);
      })
    );
  }

  /**
   * ADD ITEM: Post to backend and then refresh the local signal
   */
  addItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/add`, item).pipe(
      tap((response) => {
        // Standard approach: add the new item returned by DB to our signal
        if (response.data) {
          this.itemsSignal.update(items => [response.data, ...items]);
        }
      })
    );
  }

  /**
   * UPDATE STOCK: For Add/Consume buttons
   * Note: In a real app, you should make a PATCH request to the DB here
   */
  // updateStock(id: string, newQuantity: number): Observable<any> {
  //   console.log(`Updating stock for ID: ${id} to new quantity: ${newQuantity}`);
  //   // API call to persist the change
  //   return this.http.patch(`${this.API_URL}/update-stock/${id}`, { stockCount: newQuantity }).pipe(
  //     tap(() => {
  //       // Sync the local signal so the UI updates immediately
  //       this.itemsSignal.update(items =>
  //         items.map(item =>
  //           item.id === id ? { ...item, stockCount: newQuantity, lastUpdated: new Date() } : item
  //         )
  //       );
  //     })
  //   );
  // }

  // src/app/core/services/inventory.service.ts

// src/app/core/services/inventory.ts

updateStock(id: string, newStock: number) {
  return this.http.patch<any>(`${this.API_URL}/update-stock/${id}`, { stockCount: newStock })
    .pipe(
      tap((response) => {
        const updatedProduct = response.data;

        // FIX: Use itemsSignal (the writable one) instead of items (the readonly one)
        this.itemsSignal.update((currentItems: KiranaItem[]) => 
          currentItems.map((item: KiranaItem) => 
            (item._id === id) ? updatedProduct : item
          )
        );
      })
    );
}


deleteItem(id: string) {
  return this.http.delete<any>(`${this.API_URL}/delete-item/${id}`)
    .pipe(
      tap(() => {
        // Remove the item from the local signal so the UI updates instantly
        this.itemsSignal.update((currentItems: KiranaItem[]) => 
          currentItems.filter((item: KiranaItem) => item._id !== id)
        );
      })
    );
}
}