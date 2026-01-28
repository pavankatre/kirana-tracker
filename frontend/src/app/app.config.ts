import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
import { authInterceptor } from './core/interceptors/auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Correct Router configuration
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withViewTransitions(),
      withHashLocation() // Highly recommended for GitHub Pages to prevent 404s
    ),
    provideHttpClient(
      withInterceptors([authInterceptor,errorInterceptor]) // Register it here!
    ),
    
  ]
};