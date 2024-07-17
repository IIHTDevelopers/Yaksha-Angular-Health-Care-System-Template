import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let authServiceStub: Partial<AuthService>;

    beforeEach(async () => {
        authServiceStub = {
            isLoggedIn: jest.fn().mockReturnValue(true),
            getUserRole: jest.fn().mockReturnValue('provider'),
            logout: jest.fn().mockReturnValue(of(null))
        };

        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
            providers: [{ provide: AuthService, useValue: authServiceStub }]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should have Health & Wellness Application heading in h1', () => {
            const headingElement = fixture.nativeElement.querySelector('h1');
            expect(headingElement.textContent).toContain('Health & Wellness Application');
        });
    });
});
