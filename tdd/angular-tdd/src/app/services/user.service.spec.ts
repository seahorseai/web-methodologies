import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
    let userService: UserService;
	let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [HttpClientTestingModule]
		});
    userService = TestBed.inject(UserService);
	httpTestController = TestBed.inject(HttpTestingController);
  });

	afterEach(() => {
		httpTestController.verify();
	});

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

	it('should retrieve every user', () => {
		let retrievedData: User[] = [];
		const mockBackendUsers: User[] = [
			{ 
				id: 1, name: 'Barbara', username: 'barbara9890', email: 'barbara7809@gmail.com', phone: '+34 123 45 67 89', website: 'www.barbaraswebsite.es',
				address: { street: 'A street', suite: 'A suite', city: 'A city', zipcode: '12345', geo: { lat: 'X09', lng: '333' }, },
				company: { name: 'BarbaraCompany', catchPhrase: 'A catch phrase', bs: 'bs' }
			},
			{ 
				id: 2, name: 'Joseph', username: 'joseph9890', email: 'joseph7809@gmail.com', phone: '+34 123 45 67 89', website: 'www.josephswebsite.es',
				address: { street: 'A street', suite: 'A suite', city: 'A city', zipcode: '12345', geo: { lat: 'X09', lng: '333' }, },
				company: { name: 'josephCompany', catchPhrase: 'A catch phrase', bs: 'bs' }
			}
		];
		userService.getAllUsers().subscribe((data) => {
			retrievedData = data;
		});

		const mockRequest = httpTestController.expectOne(userService.apiURL);
		expect(mockRequest.request.method).toEqual("GET");
		mockRequest.flush(mockBackendUsers);
		expect(retrievedData).toEqual(mockBackendUsers);
	});
});