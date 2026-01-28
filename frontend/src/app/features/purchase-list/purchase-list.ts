import { Component, inject } from '@angular/core';
import { ShoppingListService } from '../../core/services/shopping-list/shopping-list';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-purchase-list',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatTooltipModule
  ],
  templateUrl: './purchase-list.html',
  styleUrl: './purchase-list.scss',
})
export class PurchaseList {
// Injecting the service that handles the logic
  public shoppingService = inject(ShoppingListService);

  // Columns to display in the Material Table
  displayedColumns: string[] = ['name', 'category', 'currentStock', 'minThreshold', 'status'];
}
