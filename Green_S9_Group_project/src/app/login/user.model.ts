export class User {
	constructor(
		public role: string,
		public userId: string,
		public username: string,
		private _token: string, // private tokenExpirationDate: Date
		private tokenExpirationDate: Date
	) {}

	get token() {
		if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
			return null;
		}
		return this._token;
	}
}
