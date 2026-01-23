import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { KiranaItem } from '../../models/kirana-item';

@Injectable({
  providedIn: 'root',
})
export class StockFormService {
  
  private fb = inject(FormBuilder);

  // The central form configuration
  stockForm = this.fb.group({
    category: ['', Validators.required],
    itemName: [{ value: '', disabled: true }, Validators.required],
    quantity: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]]
  });

  get form() { return this.stockForm; }
  get controls() { return this.stockForm.controls; }

  // Logic moved from component to service
  getFilteredItems(items: KiranaItem[], category: string): KiranaItem[] {
    return items.filter(i => i.category === category);
  }

  prepareItemSelection(item: KiranaItem) {
    this.controls.quantity.enable();
    this.controls.quantity.setValue(item.stockCount);
    this.controls.quantity.markAsTouched();
  }

  resetFormState() {
    this.controls.itemName.disable();
    this.controls.quantity.disable();
  }
}
