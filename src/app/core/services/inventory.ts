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
    lastUpdated: new Date() // <--- Add this line
  },
  { 
    id: '2', 
    name: 'Sugar', 
    category: 'Groceries', 
    stockCount: 1, 
    minThreshold: 1,
    lastUpdated: new Date() // <--- Add this line
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
}