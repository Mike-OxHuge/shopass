<template>
	<v-container style="height: 95vh">
		<v-row justify="center" class="my-auto">
			<v-col align-self="center" cols="12" md="6">
				<v-card @click="$emit('selected', 'existing')">
					<v-img height="250" src="/img/grocery.jpg"></v-img>
					<h2 class="text-center my-2">Existing list</h2>
				</v-card>
			</v-col>
			<v-col align-self="center" cols="12" md="6">
				<v-card @click="$emit('selected', 'newlist')">
					<v-img height="250" src="/img/basket.jpg"></v-img>
					<h2 class="text-center my-2">New list</h2>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {}
</script>

<style></style>
