<template>
	<main>
		<h1>Zoom WebSDK Sample Vue.js 2</h1>
		<button @click="getSignature">Join Meeting</button>
	</main>
</template>

<script>
// import axios from "axios";

export default {
	name: 'HelloWorld',
	created() {
		this.ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.1/lib', '/av');
		this.ZoomMtg.preLoadWasm();
		this.ZoomMtg.prepareJssdk();
		this.signature = this.ZoomMtg.generateSignature({
			apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkVsT2ZLZnM4UzBpUkdyWXFFTHlrNXciLCJleHAiOjE2MjA2Mzg3ODMsImlhdCI6MTYyMDYzMzM4M30.eQg52xaQIu_ffxrsW4nJq5jiQUlFtjcaXlJwnTi5Zps",
			apiSecret: "rlwzMPUmsSDjHxQWGtbxKOMiiaXDGMFd8EIn",
			meetingNumber: 9580898596,
			role: 0,
			success: function (res) {
				console.log("success signature: " + res.result);
			},
			error: function (error) {
				console.log("error signature: " + error.result);
			}
		})
	},
	mounted() {
		this.ZoomMtg.inMeetingServiceListener("onUserJoin", (data) => {
			console.log("inMeetingServiceListener onUserJoin", data);
		});
	},
	data() {
		return {
			signatureEndPoint: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IkVsT2ZLZnM4UzBpUkdyWXFFTHlrNXciLCJleHAiOjE2MjA2Mzg3ODMsImlhdCI6MTYyMDYzMzM4M30.eQg52xaQIu_ffxrsW4nJq5jiQUlFtjcaXlJwnTi5Zps',
			signature: '',
			meetConfig: {
				apiKey: "ElOfKfs8S0iRGrYqELyk5w",
				apiSecret: "rlwzMPUmsSDjHxQWGtbxKOMiiaXDGMFd8EIn",
				leaveUrl: 'http://localhost:8080',
				meetingNumber: "9580898596",
				passWord: "",
				role: 0,
				userEmail: "",
				userName: "Admin",
			}
		}
	},
	methods: {
		getSignature() {
			document.getElementById("zmmtg-root").style.display = "block";
			this.ZoomMtg.init({
				leaveUrl: this.meetConfig.leaveUrl,
				isSupportAV: true,
				success: (success) => {
					console.log(success);
					this.ZoomMtg.join({
						meetingNumber: this.meetConfig.meetingNumber,
						userName: this.meetConfig.userName,
						apiKey: this.meetConfig.apiKey,
						userEmail: this.meetConfig.userEmail,
						passWord: this.meetConfig.passWord,
						signature: this.signature,
						success: (success) => {
							console.log(success);
						},
						error: (error) => {
							console.log(error);
						}
					});
				},
				error: (error) => {
					console.log(error);
				}
			});
		},
		// getSignature() {
		// 	axios.post(this.signatureEndPoint, {
		// 		meetingNumber: this.meetingNumber,
		// 		role: this.role
		// 	})
		// 		.then(res => {
		// 			console.log(res.data.signature);
		// 			this.startMeeting(res.data.signature);
		// 		})
		// 		.catch(error => {
		// 			console.log(error);
		// 		});
		// },
		// startMeeting(signature) {
		// 	document.getElementById("zmmtg-root").style.display = "block";
		// 	this.ZoomMtg.init({
		// 		leaveUrl: this.leaveUrl,
		// 		isSupportAV: true,
		// 		success: (success) => {
		// 			console.log(success);
		// 			this.ZoomMtg.join({
		// 				meetingNumber: this.meetingNumber,
		// 				userName: this.userName,
		// 				signature: signature,
		// 				apiKey: this.apiKey,
		// 				userEmail: this.userEmail,
		// 				passWord: this.passWord,
		// 				success: (success) => {
		// 					console.log(success);
		// 				},
		// 				error: (error) => {
		// 					console.log(error);
		// 				}
		// 			});
		// 		},
		// 		error: (error) => {
		// 			console.log(error);
		// 		}
		// 	});
		// }
	}
}
</script>
