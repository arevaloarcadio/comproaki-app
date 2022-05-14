export default {
	setUser(user) {
		window.localStorage.setItem('user_upgrap', JSON.stringify(user));
	},
	getUser() {
		return window.localStorage.getItem('user_upgrap');
	},
	removeUser() {
		window.localStorage.removeItem('user_upgrap');
	}
}