import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Remove user details from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
}
