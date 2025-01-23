import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	apiURL = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

	getAllUsers(): Observable<User[]> {
		return this.httpClient.get<User[]>(this.apiURL);
	}
}
