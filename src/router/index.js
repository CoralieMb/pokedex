import Vue from 'vue'
import VueRouter from 'vue-router'
import PokedexView from '../views/PokedexView.vue'
import PokemonInfo from '../views/PokemonInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pokedex',
    component: PokedexView
  },
  {
    path: '/pokemon_info/:id', 
    name: 'pokemon_info',
    component: PokemonInfo
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router
