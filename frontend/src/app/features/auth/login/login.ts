import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     this.authService.login(this.loginForm.value);
  //     // Navigate to dashboard or return URL after successful login
  //     this.router.navigate(['/inventory']);
  //   }
  // }

  onLogin() {
  if (this.loginForm.valid) {
    // 1. Call the service and SUBSCRIBE to the result
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        // 2. Only navigate AFTER the backend confirms success
        this.router.navigate(['/inventory']);
      },
      error: (err) => {
        // 3. Handle errors (e.g., wrong password)
        console.error('Login failed:', err);
        alert(err.error?.message || 'Invalid credentials');
      }
    });
  }
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

  moveButton() {
    // Only move if the form is invalid
    if (this.loginForm.invalid) {
      const x = Math.floor(Math.random() * 200) - 100; // Move between -100px and 100px
      const y = Math.floor(Math.random() * 100) - 75;  // Move between -50px and 50px
      this.buttonTransform = `translate(${x}px, ${y}px)`;
    } else {
      // Reset position if form becomes valid
      this.buttonTransform = 'translate(0, 0)';
    }
}
}
