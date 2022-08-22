import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanLoad {
	constructor(private authService: AuthService, private route: Router) {}

	canLoad(
		route: Route,
		segments: UrlSegment[]
	): Observable<boolean> | Promise<boolean> | boolean {
		return this.authService.isAuthenticated.pipe(
			take(1),
			tap(isAuthenticated => {
				if (!isAuthenticated) {
					this.route.navigateByUrl('/login');
				}
			})
		);
	}
}
