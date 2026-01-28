import { CommonModule } from '@angular/common';
import { Component, inject, input, output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { KiranaItem } from '../../../models/kirana-item';
import { StockFormService } from '../../services/stock-form';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stock-form',
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './stock-form.html',
  styleUrl: './stock-form.scss',
})
  

export class StockForm {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  private formService = inject(StockFormService);

  categories = input.required<string[]>();
  items = input.required<KiranaItem[]>();
  // Match the parent component's expectation
  onUpdate = output<{id: string, newQuantity: number}>();

  stockForm = this.formService.form;
  get f() { return this.formService.controls; }
  filteredItems: KiranaItem[] = [];

 

  submit() {
    if (this.stockForm.valid) {
      const selectedItem = this.stockForm.value.itemName as unknown as KiranaItem;
      const addedQty = this.stockForm.value.quantity || 0;
      
      // Calculate final total (Current DB stock + New input)
      const currentStock = Number(selectedItem.stockCount || 0);
      const finalQuantity = addedQty;

      // Use _id for MongoDB compatibility
      const targetId = selectedItem._id || selectedItem.id;

      if (targetId) {
        this.onUpdate.emit({
          id: targetId,
          newQuantity: finalQuantity
        });

        // Reset the form professionally
        this.formDirective.resetForm();
        this.formService.resetFormState();
      }
    }
  }

  displayFn(item: KiranaItem): string {
    return item?.name ?? '';
  }

  // src/app/shared/components/stock-form/stock-form.ts

onCategoryChange(cat: string) {
  this.filteredItems = this.formService.getFilteredItems(this.items(), cat);
  
  // Enable itemName and reset quantity/itemName states
  this.f.itemName.enable();
  this.f.itemName.setValue(''); // Clear previous name
  this.f.quantity.disable();    // Re-disable quantity until name is picked
}



onItemSelect(item: any) {
  // Check if item is an object and has a name (proving it's a KiranaItem)
  if (item && typeof item === 'object' && item.name) {
    this.formService.prepareItemSelection(item);
    
    // Explicitly check the control state
    console.log('Quantity Control Enabled:', this.f.quantity.enabled);
  } else {
    // If it's just a string from typing, keep quantity disabled
    this.f.quantity.disable();
  }
}
}



