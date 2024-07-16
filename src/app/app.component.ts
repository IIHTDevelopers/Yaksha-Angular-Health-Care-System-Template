import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Health & Wellness Application';

  constructor(private authService: AuthService, private router: Router) { }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isProvider(): boolean {
    return this.authService.getUserRole() === 'provider';
  }

  isPatient(): boolean {
    return this.authService.getUserRole() === 'patient';
  }
}
