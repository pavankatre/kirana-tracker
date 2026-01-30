import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
   imports: [
    ReactiveFormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  buttonTransform = '';
  isPasswordFocused = false;
  isLoading = false;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });

 

onLogin() {
  if (this.loginForm.invalid) return;

  this.isLoading = true; // Block UI

  this.authService.login(this.loginForm.value)
    .pipe(finalize(() => this.isLoading = false)) // Always runs (success or error)
    .subscribe({
      next: (response) => {
        // No need for alert here, just move to the next screen
        this.router.navigate(['/inventory']);
      },
      error: (err) => {
        // In a real company, you'd use a SnackBar/Toast, not an alert
        console.error('Auth Error:', err);
      }
    });
}


  getErrorMessage(controlName: string): string {
  const control = this.loginForm.get(controlName);
  if (!control || !control.errors) return '';

  // Get the first error (e.g., 'required', 'email', 'minlength')
  const errorKey = Object.keys(control.errors)[0];
  
  // Professional mapping (You can also fetch these from your JSON file)
  const messages: any = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minlength: `Minimum ${control.errors['minlength']?.requiredLength} characters required.`
  };

  return messages[errorKey] || 'Invalid input';
}
  goToRegister() {
    this.router.navigate(['/register']);
  }


}
