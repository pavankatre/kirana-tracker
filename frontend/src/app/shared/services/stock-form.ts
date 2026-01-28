


import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KiranaItem } from '../../models/kirana-item';

@Injectable({
  providedIn: 'root',
})
export class StockFormService {
  private fb = inject(FormBuilder);

  // Central form configuration
  stockForm = this.fb.group({
    category: ['', Validators.required],
    itemName: [{ value: '', disabled: true }, Validators.required],
    // Change: We start with null or empty so the user can type the NEW amount to add
    quantity: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]]
  });

  get form() { return this.stockForm; }
  get controls() { return this.stockForm.controls; }

  /**
   * Filter items based on the selected category from the live DB items
   */
  getFilteredItems(items: KiranaItem[], category: string): KiranaItem[] {
    if (!items) return [];
    return items.filter(i => i.category === category);
  }

 

  // In stock-form-service.ts
resetFormState() {
  this.stockForm.reset(); 
  this.controls.itemName.disable();
  this.controls.quantity.disable();
}

// src/app/core/services/stock-form.service.ts

prepareItemSelection(item: KiranaItem) {
  // Use the { emitEvent: true } to ensure the UI notices the change
  this.controls.quantity.enable();
  this.controls.quantity.setValue(1);
  this.controls.quantity.updateValueAndValidity();
}
}
