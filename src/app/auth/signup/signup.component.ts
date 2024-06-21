import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ToastSvc } from '../../toast';
import {
  FormBuilder,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private toastSvc: ToastSvc,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  loading: boolean = false;
  userForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phoneNumber: ['', Validators.required],
  });

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  handleSubmit = () => {
    this.authService.signup(this.userForm.getRawValue()).subscribe({
      next: (res) => {
        this.loading = true;
        const data = res?.data?.createUser;
        if (data) {
          this.toastSvc.success('Account created');
          this.router.navigate(['/auth/signin']);
        }
        return data;
      },
      error: (error) => {
        this.loading = false;
        this.toastSvc.graphQlError(error);
      },
    });
  };
}
