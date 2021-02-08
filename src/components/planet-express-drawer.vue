<template lang='pug'>
		//- .planet-express-drawer
		q-list.q-flex.q-flex-column
			q-item(
				)
				q-item-side
					q-item-tile(
						avatar
						sparse
						@click="$store.dispatch('toggleMainDrawer')"
						).q-item-tile-profile-picture
						//- :style=`{
						//-   height: '50px',
						//-   width: 'auto'
						//- }`
						img.q-square-img.round-borders(
							:src=`$store.getters.cover()`
							)
				q-item-main(
				)
					q-item-tile(
						label
						:style={
							'text-transform': 'capitalize'
						}
					) {{ $store.getters.username() }}
					q-item-tile(
						sublabel
						size=".5rem"
						) {{ $store.getters.ego(0) }}
				q-item-side(
					)
					q-btn(
						icon="close"
						@click="mainDrawer = !mainDrawer"
					).shadow-0
			q-item-separator
			q-item(
				)
				q-item-side.q-square-img.q-br-xs(
					avatar="statics/box.png"
				)
				q-item-main(
					label="Inventory"
					)
				//- q-item-side(
				//- 	avatar="statics/question-yellow.png"
				//- ).q-verified-status
			q-item-separator
			q-collapsible(
				label="Tracking"
				avatar="statics/gps.png"
				)
				//- q-item(
					)
					q-item-main(
						label="Requested Jobs"
						)
				q-item(
					)
					q-item-main(
						label="Awaiting Pickup"
						)
				q-item(
					)
					q-item-main(
						label="Picked Up"
						)
				q-item(
					)
					q-item-main(
						label="En Route"
						)
				q-item(
					)
					q-item-main(
						label="Delivered"
						)
				q-item(
					)
					q-item-main(
						label="Routes"
						)
				q-item(
					)
					q-item-main(
						label="ETA's"
						)
				q-item(
					)
					q-item-main(
						label="Your Pilots"
						)
				q-item(
					)
					q-item-main(
						label="View Map"
						)
			q-item-separator
			q-collapsible(
				label="Notifications"
				avatar="statics/bell.png"
				)
				//- q-item(
					)
					q-item-main(
						label="Requested Jobs"
						)
				q-collapsible(
					label="Messages"
					)
				q-item(
					)
					q-item-main(
						label="Picked Up"
						)
				q-item(
					)
					q-item-main(
						label="Delivered"
						)
				q-item(
					)
					q-item-main(
						label="ETA's"
						)
				q-item(
					)
					q-item-main(
						label="Delays"
						)
				q-item(
					)
					q-item-main(
						label="Discounts"
						)
				q-item(
					)
					q-item-main(
						label="Surges"
						)
				// Driver Only
				q-collapsible(
					label="New Jobs"
					avatar="statics/a2b.png"
					)
			q-item-separator
			q-collapsible(
				label="Driver Hub"
				avatar="statics/van.png"
				)
				q-collapsible(
					avatar="statics/next-stop.png"
					label="Next Stop"
					)
					q-item-side()
					q-item-main(
						label="23 Conley St, Place Holder, 3174"
					)
				q-collapsible(
					avatar="statics/route.png"
					label="Current Route"
					)
					q-item(
					)
						q-item-main(
							label="Stop A"
						)
					q-item(

					)
						q-item-main(
							label="Stop B"
						)
					q-item(
					)
						q-item-main(
							label="Stop C (break)"
						)
					q-item(
					) 
						q-item-main(
							label="Stop D"
						)
				q-collapsible(
					avatar="statics/routes.png"
					label="All Routes"
					)
				q-item(
					)
					q-item-side(
						avatar="statics/sleep.png"
					)
					q-item-main(
						label="Rests"
						)
					q-item-side(
						avatar="statics/question-yellow.png"
					).q-verified-status
				q-collapsible(
					avatar="statics/van.png"
					label="Your vehicle"
					)
				q-item(
					)
					q-item-side(
						avatar="statics/box.png"
					)
					q-item-main(
						label="Current Inventory"
						)
					q-item-side(
						avatar="statics/question-yellow.png"
					).q-verified-status
				q-collapsible(
					label="New Jobs"
					avatar="statics/a2b.png"
					) 
				current-location-nav
			q-item-separator
			q-collapsible(
				label="profile"
				avatar="statics/astronaut.png"
				)
				current-location-nav
				q-collapsible(
					label="Identity"
					avatar="statics/identification.png"
					)
					
					//- q-collapsible(
						avatar="statics/license-plate.png"
						label="Identification"
						)
					q-collapsible(
						avatar="statics/license.png"
						label="Licenses"
						)
						q-item(
						)
							q-item-side(
								avatar="statics/license.png"
							)
							q-item-main(
								label="Car License"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-item(
						)
							q-item-side(
								avatar="statics/license.png"
							)
							q-item-main(
								label="Truck License"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-item(
						)
							q-item-side(
								avatar="statics/license.png"
							)
							q-item-main(
								label="Boat License"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-item(
						)
							q-item-side(
								avatar="statics/license.png"
							)
							q-item-main(
								label="PWC License"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-item(
						)
							q-item-side(
								avatar="statics/license.png"
							)
							q-item-main(
								label="Aircraft License"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
					q-item(
					)
						q-item-side(
							avatar="statics/birth-certificate.png"
						)
						q-item-main(
							label="Birth Certificate"
						)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-item(
					)
						q-item-side(
							avatar="statics/passport.png"
						)
						q-item-main(
							label="Passport"
						)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-collapsible(
						label="Documents"
						avatar="statics/documents.png"
					)
							q-item(
							)
								q-item-side(
									avatar="statics/documents.png"
								)
								q-item-main(
									label="Utility Bill 1"
								)
								q-item-side(
									avatar="statics/wrong-thick.png"
								).q-verified-status
							q-item(
							)
								q-item-side(
									avatar="statics/documents.png"
								)
								q-item-main(
									label="Utility Bill 2"
								)
								q-item-side(
									avatar="statics/wrong-thick.png"
								).q-verified-status
							q-item(
							)
								q-item-side(
									avatar="statics/documents.png"
								)
								q-item-main(
									label="Utility Bill 3"
								)
								q-item-side(
									avatar="statics/wrong-thick.png"
								).q-verified-status
						
					q-item(
						)
						q-item-side(
							avatar="statics/license-plate.png"
						)
						q-item-main(
							label="Registration"
							)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-item(
						)
						q-item-side(
							avatar="statics/contract.png"
						)
						q-item-main(
							label="Insurance"
							)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-item(
						)
						q-item-side(
							avatar="statics/cap.png"
						)
						q-item-main(
							label="Police Check"
							)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-item(
						)
						q-item-side(
							avatar="statics/group.png"
						)
						q-item-main(
							label="Interview"
							)
						q-item-side(
							avatar="statics/wrong-thick.png"
						).q-verified-status
					q-collapsible(
						avatar="statics/certificate.png"
						label="Qualifications"
					)
						q-item(
							)
							q-item-side(
								avatar="statics/certificate.png"
							)
							q-item-main(
								label="Working with Children"
								)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-item(
							)
							q-item-side(
								avatar="statics/certificate.png"
							)
							q-item-main(
								label="RSA"
								)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						
						
			q-item-separator(
				)
			q-collapsible(
				label="Business Hub"
				avatar="statics/store.png"
				)
				q-item(
					)
					q-item-side(
						avatar="statics/store.png"
					)
					q-item-main(
						label="Your store"
						)
					q-item-side(
						avatar="statics/question-yellow.png"
					).q-verified-status
				q-item(
					)
					q-item-side(
						avatar="statics/box.png"
					)
					q-item-main(
						label="Current Inventory"
						)
					q-item-side(
						avatar="statics/question-yellow.png"
					).q-verified-status
				
			q-item-separator
			q-collapsible(
				label="Settings"
				)
			q-item-separator
			q-collapsible(
				label="More"
				)
				q-item(
					)
					q-item-main(
						label="Terms and Conditions"
						)
				q-item(
					)
					q-item-main(
						label="Insurance"
						)
				q-item(
					)
					q-item-main(
						label="Legal"
						)
			q-list.no-border.q-pa-sm.q-pt-xl.q-mt-auto.q-mb-auto.full-width.text-white(
				:class=`{
					'flex': true,
					'column': showLoginOptions
				}`
				)
				q-item.full-width.q-pa-no.q-mb-xsmd(
					v-show="showLoginOptions"
					)
					q-item-main.full-width
						fb-signin-button(
							:params="fbParams"
							@success="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: true})"
							@error="res => $store.dispatch('login', {token: Object.assign({provider: 'facebook'}, res), provider: 'facebook', success: false})"
							) 
							img(
								src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/32c47a476283bf5bb60f88935fc0815a/facebook_white.svg"
								)
							.text() Continue with Facebook
				q-item.full-width.q-pa-no(
					v-show="showLoginOptions"
					)
					q-item-main.full-width
						g-signin-button(
							:params="googleParams"
							@success="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: true})"
							@error="res => $store.dispatch('login', {token: Object.assign({provider: 'google'}, res), provider: 'google', success: false})"
							) 
							img(
								src="https://dy6j70a9vs3v1.cloudfront.net/funnel_wap/static/files/45eaf69cf1018aa240cea767e822dc96/google_white.svg"
								)
							.text() Continue with Google
				span.or.full-width.q-mt-md.q-mb-md(
					v-show="showLoginOptions"
					) OR
				q-item.full-width.q-pa-no.q-mb-xs(
					v-show="showLoginOptions"
					)
					q-item-main.full-width.p-pa-no.q-ma-no(
						)
						form.full-width.q-pa-no.q-ma-no(
							v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
							)
							q-input.q-mb-sm.no-shadow.border-1.round-borders(
								v-model='$store.state.alopu.entity.alopu.username'
								v-if="(entity && entity.alopu) && (entity.alopu.username || entity.alopu.username == undefined || entity.alopu.username == '' || entity.alopu.username.length >= 0) "
								float-label="Username or Email"
								color="white"
								inverted-light
								type="email"
							)
				q-item.full-width.q-pa-no.q-mb-xs(
					v-show="showLoginOptions"
					)
					q-item-main.full-width.p-pa-no.q-ma-no(
						)
						form.full-width.q-pa-no.q-ma-no(
							v-on:submit.prevent="$store.dispatch('login', {provider: 'alopu'})"
							)
							q-input.q-mb-sm.no-shadow.border-1.round-borders(
								v-model='$store.state.alopu.entity.alopu.password'
								v-if="(entity && entity.alopu) && (entity.alopu.password || entity.alopu.password == undefined || entity.alopu.password == '' || entity.alopu.password.length >= 0) "
								float-label="Password"
								color="white"
								inverted-light
								type="password"
							)
				q-item.full-width.q-pa-no.q-mb-xs(
					v-show="$s.getsmart(entity, 'alopu.password.length', 0) > 0 && showLoginOptions && $store.state.alopu.registerable"
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
import currentLocationNav from 'src/components/current-location-nav'
export default {
	name: 'planet-express-drawer-comp',
	data () {
		return {
			// objects: null,
			uid: this._uid,
			fbParams: {
				scope: 'email,public_profile',
				return_scopes: true
			},
			googleParams: {
				client_id: '211744308643-qbndqa7gutacqbkh0jrre05ihvdlfquv.apps.googleusercontent.com'
			}
		}
	},
	sockets: {
		connect: function(){
			// console.log("socket connect vue side")
		},
		// giveObjects(data){
		//   // console.log(data)
		//   if(this.uid == data.id){
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
		//     id: this.uid
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
	computed: {
		entity: {
			get(){
				return this.$store.state.alopu.entity
			},
			set(val){
				this.$store.commit('entity', {entity: val})
			}
		},
		showLoginOptions: {
			get(){
				if(this.$store.getters.loggedIn){
					return false
				} else {
					return this.$store.state.app.showLoginOptions
				}
			},
			set(val){
				this.$store.commit('showLoginOptions', val)
			}
		},
		mainDrawer: {
			get(){
				return this.$store.state.app.mainDrawer
			},
			set(val){
				this.$store.commit('mainDrawer', val)
			}
		},

	},
	components: {
		currentLocationNav
	},
	watch: {
		'$store.state.app.showLoginOptions'(){
			this.showLoginOptions = this.$store.state.app.showLoginOptions
		},
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
.planet-express-drawer
	width: 100%
	max-width: 100%
	overflow: hidden
	display: flex
	align-items: flex-start
	justify-content: flex-start
	padding: 0
	margin: 0
	// background: $grey
</style>
