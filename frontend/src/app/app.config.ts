import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Correct Router configuration
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withViewTransitions(),
      withHashLocation() // Highly recommended for GitHub Pages to prevent 404s
    ),
    
  ]
};