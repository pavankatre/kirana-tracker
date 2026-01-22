import { Injectable, signal, computed } from '@angular/core';
import { KiranaItem } from '../../models/kirana-item';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  // 1. The main state (Private Writable Signal)
  private itemsSignal = signal<KiranaItem[]>([]);

  // 2. Public Read-only Signal for components
  items = this.itemsSignal.asReadonly();

  // 3. Computed Signal for "Low Stock" items
  lowStockItems = computed(() => 
    this.items().filter(item => item.stockCount <= item.minThreshold)
  );

  // 4. Action to "Use" an item (Reduce stock by 1)
  useItem(id: string) {
    this.itemsSignal.update(items => 
      items.map(item => 
        item.id === id ? { ...item, stockCount: Math.max(0, item.stockCount - 1) } : item
      )
    );
  }
}
