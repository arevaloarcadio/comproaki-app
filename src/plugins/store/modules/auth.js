//import user from "@/plugins/jwt/user";

/*
|--------------------------------------------------------------------------
| Mutation Types
|--------------------------------------------------------------------------
*/
export const SET_USER = 'SET_USER';
export const SET_UNIT = 'SET_UNIT';
export const UNSET_USER = 'UNSET_USER';

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/
const state = {
	user: {
		id :null, 
		name : null, 
		email : null,
		city : null,
		pais : null,
		dir : null,
		phone : null,
		validate_phone : null,
		singin_method : null,
		get_started : true
	}
};

/*
|--------------------------------------------------------------------------
| Mutations
|--------------------------------------------------------------------------
*/
const mutations = {
	[SET_USER](state, payload) {
		state.user.id = payload.user.id;
		state.user.name = payload.user.name;
		state.user.email = payload.user.email;
		state.user.city = payload.user.city;
		state.user.pais = payload.user.pais;
		state.user.dir = payload.user.dir;
		state.user.phone = payload.user.phone;
		state.user.validate_phone = payload.user.validate_phone;
		state.user.singin_method = payload.user.singin_method;
		state.user.get_started = false
	},
	[UNSET_USER](state) {
		state.user.id = null;
		state.user.name = null;
		state.user.email = null;
		state.user.city = null;
		state.user.pais = null;
		state.user.dir = null;
		state.user.phone = null;
		state.user.validate_phone = null;
		state.user.singin_method = null;
	}
};

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/
const actions = {
	setAuthUser: (context, user) => {
		context.commit(SET_USER, {user})
	},
	setUnit: (context, unit) => {
		context.commit(SET_UNIT, {unit})
	},
	unsetAuthUser: (context) => {
		context.commit(UNSET_USER)
	}
};

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
*/
const getters = {
	isLoggedIn: (state) => {
		return !!(state.user.firstname && state.user.email);
	},
	getUser: (state) => {
		return (state.user);
	},
	getUnit: (state) => {
		return (state.user.unit);
	},
	getUnitId: (state) => {
		return (state.user.unit);
	},
	whoami: (state) => {
		return state.user.id;
	},

};

/*
|--------------------------------------------------------------------------
| Export the module
|--------------------------------------------------------------------------
*/
export default {
	state,
	mutations,
	actions,
	getters
}