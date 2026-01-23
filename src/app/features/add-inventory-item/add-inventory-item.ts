import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NewItemService } from '../../core/services/new-item/new-item';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-inventory-item',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule , MatIconModule],
  templateUrl: './add-inventory-item.html',
  styleUrl: './add-inventory-item.scss',
})
export class AddInventoryItem {
public newItemService = inject(NewItemService);
  private router = inject(Router);



private fb = inject(FormBuilder);
  //private inventoryService = inject(InventoryService);

  // Reusing your existing categories
  categories = ['Groceries', 'Personal Care', 'Dairy', 'Grains', 'Household'];

  addForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    stockCount: [0, [Validators.required, Validators.min(0)]],
    minThreshold: [2, [Validators.required, Validators.min(1)]]
  });

  onSubmit() {
    if (this.newItemService.saveNewItem()) {
      this.router.navigate(['/inventory']);
    }
  }
}
