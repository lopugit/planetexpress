import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistedState from 'vuex-persistedstate'
import app from './app'
import alopu from './alopu'
import _throttle from 'lodash/throttle';

let smarts = require('smarts')({})
let stateSmarts = require('smarts')({
  vue: {
    store: true
  }
}).methods

Vue.use(Vuex)

window.SS = stateSmarts
window.stateSmarts = stateSmarts
window.resetVuex = window.clearCache = window.clearStorage = function(){ 
	try {
		localStorage.removeItem('vuex')
		console.log('done')
		let stringifiedGraph = localStorage.getItem('vuexSource')
		let graph = smarts.parse(stringifiedGraph)
		
		stateSmarts.setsmart(window, '$store.state.graph.thing', graph.thing)

		localStorage.setItem('vuex', stringifiedGraph)
	} catch(e){
		smarts.setsmart(window, 'errors', [])
		window.errors.push(e)
	}
}

const Store = new Vuex.Store({
	modules: {
		app,
		alopu
	},
	plugins: [
		vuexPersistedState({
			paths: ['app', 'alopu'],
			merge: (obj1,obj2)=>{
				return smarts.schema(obj2,obj1)
			},
			setState: _throttle((key,state,storage)=>{
				let string = smarts.stringify(state)
				storage.setItem(key, string)
			}, 500),
			getState: (key, storage) => {
				// debug
				// let store = storage.getItem(key) || "[]"
				// let ret = smarts.parse(store)
				// return ret
				let ret = {}
				try {
					let localStore = storage.getItem(key)
					if(localStore === null) return {}
					ret = smarts.parse(localStore)
				} catch(err){
					console.error('error parsing persisted state: ', err)
					ret = JSON.parse(storage.getItem(key) || "{}")
				}
				// storage.removeItem(key+'writeLock')
				return ret;
			}
		})
	]
})
// localStorage.removeItem('vuex')

export default Store
