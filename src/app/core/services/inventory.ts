import { Injectable, signal, computed } from '@angular/core';
import { KiranaItem } from '../../models/kirana-item';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private itemsSignal = signal<KiranaItem[]>([
    // Adding sample data so you can see it on screen immediately
  { 
    id: '1', 
    name: 'Lux Soap', 
    category: 'Personal Care', 
    stockCount: 5, 
    minThreshold: 1,
    lastUpdated: new Date() 
  },
  { 
    id: '2', 
    name: 'Sugar', 
    category: 'Groceries', 
    stockCount: 1, // Will show as Low Stock
    minThreshold: 1,
    lastUpdated: new Date() 
  },
  { 
    id: '3', 
    name: 'Amul Milk (1L)', 
    category: 'Dairy', 
    stockCount: 10, 
    minThreshold: 3,
    lastUpdated: new Date() 
  },
  { 
    id: '4', 
    name: 'Basmati Rice (5kg)', 
    category: 'Grains', 
    stockCount: 2, // Will show as Low Stock
    minThreshold: 3,
    lastUpdated: new Date() 
  },
  { 
    id: '5', 
    name: 'Tata Salt', 
    category: 'Groceries', 
    stockCount: 8, 
    minThreshold: 1,
    lastUpdated: new Date() 
  },
  { 
    id: '6', 
    name: 'Dishwash Liquid', 
    category: 'Household', 
    stockCount: 0, // Out of Stock!
    minThreshold: 1,
    lastUpdated: new Date() 
  }
  ]);

  items = this.itemsSignal.asReadonly();

  lowStockItems = computed(() => 
    this.items().filter(item => item.stockCount <= item.minThreshold)
  );

  // Renamed from useItem to consumeItem to fix your HTML error
 // consumeItem(id: string) {
  //   this.itemsSignal.update(items => 
  //     items.map(item => 
  //       item.id === id ? { ...item, stockCount: Math.max(0, item.stockCount - 1) } : item
  //     )
  //   );
  // }
  consumeItem(id: string) {
  this.itemsSignal.update(items => 
    items.map(item => 
      item.id === id 
        ? { ...item, stockCount: Math.max(0, item.stockCount - 1), lastUpdated: new Date() } 
        : item
    )
  );
}

  // Adding this now so you can use the "+" button later
  addStock(id: string) {
    this.itemsSignal.update(items => 
      items.map(item => 
        item.id === id ? { ...item, stockCount: item.stockCount + 1 } : item
      )
    );
  }


  updateStock(id: string, newQuantity: number) {
  this.itemsSignal.update(items =>
    items.map(item =>
      item.id === id 
        ? { ...item, stockCount: newQuantity, lastUpdated: new Date() } 
        : item
    )
  );
}
}