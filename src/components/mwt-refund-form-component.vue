<template>
	<div>
		<h1>Refund</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur dolorem exercitationem nemo officia
			suscipit! Aperiam eveniet iste nesciunt quam qui?</p>
<form method="POST" @submit.prevent="SendMessage" class="text-left" novalidate>
	<div class="form-group">
		<input
			type="text"
			placeholder="Name"
			name="name"
			v-model.trim="name"
			:class="{invalid: $v.name.$dirty && !$v.name.required }"
		>
		<small
			class="helper-text invalid"
			v-if="$v.name.$dirty && !$v.name.required"
		>
			The name field must not be empty
		</small>
	</div>
	<div class="form-group">
		<input
			type="email"
			name="email"
			placeholder="email"
			v-model.trim="email"
			:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email) }"
		>
		<small
			class="helper-text invalid"
			v-if="$v.email.$dirty && !$v.email.required"
		>
			The email field must not be empty
		</small>
		<small
			class="helper-text invalid"
			v-else-if="$v.email.$dirty && !$v.email.email"
		>
			Please enter a valid email
		</small>
	</div>
	<div class="form-group">
		<textarea
			name="message"
			placeholder="What is the reason?"
			v-model.trim="message"
			:class="{invalid: ($v.message.$dirty && !$v.message.required) || ($v.message.$dirty && !$v.message.minLength) }"
		></textarea>
		<small
			class="helper-text invalid"
			v-if="$v.message.$dirty && !$v.message.required"
		>
			The message field must not be empty
		</small>
		<small
			class="helper-text invalid"
			v-if="$v.message.$dirty && !$v.message.minLength"
		>
			The message must be longer than {{ $v.message.$params.minLength.min }} symbols
		</small>
	</div>
	<div class="form-group">
		<input type="hidden" name="tokenKey" v-model.trim="token">
		<button type="submit" name="submit" class="btn btn-maincolor">Send</button>
	</div>
</form>

		<Notice
			v-if="isSubmit"
			:message="noticeMessage"
		/>
	</div>
</template>

<script>
import Notice from '../components/mwt-notice-component'
import {email, required, minLength} from 'vuelidate/lib/validators'
import emailjs from 'emailjs-com';
import {getCookie} from "../utils/cookie";

export default {
	name: "mwt-refund-form-component",
	data() {
		return {
			token: getCookie('tokenKey'),
			name: '',
			email: '',
			message: '',
			isSubmit: false,
			noticeMessage: 'Your message send'
		}
	},
	validations: {
		email: {email, required},
		name: {required},
		message: {required, minLength: minLength(8)},
	},
	methods: {
		SendMessage(e) {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}

			try {
				emailjs.sendForm('service_41vyjcn', 'template_r9b3twv', e.target, 'user_cCzdvyiYKhQgJPyOFrBoQ', {
					name: this.name,
					email: this.email,
					message: this.message
				})

				this.name = '';
				this.email = '';
				this.message = '';

				this.isSubmit = true;
				setTimeout(() => {
					this.isSubmit = false;
					this.$router.push('/')
				}, 5000)

			} catch (error) {
				console.log({error})
			}
		}
	},
	components: {
		Notice
	}
}
</script>

<style scoped>

</style>