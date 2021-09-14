<template>
  <v-main>
    <v-text-field
      placeholder="write an item name and click +"
      outlined
      v-model="item.name"
    >
      <template v-slot:prepend>
        <v-autocomplete
          v-model="item.unit"
          :items="units"
          placeholder="unit"
          dense
          auto-select-first
        ></v-autocomplete>
      </template>
      <template v-slot:append>
        <v-icon @click="checker" color="green"> add </v-icon>
      </template>
    </v-text-field>
    <v-container fluid v-if="items.length > 0">
      <v-container fluid d-flex flex-row justify-space-between>
        <v-btn color="green" @click="$emit('listCreated')"> SAVE LIST </v-btn>
        <v-btn color="red" @click="clearList"> CLEAR LIST </v-btn>
      </v-container>
      <p>Items to buy:</p>
      <v-row>
        <v-col cols="auto" v-for="product in items" :key="product.i">
          <v-container style="border: 1px solid black; border-radius: 1rem">
            <span>{{ product.name }} </span>
            <span v-if="product.unit !== ''">in {{ product.unit }}</span>
            <v-icon @click="() => deleteItem(product)">close</v-icon>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      units: ["kg", "packs", "pcs"],
      item: {
        name: "",
        price: 0,
        unit: "",
        quantity: 0,
      },
    };
  },
  methods: {
    checker() {
      this.$store.commit("addItem", this.item);
      this.item = {};
      this.item.unit = "";
    },
    clearList() {
      this.$store.commit("clearList");
      console.log(this.$store.state.currentList.length);
    },
    deleteItem(product) {
      this.$store.commit("deleteItem", product);
    },
  },
  computed: {
    items() {
      return this.$store.state.currentList;
    },
  },
};
</script>

<style></style>
