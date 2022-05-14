export default {
	setToken(token) {
		window.localStorage.setItem('jwt_token_app', token);
	},
	getToken() {
		return window.localStorage.getItem('jwt_token_app');
	},
	removeToken() {
		window.localStorage.removeItem('jwt_token_app');
	}
}