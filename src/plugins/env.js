// import something here

// leave the export, even if you don't use it
window.env = process.env
export default ({ app, router, Vue }) => {
	env.install = function(){
		Object.defineProperty(Vue.prototype, '$env', {
			get () { return {
					api: process.env.api 
				}
			}
		})
	}
	Vue.use(env);
}
