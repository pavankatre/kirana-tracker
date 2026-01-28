import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unknown error occurred';

      if (error.status === 0) {
        message = '🌐 Server is unreachable. Please check if the backend is running.';
      } else {
        message = error.error?.message || `Error ${error.status}: ${error.statusText}`;
      }

      // You can use a Toast library here later, for now, alert is fine
      alert(message); 
      return throwError(() => error);
    })
  );
};
