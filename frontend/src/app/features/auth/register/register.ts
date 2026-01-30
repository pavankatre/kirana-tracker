
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize, max } from 'rxjs';
import { maxLength } from '@angular/forms/signals';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule,MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule ], 
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

isLoading = false;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  // Custom Validator for matching passwords
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } : null;
  }


onRegister() {
  if (this.registerForm.valid) {
    this.isLoading = true;
    
    // Destructure to keep the backend payload clean
    const { username, email, password } = this.registerForm.value;

    this.authService.register({ username, email, password })
      .pipe(
        finalize(() => this.isLoading = false) // Cleaner state management
      )
      .subscribe({
        next: (res) => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        error: (err) => alert(err.error?.message || 'Registration failed')
      });
  }
}

goToLogin() {
  this.router.navigate(['/login']);
}

}
