import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { ToastSvc } from '../../toast';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
})
export class SigninComponent {
  constructor(
    private authService: AuthService,
    private toastSvc: ToastSvc,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  loading: boolean = false;
  userForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  handleSubmit = async () => {
    this.authService.signIn(this.userForm.getRawValue()).subscribe({
      next: (res) => {
        const data = res.data?.login;
        this.loading = res?.loading;
        if (data) {
          this.authService.addSession(data?.token);
          this.route.navigate(['/courses']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastSvc.graphQlError(error);
      },
    });
  };
}
