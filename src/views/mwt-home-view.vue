<template>
	<div>
		<Home
			@clickPay="clickPay"
			v-if="!payment"
		/>
		<template v-if="!payment">
			<transition name="slide-fade" >
				<Payment v-if="isAnimate" @payTrue="payHandler"/>
			</transition>
		</template>
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
			isAnimate: false,
			payment: false,
		}
	},
	components: {
		Zoom,
		Payment,
		Home
	},
	mounted() {
		setTimeout(()=> {
			this.isAnimate = true;
		}, 5000)
	},
	methods: {
		payHandler(){
			this.payment = true
		}
	},
}
</script>

<style scoped>

</style>