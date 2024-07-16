import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('business', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should login a user', () => {
      const mockUsers: User[] = [
        { id: 1, username: 'testuser', password: 'testpass', role: 'patient' },
        { id: 2, username: 'provider', password: 'testpass', role: 'provider' }
      ];
      const loginUser: User = { id: 1, username: 'testuser', password: 'testpass', role: 'patient' };

      service.login('testuser', 'testpass').subscribe(user => {
        expect(user).toEqual(loginUser);
      });

      const req = httpTestingController.expectOne(`${service.apiUrl}/users`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockUsers);

      const currentUser = localStorage.getItem('currentUser');
      expect(currentUser).toEqual(JSON.stringify(loginUser));
    });

    it('should logout a user', () => {
      localStorage.setItem('currentUser', JSON.stringify({ id: 1, username: 'testuser', role: 'patient' }));

      service.logout().subscribe(() => {
        const currentUser = localStorage.getItem('currentUser');
        expect(currentUser).toBeNull();
      });
    });

    it('should get the current user from local storage', () => {
      const currentUser: User = {
        id: 1, username: 'testuser', role: 'patient',
        password: ''
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      const user = service.getCurrentUser();
      expect(user).toEqual(currentUser);
    });

    it('should return null if no user is logged in', () => {
      localStorage.removeItem('currentUser');

      const user = service.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return true if a user is logged in', () => {
      const currentUser: User = {
        id: 1, username: 'testuser', role: 'patient',
        password: ''
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBe(true);
    });

    it('should return false if no user is logged in', () => {
      localStorage.removeItem('currentUser');

      const isLoggedIn = service.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });

    it('should get the user role', () => {
      const currentUser: User = {
        id: 1, username: 'testuser', role: 'patient',
        password: ''
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      const role = service.getUserRole();
      expect(role).toEqual('patient');
    });

    it('should return null if no user is logged in when getting user role', () => {
      localStorage.removeItem('currentUser');

      const role = service.getUserRole();
      expect(role).toBeNull();
    });
  });
});
