
// import { inject, Injectable, computed, signal } from '@angular/core';
// import { InventoryService } from '../../../core/services/inventory';
// import { KiranaItem } from '../../../models/kirana-item';


// @Injectable({
//   providedIn: 'root',
// })
// export class InventoryViewService {
  

//   private inventory = inject(InventoryService);

//   // State
//   searchTerm = signal<string>('');

//   // Computed Data
//   filteredItems = computed(() => {
//     const term = this.searchTerm().toLowerCase();
//     const allItems = this.inventory.items();
    
//     if (!term) return allItems;

//     return allItems.filter(item => 
//       item.name.toLowerCase().includes(term) || 
//       item.category.toLowerCase().includes(term)
//     );
//   });

//   categories = computed(() => 
//     [...new Set(this.inventory.items().map(item => item.category))]
//   );

//   // Methods
//   updateSearch(term: string) {
//     this.searchTerm.set(term);
//   }

//   getStatusColor(item: KiranaItem): string {
//     if (item.stockCount <= 0) return '#e91e63';
//     if (item.stockCount <= item.minThreshold) return '#ff9800';
//     return '#4caf50';
//   }

//   getCategoryIcon(category: string): string {
//     const icons: Record<string, string> = {
//       'groceries': 'shopping_basket',
//       'dairy': 'water_drop',
//       'snacks': 'fastfood',
//       'beverages': 'local_drink'
//     };
//     return icons[category.toLowerCase()] || 'inventory_2';
//   }
// }



import { inject, Injectable, computed, signal } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory';
import { KiranaItem } from '../../../models/kirana-item';

@Injectable({
  providedIn: 'root',
})
export class InventoryViewService {
  private inventory = inject(InventoryService);

  // Search State
  searchTerm = signal<string>('');

  /**
   * FILTERED ITEMS
   * Updated to handle potential undefined items during initial load
   */
  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const allItems = this.inventory.items() || []; // Defensive check for empty state
    console.log('Filtering items with term:', term, 'Total items:', allItems);
    
    if (!term) return allItems;

    return allItems.filter(item => 
      item.name?.toLowerCase().includes(term) || 
      item.category?.toLowerCase().includes(term)
    );
  });

  /**
   * CATEGORIES
   * Dynamically extracts unique categories from the real DB items
   */
  categories = computed(() => {
    const items = this.inventory.items() || [];
    return [...new Set(items.map(item => item.category))].sort();
  });

  // Updates the search term signal
  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  /**
   * STATUS COLORS
   * Logic for UI highlighting based on stock levels
   */
  getStatusColor(item: KiranaItem): string {
    const stock = Number(item.stockCount);
    const threshold = Number(item.minThreshold);

    if (stock <= 0) return '#f44336'; // Standard Material Red (Error)
    if (stock <= threshold) return '#ff9800'; // Standard Material Orange (Warning)
    return '#4caf50'; // Standard Material Green (Success)
  }

  /**
   * CATEGORY ICONS
   * Maps backend category strings to Material Icons
   */
  getCategoryIcon(category: string): string {
    if (!category) return 'inventory_2';
    
    const icons: Record<string, string> = {
      'groceries': 'shopping_basket',
      'dairy': 'water_drop',
      'snacks': 'fastfood',
      'beverages': 'local_drink',
      'personal care': 'face',
      'household': 'cleaning_services'
    };
    return icons[category.toLowerCase()] || 'inventory_2';
  }
}
