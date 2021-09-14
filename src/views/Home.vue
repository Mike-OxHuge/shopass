<template>
  <v-main>
    <v-btn
      v-if="
        $store.state.currentCart.length !== 0 &&
        $store.state.productsToBuy.length !== 0
      "
      block
      color="red"
      @click="$store.emit('clearEverything')"
      >ERASE DATA</v-btn
    >
    <Picker v-if="$store.state.selection === ''" @selected="setSelection" />
    <v-container v-else>
      <v-btn @click="$store.commit('setSelection', '')">
        <v-icon left large>keyboard_arrow_left</v-icon> Go back
      </v-btn>
      <v-container v-if="$store.state.selection === 'existing'" fluid>
        <h1>Choose the list</h1>
        <ExistingLists />
      </v-container>

      <v-container v-if="$store.state.selection === 'newlist'" fluid>
        <h1>Create a new list</h1>
        <ListCreator @listCreated="() => handleCreation()" />
      </v-container>
      <v-container ref="button">
        <v-btn color="yellow" v-show="isListPresent" @click="startShopping">
          Start shopping
        </v-btn>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import Picker from "../components/Picker";
import ListCreator from "../components/ListCreator";
import ExistingLists from "../components/ExistingLists";

export default {
  name: "Home",
  components: {
    Picker,
    ListCreator,
    ExistingLists,
  },
  data() {
    return {
      selection: "",
      isListPresent: false,
    };
  },
  methods: {
    setSelection(payload) {
      if (payload === "existing") {
        this.$store.commit("setSelection", "existing");
      } else if (payload === "newlist") {
        this.$store.commit("setSelection", "newlist");
      }
    },
    handleCreation() {
      this.isListPresent = true;
      this.$vuetify.goTo(this.$refs.button);
    },
    startShopping() {
      this.$store.commit("setProductsToBuy", this.$store.state.currentList);
      this.$router.push("/shopping");
    },
  },
};
</script>

<style scoped></style>
