import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  loading: boolean | undefined;

  constructor(
    public auth: AuthService,
    public fun: FunctionsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    this.logout();
  }

  logout() {
    this.loading = false;

    this.auth.logout();
    
    this.router.navigateByUrl('/login');
  }

}
