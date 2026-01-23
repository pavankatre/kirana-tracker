
import { inject, Injectable, computed, signal } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory';
import { KiranaItem } from '../../../models/kirana-item';


@Injectable({
  providedIn: 'root',
})
export class InventoryViewService {
  

  private inventory = inject(InventoryService);

  // State
  searchTerm = signal<string>('');

  // Computed Data
  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allItems = this.inventory.items();
    
    if (!term) return allItems;

    return allItems.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.category.toLowerCase().includes(term)
    );
  });

  categories = computed(() => 
    [...new Set(this.inventory.items().map(item => item.category))]
  );

  // Methods
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  getStatusColor(item: KiranaItem): string {
    if (item.stockCount <= 0) return '#e91e63';
    if (item.stockCount <= item.minThreshold) return '#ff9800';
    return '#4caf50';
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'groceries': 'shopping_basket',
      'dairy': 'water_drop',
      'snacks': 'fastfood',
      'beverages': 'local_drink'
    };
    return icons[category.toLowerCase()] || 'inventory_2';
  }
}
