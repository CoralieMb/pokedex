import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon_list: [], // list of 100 pokemons to show in the pokedex
    pokemon_info: undefined, // list of pokemon's characteristics
    pokemon_team: [], // list of pokemons in the team
  },
  getters: {
    pokemon_list: (state) => state.pokemon_list,
    pokemon_info: (state) => state.pokemon_info,
    pokemon_team: (state) => state.pokemon_team,
  },
  actions: {
    async get_pokemon_list({ commit }) {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100/");
      commit("SET_POKEMON_LIST", response.data.results);
    },
    // get the pokemon's characteristics according the id
    async get_pokemon_info({ commit }, {id}) {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id + "/");
      commit("SET_POKEMON_INFO", response.data);
    },
    // add the pokemon in the team
    async get_pokemon_team({ commit }, {pokemons}) {
      this.state.pokemon_team.push(pokemons);
      commit("SET_POKEMON_INFO", this.state.pokemon_team);
    },
  },
  mutations: {
    SET_POKEMON_LIST(state, pokemon_list) {
      state.pokemon_list = pokemon_list;
    },
    SET_POKEMON_INFO(state, pokemon_info) {
      state.pokemon_info = pokemon_info;
    },
    SET_POKEMON_TEAMS(state, pokemon_team) {
      state.pokemon_team = pokemon_team;
    },
  },
});
