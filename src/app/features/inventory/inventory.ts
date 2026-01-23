import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { InventoryService } from '../../core/services/inventory';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
protected inventory = inject(InventoryService);
}
