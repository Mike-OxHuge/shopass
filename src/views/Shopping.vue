<template>
  <v-main>
    <v-container d-flex justify-space-around>
      <h2 class="text-left" v-if="$store.state.productsToBuy.length > 0">
        Things to buy:
      </h2>
      <h2 class="text-right" v-if="totalPrice > 0">
        Total: {{ totalPrice }} MONEYS
      </h2>
    </v-container>
    <v-row justify="center">
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
    <v-btn color="green" outlined block class="mt-15" @click="$router.push('/')"
      >Back home</v-btn
    >
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
        let price =
          item.price === undefined
            ? 0
            : parseFloat(item.price.replace(",", "."));
        return acc + price;
      }, 0);
    },
  },
};
</script>

<style></style>
