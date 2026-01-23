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

@Component({
  selector: 'app-stock-form',
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, 
    MatInputModule, MatSelectModule, MatAutocompleteModule, MatButtonModule
  ],
  templateUrl: './stock-form.html',
  styleUrl: './stock-form.scss',
})
// export class StockForm {

// // Use ViewChild to catch the form directive from the HTML
//   @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
// // Inject the new service
//   private formService = inject(StockFormService); 
//   private fb = inject(FormBuilder);

//   // Signal-based Inputs (Read-only signals)
//   categories = input.required<string[]>();
//   items = input.required<KiranaItem[]>();

//   // Signal-based Output
//   onUpdate = output<{id: string, newQuantity: number}>();

//   filteredItems: KiranaItem[] = [];

//   stockForm = this.fb.group({
//     category: ['', Validators.required],
//     itemName: [{ value: '', disabled: true }, Validators.required],
//     quantity: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]]
//   });

//   get f() { return this.stockForm.controls; }

//   onCategoryChange(cat: string) {
//     // items() is now a signal, so we call it like a function
//     this.filteredItems = this.items().filter(i => i.category === cat);
//     this.stockForm.get('itemName')?.enable();
//     this.stockForm.get('itemName')?.reset();
//   }

//   submit() {
//     if (this.stockForm.valid) {
//       const selectedItem = this.stockForm.value.itemName as unknown as KiranaItem;
//       // Emit using the new .emit() syntax
//       this.onUpdate.emit({
//         id: selectedItem.id,
//         newQuantity: this.stockForm.value.quantity || 0
//       });
//      // this.stockForm.reset();
//      // FIX: This clears the values AND removes the red error styling
//       this.formDirective.resetForm();
//       // Manually ensure fields are disabled for the next entry
//     this.stockForm.get('itemName')?.disable();
//     this.stockForm.get('quantity')?.disable();
//     }
//   }

//   displayFn(item: KiranaItem): string {
//     return item && item.name ? item.name : '';
//   }
//   onItemSelect(item: KiranaItem) {
//   if (item) {
//     // 1. Enable the quantity field so it's no longer grayed out
//     this.stockForm.get('quantity')?.enable();
    
//     // 2. Set the value to current stock so the user can just edit it
//     this.stockForm.get('quantity')?.setValue(item.stockCount);
    
//     // 3. Mark as touched so validation errors show if they delete the value
//     this.stockForm.get('quantity')?.markAsTouched();
//   }
// }
// }


export class StockForm {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  
  // Inject the new service
  private formService = inject(StockFormService);

  // Keep these as they are the bridge to the parent
  categories = input.required<string[]>();
  items = input.required<KiranaItem[]>();
  onUpdate = output<{id: string, newQuantity: number}>();

  // Reference the form from the service
  stockForm = this.formService.form;
  get f() { return this.formService.controls; }
  filteredItems: KiranaItem[] = [];

  onCategoryChange(cat: string) {
    this.filteredItems = this.formService.getFilteredItems(this.items(), cat);
    this.f.itemName.enable();
    this.f.itemName.reset();
  }

  onItemSelect(item: KiranaItem) {
    if (item) this.formService.prepareItemSelection(item);
  }

  submit() {
    if (this.stockForm.valid) {
      const selectedItem = this.stockForm.value.itemName as unknown as KiranaItem;
      this.onUpdate.emit({
        id: selectedItem.id,
        newQuantity: this.stockForm.value.quantity || 0
      });

      this.formDirective.resetForm();
      this.formService.resetFormState();
    }
  }

  displayFn(item: KiranaItem): string {
    return item?.name ?? '';
  }
}





