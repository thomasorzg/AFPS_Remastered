import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean | undefined;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.auth.getAccessToken()) {
      this.getUsers();
    }
  }

  getUsers() {
    this.loading = true;

    this.api.post('auth/access-token/users', { 'access_token': this.auth.getAccessToken() }).subscribe((response: any) => {
      this.loading = false;

      this.auth.setUser(response);
      this.auth.checkLogin();
      this.auth.startSessionCheck();
    }, error => {
      this.loading = false;

      this.router.navigate(['logout']);
    });
  }

}
