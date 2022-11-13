<template>
  <div>
    <v-card
    class="characteristics_card"
    >
      <v-card-title class="justify-center">

        <!-- pokemon's sprite -->
        <v-img 
        :src="pokemon_sprite_url"
        max-height="250"
        max-width="270"></v-img>
      </v-card-title>

      <v-card-text>
        <v-list flat>
          <v-subheader>Pokemon Name : {{pokemon_name}}</v-subheader>
          <v-list-item-group
            color="primary"
          >
          <!-- characteristics list -->
            <v-list-item
              v-for="(item, i) in characteristics"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.text"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.value"></v-list-item-title>
              </v-list-item-content>

            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
    
    <!-- btn to return to the pokedex -->
    <v-btn class="pokedex_btn" color="#FFCC00" @click="redirect_to_pokedex()">
      Pokedex
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'PokemonInfo',
    data() {
      return {
      }
  },
  computed: {
    pokemon_info() {
      return this.$store.getters.pokemon_info;
    },
      pokemon_name(){
        return this.pokemon_info?.name;
      },
      pokemon_sprite_url(){
        return this.pokemon_info?.sprites?.front_default;
      },
      characteristics(){
        let pokemon_types = "";
        let pokemon_abilities = "";

        if(this.pokemon_info){

          // get the types (2 max)
          if(this.pokemon_info.types){
            pokemon_types = this.pokemon_info.types[0]?.type?.name;
            console.log(this.pokemon_info.types.length);
            if(this.pokemon_info.types.length > 1){
              pokemon_types += ", " + this.pokemon_info.types[1]?.type?.name;
            }
          }
          // get the abilities (2 max)
          if(this.pokemon_info.abilities){
            pokemon_abilities = this.pokemon_info.abilities[0]?.ability?.name;
            if(this.pokemon_info.abilities.length > 1){
              pokemon_abilities += ", " + this.pokemon_info.abilities[1]?.ability?.name;
            }
          }

          return [
            { text: 'Height', value: this.pokemon_info.height },
            { text: 'Weight', value: this.pokemon_info.weight },
            { text: 'Types', value: pokemon_types},
            { text: 'Abilities', value: pokemon_abilities}
          ]
        }else{
          return []
        }
      },
  },
  async mounted() {
    // get the id from the url and dispatch it to the store to get the pokemon's characteristics
    const id = this.$route.params.id;
    await this.$store.dispatch("get_pokemon_info",{id});
  },
  methods: {
    
    redirect_to_pokedex(){
      this.$router.push({ path: '/'});
    } 
  },
};
</script>
