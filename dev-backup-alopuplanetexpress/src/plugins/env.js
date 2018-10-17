// import something here

// leave the export, even if you don't use it
window.env = process.env
let env = process.env
export default ({ app, router, Vue }) => {
	// Vue.$env = p.env
	env.install = function(){
		Object.defineProperty(Vue.prototype, '$env', {
			get () { return env }
		})
	}
	Vue.use(env);
}
