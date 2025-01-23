import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './services/user';

@Component({
  selector: 'app-root',
  	standalone: true,
	providers: [UserService],
  template: `
		<h1>Users:</h1>
		<ul>
			@for(user of users; track user.name) {
				<li>{{ user.name }}</li>
			}
		</ul>
	`,
})
export class AppComponent implements OnInit {
	users: User[] = [];
  
	constructor(private userService: UserService) {}
  
	ngOnInit(): void {
	  this.userService.getAllUsers().subscribe((data) => {
		this.users = data;
	  });
	}
  }