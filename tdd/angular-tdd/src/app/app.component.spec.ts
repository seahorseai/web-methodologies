import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from './services/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent with ng-mocks', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockUsers: User[] = [
    {
      id: 1, name: 'Barbara', username: 'barbara9890', email: 'barbara7809@gmail.com', phone: '+34 123 45 67 89', website: 'www.barbaraswebsite.es',
      address: { street: 'A street', suite: 'A suite', city: 'A city', zipcode: '12345', geo: { lat: 'X09', lng: '333' } },
      company: { name: 'BarbaraCompany', catchPhrase: 'A catch phrase', bs: 'bs' }
    },
    {
      id: 2, name: 'Joseph', username: 'joseph9890', email: 'joseph7809@gmail.com', phone: '+34 123 45 67 89', website: 'www.josephswebsite.es',
      address: { street: 'A street', suite: 'A suite', city: 'A city', zipcode: '12345', geo: { lat: 'X09', lng: '333' } },
      company: { name: 'josephCompany', catchPhrase: 'A catch phrase', bs: 'bs' }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule, HttpClientTestingModule], // Include CommonModule for *ngFor
      providers: [
        MockProvider(UserService, {
          getAllUsers: () => of(mockUsers), // Mock the getAllUsers method
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger lifecycle hooks and bindings
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should use mocked service data', () => {
    const userService = TestBed.inject(UserService);
    jest.spyOn(userService, 'getAllUsers').mockReturnValue(of(mockUsers)); // Use Jest's spyOn

    userService.getAllUsers().subscribe(users => {
      expect(users).toEqual(mockUsers); // Verify data
    });

    expect(userService.getAllUsers).toHaveBeenCalled(); // Verify the method call
  });

  
});
