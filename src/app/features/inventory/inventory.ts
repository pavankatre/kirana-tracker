import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../core/services/inventory';
import { StockForm } from '../../shared/components/stock-form/stock-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KiranaItem } from '../../models/kirana-item';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule , StockForm , MatFormFieldModule , MatInputModule ,MatProgressBarModule, MatTooltipModule ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
protected inventory = inject(InventoryService);

// 1. Create a signal for the search text
  searchTerm = signal<string>('');

  // 2. Define the filteredItems signal that the HTML is looking for
  filteredItems = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allItems = this.inventory.items();
    
    if (!term) return allItems;

    return allItems.filter(item => 
      item.name.toLowerCase().includes(term) || 
      item.category.toLowerCase().includes(term)
    );
  });

// Define the categories signal here
  categories = computed(() => 
    [...new Set(this.inventory.items().map(item => item.category))]
  );

  // Handle the update from the shared component
  handleStockUpdate(event: {id: string, newQuantity: number}) {
    this.inventory.updateStock(event.id, event.newQuantity);
  }

  updateSearch(event: Event) {
  const input = event.target as HTMLInputElement;
  this.searchTerm.set(input.value);
}

// src/app/features/inventory/inventory.component.ts


  // ... your existing code (inventory, filteredItems, etc.)

  /** * Returns a color hex code based on stock levels.
   * Useful for the status stripe on the card.
   */
  getStatusColor(item: KiranaItem): string {
    if (item.stockCount <= 0) {
      return '#e91e63'; // Bright Pink/Red for Out of Stock
    }
    if (item.stockCount <= item.minThreshold) {
      return '#ff9800'; // Orange for Low Stock
    }
    return '#4caf50';   // Green for Healthy Stock
  }

  /**
   * Returns a Material Icon name based on the category.
   * This makes the UI feel more professional.
   */
  getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'groceries': return 'shopping_basket';
      case 'dairy': return 'water_drop';
      case 'snacks': return 'fastfood';
      case 'beverages': return 'local_drink';
      default: return 'inventory_2';
    }
  }
}



