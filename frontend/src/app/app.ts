import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header/header';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loading } from './core/services/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header , MatProgressSpinnerModule ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('kirana-tracker');
  loadingService=inject(Loading);
}
