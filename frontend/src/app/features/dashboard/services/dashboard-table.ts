
import { inject, Injectable, computed, signal } from '@angular/core';
import { InventoryService } from '../../../core/services/inventory';

@Injectable({
  providedIn: 'root',
})





export class DashboardTableService {
  private inventory = inject(InventoryService);

  // State Signals
  selectedCategory = signal<string>('All');
  searchTerm = signal<string>('');
  currentPage = signal<number>(0);
  pageSize = signal<number>(10);

  // Filtered Data Logic
  filteredItems = computed(() => {
    let items = this.inventory.items();
    const cat = this.selectedCategory();
    const search = this.searchTerm().toLowerCase();

    if (cat !== 'All') {
      items = items.filter(i => i.category === cat);
    }

    if (search) {
      items = items.filter(i => 
        i.name.toLowerCase().includes(search) || 
        i.id!.toLowerCase().includes(search)
      );
    }
    return items;
  });

  // Paginated Data
  paginatedItems = computed(() => {
    const start = this.currentPage() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredItems().slice(start, end);
  });

  categories = computed(() => 
    ['All', ...new Set(this.inventory.items().map(i => i.category))]
  );
}
