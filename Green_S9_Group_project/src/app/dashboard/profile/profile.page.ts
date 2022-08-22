import { Subscription } from 'rxjs';
import { Users } from '../../models/users.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/login/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {
	constructor(private authService: AuthService) {}
	token = localStorage.getItem('token');
	user: Users;
	userSub: Subscription;
	ngOnInit() {
		this.userSub = this.authService.getUser(this.token).subscribe(userData => {
			this.user = userData;
			console.log(this.user);
			console.log(this.token);
		});
	}

	ionViewWillEnter() {
		this.userSub = this.authService.getUser(this.token).subscribe(data => {
			this.user = data;
			console.log(this.user);
			console.log(this.token);

		});
	}

	ngOnDestroy(): void {
		if (this.userSub) {
			this.userSub.unsubscribe();
		}
	}
}
