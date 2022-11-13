<template>
  <v-app>
    <v-app-bar
      flat
      color="#0075BE"
    >
    <!-- pokemon logo -->
      <v-img 
        src="/pokemon_logo.png"
        max-height="75"
        max-width="85">
      </v-img>
    </v-app-bar>

    <v-main>
      <PokemonTeam></PokemonTeam>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import PokemonTeam from "./components/PokemonTeam.vue";
export default {
  name: 'App',
  components: {
    PokemonTeam,
  },

  data: () => ({
  }),
};
</script>

<style>
  @import "./assets/style.css";
</style>
