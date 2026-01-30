import { Component, Output, EventEmitter, input, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { STARTER_PACK } from '../../../../core/constants/starter-items.constant';
import { KiranaItem } from '../../../../models/kirana-item';
import { InventoryService } from '../../../../core/services/inventory';

@Component({
  selector: 'app-starter-pack',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './starter-pack.html',
  styleUrls: ['./starter-pack.scss']
})
export class StarterPackComponent {
  // Using the constant we created earlier
  starterItems = STARTER_PACK;
  private inventoryService = inject(InventoryService);

  @Output() itemSelected = new EventEmitter<Partial<KiranaItem>>();

  onAdd(item: Partial<KiranaItem>) {
    this.itemSelected.emit(item);
  }
  isAdded(name: string): boolean {
  return this.inventoryService.items().some(i => i.name === name);
}
}