import { Component, inject } from '@angular/core';
import { DashboardTableService } from './services/dashboard-table';
import { ItemTableComponent } from '../../shared/components/item-table/item-table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  imports: [ItemTableComponent,MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule , MatIconModule],
  providers: [DashboardTableService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
protected tableService = inject(DashboardTableService);
}
