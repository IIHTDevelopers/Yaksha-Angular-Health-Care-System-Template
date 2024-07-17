import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = '';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): any {
    // write your logic here
    return null;
  }

  logout(): any {
    // write your logic here
    return null;
  }

  getCurrentUser(): any {
    // write your logic here
    return null;
  }

  isLoggedIn(): any {
    // write your logic here
    return false;
  }

  getUserRole(): any {
    // write your logic here
    return null;
  }
}
