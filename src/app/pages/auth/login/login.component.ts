import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;
  loading: boolean | undefined;
  
  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.is_login) {
      this.navigate();
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
    });
  }
  
  submit() {
    if (this.form.dirty && this.form.valid) {
      this.login();
    } else {
      for (let i in this.form.controls) this.form.controls[i].markAsTouched();
    }
  }

  login() {
    this.loading = true;

    this.api.post_('auth/users', this.form.value).subscribe({
      complete: () => { },
      error: (error) => {
        this.loading = false;

        console.log(error);
      },
      next: (response) => {
        this.loading = false;

        this.auth.setLogin(response);

        this.navigate();
      },
    });
  }

  navigate() {
    this.router.navigateByUrl('/dashboard');
  }

}
