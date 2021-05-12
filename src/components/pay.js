document.addEventListener('DOMContentLoaded', () => {
	'use strict'
	let paymentForm = new SqPaymentForm({
		applicationId: "sandbox-sq0idb-OEOULEFxEaBE8q7TUK7sXQ",
		locationId: "L09EM49DPWYDN",

		// Initialize Web Apple Pay placeholder ID
		applePay: {
			elementId: 'sq-apple-pay'
		},
		// Initialize Google Pay button ID
		googlePay: {
			elementId: 'sq-google-pay'
		},

		callbacks: {
			cardNonceResponseReceived: function (errors, nonce, cardData) {
				if (errors) {
					// Log errors from nonce generation to the browser developer console.
					console.error('Encountered errors:');
					errors.forEach(function (error) {
						console.error('  ' + error.message);
					});
					alert('Encountered errors, check browser developer console for more details');
					return;
				}
				//TODO: Replace alert with code in step 2.1
				alert(`The generated nonce is:\n${nonce}`);
			},
			methodsSupported: function (methods, unsupportedReason) {
				console.log(methods);

				var applePayBtn = document.getElementById('sq-apple-pay');
				// Only show the button if Apple Pay on the Web is enabled
				// Otherwise, display the wallet not enabled message.
				if (methods.applePay === true) {
					applePayBtn.style.display = 'inline-block';
				} else {
					console.log(unsupportedReason);
				}

				var googlePayBtn = document.getElementById('sq-google-pay');

				// Only show the button if Google Pay on the Web is enabled
				if (methods.googlePay === true) {
					googlePayBtn.style.display = 'inline-block';
				} else {
					console.log(unsupportedReason);
				}
			},
			/*
			 * callback function: createPayment Request
			 * Triggered when: a digital wallet payment button is clicked.
			 * returns a PaymentRequestObject from your custom helper function
			 */
			createPaymentRequest: function () {
				var paymentRequestJson = {
					requestShippingAddress: true,
					requestBillingInfo: true,
					shippingContact: {
						familyName: "CUSTOMER LAST NAME",
						givenName: "CUSTOMER FIRST NAME",
						email: "mycustomer@example.com",
						country: "USA",
						region: "CA",
						city: "San Francisco",
						addressLines: [
							"1455 Market St #600"
						],
						postalCode: "94103",
						phone: "14255551212"
					},
					currencyCode: "USD",
					countryCode: "US",
					total: {
						label: "MERCHANT NAME",
						amount: "0.01",
						pending: false
					},
					lineItems: [
						{
							label: "Subtotal",
							amount: "60.00",
							pending: false
						},
						{
							label: "Shipping",
							amount: "19.50",
							pending: true
						},
						{
							label: "Tax",
							amount: "5.50",
							pending: false
						}
					],
					shippingOptions: [
						{
							id: "1",
							label: "SHIPPING LABEL",
							amount: "SHIPPING COST"
						}
					]
				};

				return paymentRequestJson;
			}
		}
	});
	paymentForm.build();
})