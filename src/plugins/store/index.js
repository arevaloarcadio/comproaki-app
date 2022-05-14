
import Vuex from 'vuex';
import auth from "./modules/auth";
import menu from "./modules/menu";
import createPersistedState from "vuex-persistedstate";


export default new Vuex.Store({
	modules: {
		auth,
		menu
	},
	strict: true,
	plugins: [createPersistedState()],
});