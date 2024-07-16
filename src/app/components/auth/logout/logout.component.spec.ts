import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { AuthService } from '../../../services/auth.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: { navigate: jest.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('boundary', () => {

    it('should handle logout error', () => {
      const logoutSpy = jest.spyOn(authService, 'logout').mockReturnValue(throwError(() => new Error('Logout failed')));
      const consoleSpy = jest.spyOn(console, 'error');

      fixture.detectChanges(); // ngOnInit calls logout

      expect(logoutSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Logout failed', expect.any(Error));
    });
  });
});
