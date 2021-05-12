<template>
	<div>
		<h1>Refund</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem exercitationem nemo officia suscipit! Aperiam eveniet iste nesciunt quam qui?</p>
		<form @submit.prevent="SendMessage" class="text-left">
			<div class="form-group">
				<input class="" type="text" placeholder="Name">
			</div>
			<div class="form-group">
				<input type="email" placeholder="email">
			</div>
			<div class="form-group">
				<textarea placeholder="What is the reason?"></textarea>
			</div>
			<div class="form-group">
				<button type="submit" class="btn btn-maincolor">Send</button>
			</div>
		</form>

		<Notice
			v-if="isSubmit"
			:message="message"
		/>
	</div>
</template>

<script>
import Notice from '../components/mwt-notice-component'

export default {
	name: "mwt-refund-form-component",
	data(){
		return{
			isSubmit: false,
			message: 'Your message send'
		}
	},
	methods: {
		SendMessage(){
			this.isSubmit = true;
			setTimeout(()=> {
				this.isSubmit = false;
				this.$router.push('/')
			}, 5000)
		}
	},
	components: {
		Notice
	}
}
</script>

<style scoped>

</style>