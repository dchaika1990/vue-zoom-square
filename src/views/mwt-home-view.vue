<template>
	<div>
		<Home
			@clickPay="clickPay"
			v-if="!clickBuy && !payment"
		/>
		<Payment
			v-if="clickBuy"
			@payTrue="payHandler"
		/>
		<Zoom
			v-if="payment"
		/>
	</div>
</template>

<script>
import Home from '../components/mwt-home-component.vue'
import Zoom from '../components/mwt-zoom-component.vue'
import Payment from '../components/mwt-payment-component.vue'

export default {
	name: "mwt-home-view",
	data(){
		return {
			clickBuy: false,
			payment: false,
		}
	},
	components: {
		Zoom,
		Payment,
		Home
	},
	methods: {
		clickPay(){
			this.clickBuy = !this.clickBuy;
		},
		payHandler(){
			this.payment = true
			this.clickBuy = false
		}
	},
}
</script>

<style scoped>

</style>