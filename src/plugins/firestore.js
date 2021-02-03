// /src/plugins/firestore.js
// import something here
import firebase from 'firebase'
import 'firebase/firestore'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
	var firebaseApp
	if(!firebase.apps.length){
		firebaseApp = firebase.initializeApp(config)
	} else {
		firebaseApp = firebase.app()
	}
	
	var fs = initFirestore()
	
	Vue.$fs = fs
	
	function initFirestore(){
		const config = {
			apiKey: "AIzaSyCEk1mYB5aXFjYZUzwhyTF-blYDrIDqTRk",
			authDomain: "lopu-f3969.firebaseapp.com",
			databaseURL: "https://lopu-f3969.firebaseio.com",
			projectId: "lopu-f3969",
			storageBucket: "lopu-f3969.appspot.com",
			messagingSenderId: "299513605828",
			appId: "1:299513605828:web:1f42487525d73e00"
		}
		const settings = {
			timestampsInSnapshots: true
		}
	
		if(!firebase.apps.length){
			firebase.initializeApp(config)
		} else {
			// F = firebase.app()
		}
		var fs = firebase.firestore() // firestore
		fs.settings(settings)
		fs.SetOptions = {merge: true}
		return fs
	
	}
}
