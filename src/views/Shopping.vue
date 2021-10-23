<template>
	<v-main>
		<v-container d-flex justify-space-around>
			<h2 v-if="$store.state.productsToBuy.length > 0" class="text-left">
				Things to buy:
			</h2>
			<!-- <h2 v-if="totalPrice > 0" class="text-right">
				Total: {{ totalPrice }} MONEYS
			</h2> -->
			<div class="text-center">
				<v-dialog v-model="isCurrentCartShown" width="500">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
							Items in cart: {{ $store.state.currentCart.length }}
						</v-btn>
					</template>

					<v-card>
						<v-card-title class="text-h5 grey lighten-2">
							Total: {{ totalPrice }} 💰
						</v-card-title>

						<v-card-text>
							<v-list>
								<v-list-item
									three-line
									v-for="product in $store.state.currentCart"
									:key="product.i"
								>
									<v-list-item-content>
										<v-list-item-title>✅ {{ product.name }}</v-list-item-title>
										<v-list-item-subtitle>
											{{
												product.quantity
													? product.quantity
													: product.unit
													? 'few'
													: 'some uncertain amount'
											}}
											{{ product.unit ? product.unit : '' }}
										</v-list-item-subtitle>
										<v-list-item-subtitle>
											💸
											{{
												parseFloat(product.price) > 0
													? product.price + ' EUR'
													: 'price not set'
											}}
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="isCurrentCartShown = false">
								Close
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</div>
		</v-container>
		<v-text-field
			placeholder="filter"
			class="px-4"
			v-model="query"
			clearable
		></v-text-field>
		<v-row justify="center" class="mx-1" max-width="100%">
			<v-col v-for="item in arrayToMap" :key="item.i" cols="6">
				<v-card outlined class="pa-3 d-flex flex-column justify-center">
					<h3>
						{{
							`${
								item.quantity > 0 ? item.quantity + item.unit + ' of ' : 'some '
							} ${item.name}`
						}}
					</h3>
					<p>Price:</p>
					<v-text-field v-model="item.price" type="calc"></v-text-field>
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
			isCurrentCartShown: false,
			query: '',
		}
	},
	computed: {
		totalPrice() {
			// return this.$store.state.currentCart.reduce((acc, item) => {
			// 	let price = item.price.replace(',', '.')
			// 	price = !item.price ? 0 : parseFloat(item.price)
			// 	return acc + price
			// }, 0)
			let originalArray = this.$store.state.currentCart
			let price = []
			originalArray.forEach((e) => price.push(e.price.replace(',', '.')))
			const add = (a, b) =>
				parseFloat(a) === parseFloat(a) && parseFloat(b) === parseFloat(b)
					? parseFloat(a) + parseFloat(b)
					: 0
			price = price.filter((e) => add(e, 0) !== 0)
			return price.reduce(add, 0)
		},
		currentCart() {
			return this.$store.state.currentCart
		},
		filteredArray() {
			return this.$store.state.productsToBuy.filter((item) => {
				return item.name.toLowerCase().includes(this.query.toLowerCase())
			})
		},
		arrayToMap() {
			return this.filteredArray.length !== 0
				? this.filteredArray.filter((item) => item.name.includes(this.query))
				: this.$store.state.productsToBuy
		},
	},
	methods: {
		handlePurchase(item) {
			this.$store.commit('addToCart', item)
			this.$store.commit('removeFromToBuyList', item)
			this.query = ''
		},
	},
}
</script>

<style></style>
