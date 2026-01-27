import { Injectable, computed, inject } from '@angular/core';
import { InventoryService } from '../inventory';
import { PdfExportService } from '../pdf-export/pdf-export';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {

  private inventoryService = inject(InventoryService);
  private pdfService = inject(PdfExportService);

  purchaseList = computed(() => 
    this.inventoryService.items().filter(item => item.stockCount <= item.minThreshold)
  );

  download() {
    const rows = this.purchaseList().map(i => [i.name, i.category, i.stockCount, i.minThreshold]);
    this.pdfService.exportTable('Refill List', 'kirana-refill', ['Item', 'Category', 'Stock', 'Min'], rows);
  }
}
