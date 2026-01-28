import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule , StockForm , MatFormFieldModule , MatInputModule ,MatProgressBarModule, MatTooltipModule , RouterModule ],
  providers: [InventoryViewService],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})



export class Inventory implements OnInit {
  // Inject services
  protected inventoryService = inject(InventoryService);
  protected viewService = inject(InventoryViewService);
searchTerm = this.viewService.searchTerm;
  // Expose signals to template
  filteredItems = this.viewService.filteredItems;
  categories = this.viewService.categories;

  ngOnInit() {
    // 1. Fetch data from MongoDB on load
    this.inventoryService.getInventory().subscribe({
      error: (err) => console.error('Failed to load inventory:', err)
      // The Service Signal updates automatically via 'tap', 
      // so we don't need 'next' logic here.
    });
  }

  handleStockUpdate(event: {id: string, newQuantity: number}) {
    // 2. Subscribe to the PATCH request
    this.inventoryService.updateStock(event.id, event.newQuantity).subscribe({
      next: () => {
        console.log('Stock updated successfully in DB');
        // Toast notification could go here
      },
      error: (err) => {
        console.error('Update failed:', err);
        // Alert user that sync failed
      }
    });
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.viewService.updateSearch(input.value);
  }




//export class Inventory implements OnInit {
  // ... your existing injections and signals ...

  /**
   * Handles the + / - button clicks by calculating 
   * the new total and syncing it with MongoDB.
   */
  onQuickUpdate(item: KiranaItem, change: number) {
    // 1. Calculate new quantity (ensure it never goes below 0)
    const newQuantity = Math.max(0, item.stockCount + change);
    
    // 2. Extract the ID (handle both MongoDB _id and model id)
    const itemId = item.id || item.id;

    if (!itemId) {
      console.error('Cannot update item: No valid ID found');
      return;
    }

    // 3. Call the service to update the Backend
    this.inventoryService.updateStock(itemId, newQuantity).subscribe({
      next: () => {
        console.log(`Stock for ${item.name} updated to ${newQuantity}`);
        // Note: The UI updates automatically because the service 
        // uses a Signal updated via the 'tap' operator.
      },
      error: (err) => {
        console.error('Failed to update stock in database:', err);
        // Optional: You could add a snackbar notification here for the user
      }
    });
  }

  // ... rest of your methods (updateSearch, etc) ...
//}



  // Add this to your Inventory component class
updateQuickStock(id: string, currentStock: number, change: number) {
  const newQuantity = Math.max(0, currentStock + change);
  
  // Call the same updateStock logic that hits the API
  this.inventoryService.updateStock(id, newQuantity).subscribe({
    next: () => console.log('DB Updated'),
    error: (err) => alert('Failed to update stock on server')
  });
}


onDeleteItem(item: KiranaItem) {
  if (confirm(`Are you sure you want to delete ${item.name}?`)) {
    const id = item._id || item.id;
    if (!id) return;

    this.inventoryService.deleteItem(id).subscribe({
      next: () => {
        // Provide visual feedback to the user
        console.log('Item deleted');
        // If you have MatSnackBar injected as 'this.snackBar'
        // this.snackBar.open(`${item.name} removed`, 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Could not delete item. Please try again.');
      }
    });
  }
}
}



