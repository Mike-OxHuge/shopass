<template>
	<v-main>
		<v-container fluid d-flex justify-space-between align-baseline px-0>
			<v-text-field
				dense
				placeholder="amount"
				type="tel"
				v-model="item.quantity"
			></v-text-field>
			<v-divider class="mx-2"></v-divider>
			<v-autocomplete
				v-model="item.unit"
				:items="units"
				placeholder="unit"
				dense
				auto-select-first
			></v-autocomplete>
		</v-container>
		<v-text-field
			placeholder="write an item name and click +"
			outlined
			v-model="item.name"
		>
			<template v-slot:append v-if="item.name.length > 0">
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
						<span
							>{{
								`${
									!product.quantity
										? !product.unit
											? 'some'
											: 'few ' + product.unit + ' of '
										: product.quantity + ' ' + product.unit + ' of '
								} ${product.name}`
							}}
						</span>
						<!-- <span v-if="product.unit !== ''">in {{ product.unit }}</span> -->
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
			units: ['kg', 'packs', 'pcs'],
			item: {
				name: '',
				price: '',
				unit: '',
				quantity: null,
			},
		}
	},
	methods: {
		checker() {
			this.$store.commit('addItem', this.item)
			this.item = {
				name: '',
				price: '',
				unit: '',
				quantity: null,
			}
		},
		clearList() {
			this.$store.commit('clearList')
			console.log(this.$store.state.currentList.length)
		},
		deleteItem(product) {
			this.$store.commit('deleteItem', product)
		},
	},
	computed: {
		items() {
			let foo = this.$store.state.currentList
			return foo.reverse()
		},
	},
}
</script>

<style></style>
