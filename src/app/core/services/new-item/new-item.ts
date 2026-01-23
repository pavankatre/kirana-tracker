import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { InventoryService } from '../inventory';
import { KiranaItem } from '../../../models/kirana-item';


@Injectable({
  providedIn: 'root',
})

export class NewItemService {
  private fb = inject(FormBuilder);
  private inventoryService = inject(InventoryService);

  // Initialize the form structure here to keep the component light
  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', Validators.required],
    stockCount: [0, [Validators.required, Validators.min(0)]],
    minThreshold: [2, [Validators.required, Validators.min(1)]]
  });

  get controls() { return this.form.controls; }

  saveNewItem(): boolean {
    if (this.form.valid) {
      const formValue = this.form.value;
      
      const newItem: KiranaItem = {
        id: crypto.randomUUID(), // Modern browser unique ID
        name: formValue.name!,
        category: formValue.category!,
        stockCount: Number(formValue.stockCount),
        minThreshold: Number(formValue.minThreshold),
        lastUpdated: new Date()
      };

      // Hand off the finalized object to the main Inventory Service
      this.inventoryService.addItem(newItem);
      this.form.reset({ stockCount: 0, minThreshold: 2 });
      return true;
    }
    return false;
  }
}
