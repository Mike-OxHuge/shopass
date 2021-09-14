<template>
  <v-main>
    <v-container d-flex justify-space-around>
      <h1 v-if="$store.state.productsToBuy.length > 0">Things to buy:</h1>
      <h1 v-if="totalPrice > 0">Total: {{ totalPrice }} MONEYS</h1>
    </v-container>
    <v-row>
      <v-col
        cols="auto"
        v-for="item in $store.state.productsToBuy"
        :key="item.i"
      >
        <v-card outlined class="pa-3 d-flex flex-column justify-center">
          <h1>{{ item.name }}</h1>
          <p>Price:</p>
          <v-text-field type="calc" v-model="item.price"></v-text-field>
          <v-btn color="pink" outlined @click="() => handlePurchase(item)">
            <v-icon color="pink">shopping_cart</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  methods: {
    handlePurchase(item) {
      this.$store.commit("addToCart", item);
      this.$store.commit("removeFromToBuyList", item);
    },
  },
  computed: {
    totalPrice() {
      return this.$store.state.currentCart.reduce((acc, item) => {
        return acc + parseFloat(item.price.replace(",", "."));
      }, 0);
    },
  },
};
</script>

<style></style>
