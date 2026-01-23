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
import { InventoryViewService } from './service/inventory-view';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule , StockForm , MatFormFieldModule , MatInputModule ,MatProgressBarModule, MatTooltipModule ],
  providers: [InventoryViewService],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  // Inject both services
  protected inventoryService = inject(InventoryService);
  protected viewService = inject(InventoryViewService);

  // Local references for shorter template syntax
  filteredItems = this.viewService.filteredItems;
  categories = this.viewService.categories;
  searchTerm = this.viewService.searchTerm;

  handleStockUpdate(event: {id: string, newQuantity: number}) {
    this.inventoryService.updateStock(event.id, event.newQuantity);
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.viewService.updateSearch(input.value);
  }
}



