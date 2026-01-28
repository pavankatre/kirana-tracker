import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../services/storage/user-storage';

// export const authGuard: CanActivateFn = (route, state) => {
//   const storageService = inject(UserStorageService);
//   const router = inject(Router);

//   // Use the signal to check if user exists
//   if (storageService.currentUser()) {

//     console.log(storageService.currentUser() , route , state);
//     return true; 
//   } else {
//     console.log(storageService.currentUser());
//     // Redirect to login if not authenticated
//    // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//    router.navigate(['/login']);
//     return false;
//   }
// };


export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(UserStorageService);
  const router = inject(Router);

  // 1. Check if the Signal has data
  const userInEmail = storageService.currentUser();
  
  // 2. Check if the LocalStorage actually has the key 
  // (Prevents "Ghost Users" if someone manually cleared storage)
  const sessionExists = !!localStorage.getItem('token');

  if (sessionExists) {
    return true; 
  } else {
    // If one is missing, clean up the other to stay in sync
    if (!sessionExists) {
      storageService.removeUser(); // This clears the Signal too
    }
    
   // router.navigate(['/login']);
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
