<template>
    <div>

    <!-- bouton to show the team -->
      <v-btn class="team_btn" color="#FFCC00" @click="show_team()">
        {{team}} 
        <v-img 
            src="/pokeball.png"
            max-height="10"
            max-width="15">
        </v-img >
      </v-btn>
      {{pokemon_team.length}}/6

      <!-- the team -->
      <v-dialog v-model="the_team" max-width="500px">
        <v-card>
          <v-card-title class="justify-center">{{team}}</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="team_headers"
              :items="pokemon_team"
              fixed-header
              class="elevation-1"
              disable-pagination
              hide-default-footer
              disable-sort
              mobile-breakpoint="0"
            >

            <!-- get the sprite with the url -->
              <template v-slot:[`item.pokemon_sprite`]="{item}" >
                <v-img
                  :src="get_pokemon_team_sprite(item)"
                  max-height="35"
                  max-width="45">
                </v-img>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
  export default {
    name: 'PokemonTeam',
    data() {
        return {
            the_team: false,
            team: "Team",

            // header and values for the pokemon team table
            team_headers: [
                {
                text: "Name",
                value: "pokemon_name",
                class: "header_color",
                },
                {
                text: "Sprite",
                value: "pokemon_sprite",
                class: "header_color",
                },
            ],
        }
    },
    computed: {
        // get the pokemon team from the store
        pokemon_team(){
            return this.$store.getters.pokemon_team;
        }
  },
    methods: {
        // show the team
        show_team(){
            this.the_team = true;
        },
         // get the pokemon's sprite
        get_pokemon_team_sprite(item){
            let id = (item.pokemon_sprite).split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0];
            let pokemon_sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
            return pokemon_sprite;
        },
    },
  };
</script>