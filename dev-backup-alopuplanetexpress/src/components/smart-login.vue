<template lang='pug'>
	.smart-login
		q-list.no-border.q-pa-sm.q-pt-xl.q-mt-auto.q-mb-auto.full-width.text-white(
			:class=`{
				'flex': true,
				'column': $store.state.alopu.showLoginOptions
			}`
			)
			//- q-item.full-width.q-pa-no.q-mb-xsmd(
				id="firebaseui-auth-container"
				)
			q-item.full-width.q-pa-no.q-mb-xsmd(
				v-show="$store.state.alopu.showLoginOptions"
				)
				q-item-main.full-width
					fb-signin-button(
						:params="$store.state.app.fbParams"
						@success="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: true})"
						@error="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: false})"
						) 
						img(
							src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/32c47a476283bf5bb60f88935fc0815a/facebook_white.svg"
							)
						.text() Continue with Facebook
			q-item.full-width.q-pa-no(
				v-show="$store.state.alopu.showLoginOptions"
				)
				q-item-main.full-width
					g-signin-button(
						:params="$store.state.app.googleParams"
						@success="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: true})"
						@error="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: false})"
						) 
						img(
							src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/45eaf69cf1018aa240cea767e822dc96/google_white.svg"
							)
						.text() Continue with Google
			span.or.full-width.q-mt-md.q-mb-md(
				v-show="$store.state.alopu.showLoginOptions"
				) OR
			q-item.full-width.q-pa-no.q-mb-xs(
				v-show="$store.state.alopu.showLoginOptions"
				)
				q-item-main.full-width.p-pa-no.q-ma-no(
					)
					form.full-width.q-pa-no.q-ma-no(
						v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
						)
						q-input.q-mb-sm.no-shadow.border-1.round-borders(
							v-model='entity.alopu.username'
							v-if="($store.state.alopu.entity && $store.state.alopu.entity.alopu) && ($store.state.alopu.entity.alopu.username || $store.state.alopu.entity.alopu.username == undefined || $store.state.alopu.entity.alopu.username == '' || $store.state.alopu.entity.alopu.username.length >= 0) "
							float-label="Username or Email"
							color="white"
							inverted-light
							type="email"
						)
			q-item.full-width.q-pa-no.q-mb-xs(
				v-show="$store.state.alopu.showLoginOptions"
				)
				q-item-main.full-width.p-pa-no.q-ma-no(
					)
					form.full-width.q-pa-no.q-ma-no(
						v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
						)
						q-input.q-mb-sm.no-shadow.border-1.round-borders(
							v-model='entity.alopu.password'
							v-if="($store.state.alopu.entity && $store.state.alopu.entity.alopu) && ($store.state.alopu.entity.alopu.password || $store.state.alopu.entity.alopu.password == undefined || $store.state.alopu.entity.alopu.password == '' || $store.state.alopu.entity.alopu.password.length >= 0) "
							float-label="Password"
							color="white"
							inverted-light
							type="password"
						)
			q-item.full-width.q-pa-no.q-mb-xs(
				v-show="$s.getsmart($store.state.alopu.entity, 'alopu.password.length', 0) > 0 && $store.state.alopu.showLoginOptions && $store.state.alopu.registerable"
				)
				q-item-main.full-width.p-pa-no.q-ma-no(
					)
					form.full-width.q-pa-no.q-ma-no(
						v-on:submit.prevent="$store.dispatch('login', {provider: 'n'})"
						)
						q-input.q-mb-sm.no-shadow.border-1.round-borders(
							v-model='$store.state.alopu.passwordConfirmation'
							float-label="Confirm password"
							color="white"
							inverted-light
							type="password"
						)
			q-item.full-width.q-pa-no.q-mb-xsmd(
				v-if="!$store.getters.loggedIn"
				)
				q-item-main.full-width(
					)
					q-btn.full-width(
						color="primary"
						@click="$store.dispatch('login', {provider: 'alopu'})"
					) {{ $store.state.alopu.registerable == 'haventchecked' ? 'login / register' : $store.state.alopu.registerable ? 'register' : 'login' }}
			q-item.full-width.q-pa-no.q-mb-xsmd(
				v-if="$store.getters.loggedIn"
				)
				q-item-main.full-width.text-tertiary(
				)
					q-btn.full-width(
						color="primary"
						@click="$store.dispatch('logout')"
						) logout
			//- q-item.full-width.q-pa-no.q-mb-xsmd(
				v-if="!$s.getsmart(entity, 'registered', false)"
				)
				q-item-main.full-width.text-tertiary(
					)
					q-btn.full-width(
						color="primary"
						@click="register"
						) register



</template>

<script>
export default {
	name: 'smart-login-comp',
	data () {
		return {
			// objects: null,
			uuid: this._uid
		}
	},
	sockets: {
		connect: function(){
			// console.log("socket connect vue side")
		},
		// giveObjects(data){
		//   // console.log(data)
		//   if(this.uuid == data.id){
		//     this.objects = data.objects
		//   }
		// }
	},
	created () {
		// if(this.count !== 0){
		//   this.getObjects({
		//     count: this.count,
		//     sort: 'alphabetical',
		//     sortDirection: 'ascending',
		//     id: this.uuid
		//   })
		// } else {
		//   this.objects = null
		// }
	},
	methods: {
		// getObjects(opts){
		//   this.$socket.emit('getObjects', opts)
		// }
	},
	props: {
		"siteTitle": {}
	},
	components: {
	},
	computed: {
		entity: {
			get(){
				return this.$s.getsmart(this, '$store.state.alopu.entity', undefined)
			},
			set(entity){
				this.$store.commit('entity', {entity})
			}
		}
	},
	watch: {
		'entity'(){
			this.$store.commit('entity', {entity: this.entity})
		},
		'entity.alopu.username'(){
			console.log('watched')
			if(this.$s.getsmart(this, '$store.state.alopu.showLoginOptions', undefined) && (this.$s.getsmart(this, '$store.state.alopu.entity.alopu.username', false) || this.$s.getsmart(this, '$store.state.alopu.entity.alopu.username', false) == 0)){
				clearTimeout(this.checkusername)
				var that = this
				this.checkusername = setTimeout(function(){
					that.$store.dispatch('checkUsernameAvailability', that.$s.getsmart(that, '$store.state.alopu.entity.alopu.username', undefined))
				}, 200)
			}
		}
		// '$store.state.entity': function(){
		//   this.entity = this.$store.state.entity
		// },
	},  
	route: {
		canActivate(){
			return true
		}
	}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.smart-login
	width: 100%
	max-width: 100%
	overflow: hidden
	// background: $grey
</style>
