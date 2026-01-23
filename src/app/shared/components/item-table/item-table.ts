
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { KiranaItem } from '../../../models/kirana-item';

@Component({
  selector: 'app-item-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './item-table.html',
  styleUrl: './item-table.scss',
})

export class ItemTableComponent {
  data = input.required<KiranaItem[]>();
  totalItems = input.required<number>();
  onPageChange = output<PageEvent>();

  displayedColumns: string[] = ['name', 'stock', 'updated'];
}
