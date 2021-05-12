<template>
	<div>
		<h1>Thank you!!!</h1>
	</div>
</template>

<script>
import {setCookie, getCookie} from "../utils/cookie";

export default {
	name: "mwt-thanks-view",
	beforeCreate() {
		if (getCookie('refund') === 'true'){
			console.log('/refund')
			this.$router.push('/thanks/refund')
			setCookie('refund', 'false')
		}
	}
}
</script>

<style scoped>

</style>