<template>
  <div id="pokedex">
      <!-- impossibility to add pokemon message -->
      <v-alert
         dense
        outlined
        text
        type="error"
        elevation="5"
        v-model="dialog_add_pokemon_forbidden"
      >
          {{add_pokemon_forbidden_message}}
      </v-alert>

      <!-- Search pokemon -->
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <!-- list of 100 pokemons -->
      <v-data-table
          :headers="pokedex_headers"
          :items="pokemon_list"
          :search="search"
          fixed-header
          class="elevation-1"
          disable-pagination
          hide-default-footer
          disable-sort
          mobile-breakpoint="0"
      >
        <!-- get the sprite with the url -->
        <template v-slot:[`item.url`]="{item}" >
            <v-img class="sprite" @click="info_pokemon_page(item)"
            :src="get_pokemon_sprite(item)"
            max-height="55"
            max-width="65"></v-img>
        </template>

          <!--  pokemon add button -->
          <template v-slot:[`item.add`]="{ item }">
            <button
              @click="open_dialog_add_pokemon(item)"
              class="add_btn"
            >
              +
            </button>
          </template>
      </v-data-table>

      <!-- Dialog to add pokemon -->
      <v-dialog v-model="dialog_add_pokemon" >
        <v-card>
            <v-card-title class="justify-center">{{
              add_pokemon_question
            }}</v-card-title>

            <v-card-actions>
              <v-btn
                  class="action_btn"
                  @click="add_pokemon_in_team()"
                  @click.stop="dialog_add_pokemon = false"
              >
              Yes
              </v-btn>
              <v-btn
                  class="action_btn"
                  @click.stop="dialog_add_pokemon = false"
                  >No
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PokedexView',
    data() {
    return {
      search: "",
      dialog_add_pokemon: false,
      add_pokemon_question: "Add the pokemon to your team ?",
      pokemon_name: "",
      pokemon_sprite: "",
      dialog_add_pokemon_forbidden: false,
      add_pokemon_forbidden_message: "Your team has already 6 pokemons.",
      page_url: window.location.href,

      /* pokedex_headers of the pokedex table */
      pokedex_headers: [
        {
          text: "Name",
          value: "name",
          class: "header_color",
        },
        {
          text: "Sprite",
          value: "url",
          class: "header_color",
        },
        {
          text: "Add in team",
          value: "add",
          class: "header_color",
        },
      ],
    }
  },
  computed: {
    // List of 100 pokemons
    pokemon_list() {
      return this.$store.getters.pokemon_list;
    },
  },
  async mounted() {
    await this.$store.dispatch("get_pokemon_list");
  },
  methods: {

    // get the pokemon id
    get_pokemon_id(item){
      let id = (item.url).split("https://pokeapi.co/api/v2/pokemon/")[1].split("/")[0];
      return id;
    },

    // get the url of the pokemon's sprite
    get_pokemon_sprite(item){
      let id = this.get_pokemon_id(item);
      let pokemon_sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
      //console.log(pokemon_id);
      return pokemon_sprite;
    },

    // On click on pokemon, the function render a page with more information about the pokemon
    info_pokemon_page(item) {
      let id = this.get_pokemon_id(item);
      this.$router.push({ path: '/pokemon_info/' + id });
    },

    open_dialog_add_pokemon(item){
      this.dialog_add_pokemon = true;
      this.pokemon_item = Object.assign({}, item);
    },

    // provide to the store the pokemon to add in pokemon team if the team is not already complete (6 pokemons)
    add_pokemon_in_team(){
      if(this.$store.getters.pokemon_team.length < 6){
        let pokemons = {
          pokemon_name:this.pokemon_item.name,
          pokemon_sprite:this.pokemon_item.url,
        };
        this.$store.dispatch("get_pokemon_team",{pokemons});
      }else{
        this.dialog_add_pokemon = false;
        this.dialog_add_pokemon_forbidden = true;
        // the alert disappear after 5 secondes
        setTimeout(()=>{
          this.dialog_add_pokemon_forbidden = false;
        },5000);
      }
    },
    
  }
};

</script>

<style scoped>
  .sprite:hover{
    cursor: pointer;
  }
</style>