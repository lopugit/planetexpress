// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCEk1mYB5aXFjYZUzwhyTF-blYDrIDqTRk",
	authDomain: "lopu-f3969.firebaseapp.com",
	databaseURL: "https://lopu-f3969.firebaseio.com",
	projectId: "lopu-f3969",
	storageBucket: "lopu-f3969.appspot.com",
	messagingSenderId: "299513605828",
appId: "1:299513605828:web:1f42487525d73e00"
}
if(!firebase.apps.length){
	firebase.initializeApp(config)
} else {
	// F = firebase.app()
}

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
	} else {
		firebaseApp = firebase.app()
	}
	firebase.auth().useDeviceLanguage()
	// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
	// 	'size': 'invisible',
	// 	'callback': function(response) {
	// 		// reCAPTCHA solved, allow signInWithPhoneNumber.
	// 		onSignInSubmit();
	// 	}
	// })
	Vue.$fb = firebase
}
