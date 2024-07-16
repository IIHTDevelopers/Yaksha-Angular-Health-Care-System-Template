import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        AuthService,
        { provide: Router, useValue: { navigate: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {
    it('should login successfully and navigate to home', () => {
      const mockUser: User = { id: 1, username: 'testuser', password: 'testpass', role: 'patient' };

      component.username = 'testuser';
      component.password = 'testpass';
      component.login();

      const req = httpTestingController.expectOne(`${authService.apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);

      expect(router.navigate).toHaveBeenCalledWith(['/']);
      expect(component.errorMessage).toBe('');
    });

    it('should show error message on invalid login', () => {
      component.username = 'invaliduser';
      component.password = 'invalidpass';
      component.login();

      const req = httpTestingController.expectOne(`${authService.apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush([]);

      expect(component.errorMessage).toBe('Invalid username or password');
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should handle login error', () => {
      component.username = 'testuser';
      component.password = 'testpass';
      component.login();

      const req = httpTestingController.expectOne(`${authService.apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));

      expect(component.errorMessage).toBe('Invalid username or password');
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
