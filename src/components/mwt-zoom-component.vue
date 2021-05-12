<template>
	<main>
		<h1>Use this link to connect</h1>
		<button class="btn btn-maincolor" @click="initMeeting">Join Meeting</button>
		<button @click="leaveMeetingCustom" id="refundBtn" class="btn btn-maincolor" v-if="refundBtnIsActive">Refund Now</button>
	</main>
</template>

<script>
import {ZoomMtg} from "@zoomus/websdk";
import crypto from "crypto"
import {setCookie} from "../utils/cookie";

export default {
	name: "Zoom",
	created() {
		ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
		ZoomMtg.preLoadWasm();
		ZoomMtg.prepareJssdk();
	},
	data() {
		return {
			refund: true,
			apiKey: 'ElOfKfs8S0iRGrYqELyk5w',
			apiSecret: 'rlwzMPUmsSDjHxQWGtbxKOMiiaXDGMFd8EIn',
			meetingNumber: 84511986216,
			role: 0,
			leaveUrl: '/thanks', // our redirect url
			userName: 'WebSDK',
			userEmail: 'admin@test.com',
			passWord: '48G9Yh',
			signature: '', //need to generate based on meeting id - using node
			refundBtnIsActive: false,
		}
	},
	mounted() {

		ZoomMtg.inMeetingServiceListener("onUserJoin", (data) => {
			console.log("inMeetingServiceListener onUserJoin", data);
			this.refundBtnIsActive = true
			// this.refund = false
			console.log(this.leaveUrl)
			setTimeout(() => {
				this.refundBtnIsActive = false
			}, 10000)
		});

		ZoomMtg.inMeetingServiceListener('onUserLeave', function (data) {
			console.log('inMeetingServiceListener onUserLeave', data);
		});

		ZoomMtg.inMeetingServiceListener('onUserIsInWaitingRoom', function (data) {
			console.log('inMeetingServiceListener onUserIsInWaitingRoom', data);
		});

		ZoomMtg.inMeetingServiceListener('onMeetingStatus', function (data) {
			console.log('inMeetingServiceListener onMeetingStatus', data);
		});
	},
	methods: {
		leaveMeetingCustom ()  {
			console.log('setCookie');
			setCookie('refund', 'true', {secure: true, 'max-age': 3600});
			ZoomMtg.leaveMeeting({
				success: () => {
					console.log('Refund Now')
				},
				error: err => {
					console.log(err);
				}
			});
		},
		generateSignature(apiKey, apiSecret, meetingNumber, role) {
			const timestamp = new Date().getTime() - 30000
			const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
			const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
			this.signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')
		},
		initMeeting() {
			document.getElementById("zmmtg-root").style.display = "block";
			this.generateSignature(this.apiKey, this.apiSecret, this.meetingNumber, this.role);
			ZoomMtg.init({
				leaveUrl: this.leaveUrl,
				isSupportAV: true,
				success: (success) => {
					console.log(success)

					ZoomMtg.join({
						signature: this.signature,
						meetingNumber: this.meetingNumber,
						userName: this.userName,
						apiKey: this.apiKey,
						userEmail: this.userEmail,
						passWord: this.passWord,
						success: (success) => {
							console.log(success)
						},
						error: (error) => {
							console.log(error)
						}
					})

				},
				error: (error) => {
					console.log(error)
				}
			})
		}
	}
}
</script>

<style>
#refundBtn {
	position: fixed;
	right: 100px;
	bottom: 10px;
	z-index: 9999;
}
</style>