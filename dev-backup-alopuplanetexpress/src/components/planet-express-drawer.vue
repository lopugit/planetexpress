<template lang='pug'>
		//- .planet-express-drawer
		q-layout-drawer(
			v-model="mainDrawer"
			side="left"
			:overlay="true"
			).z-top.q-flex.q-flex-column
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
							@click="$store.dispatch('toggleMainDrawer')"
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
				q-collapsible.q-square-img(
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
				q-collapsible.q-square-img(
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
					q-collapsible.q-square-img(
						label="New Jobs"
						avatar="statics/a2b.png"
						)
				q-item-separator
				// Driver Hub
				q-collapsible.q-square-img(
					label="Driver Hub"
					avatar="statics/van.png"
					)
					q-collapsible.q-square-img(
						avatar="statics/next-stop.png"
						label="Next Stop"
						)
						q-item-side()
						q-item-main(
							label="23 Conley St, Place Holder, 3174"
						)
					q-collapsible.q-square-img(
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
					q-collapsible.q-square-img(
						avatar="statics/routes.png"
						label="All Routes"
						)
					q-collapsible(
						avatar="statics/sleep.png"
						label="Rests"
						)
					q-collapsible.q-square-img(
						avatar="statics/van.png"
						label="Your vehicle"
						)
					q-item(
						)
						q-item-side.q-square-img(
							avatar="statics/box.png"
						)
						q-item-main(
							label="Current Inventory"
							)
					q-collapsible.q-square-img(
						label="New Jobs"
						avatar="statics/a2b.png"
						) 
					current-location-nav
				q-item-separator
				// Business Hub
				q-collapsible.q-square-img(
					label="Business Hub"
					avatar="statics/store.png"
					)
					q-item(
						)
						q-item-side.q-square-img(
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
						q-item-side.q-square-img(
							avatar="statics/box.png"
						)
						q-item-main(
							label="Current Inventory"
							)
					
				q-item-separator(
					)
				
				// Profile
				q-collapsible.q-square-img(
					label="Profile"
					avatar="statics/astronaut.png"
					)
					current-location-nav
					q-collapsible.q-square-img(
						label="Identity"
						avatar="statics/identification.png"
						)
						
						//- q-collapsible(
							avatar="statics/license-plate.png"
							label="Identification"
							)
						q-collapsible.q-square-img(
							avatar="statics/license.png"
							label="Licenses"
							)
							q-item(
							)
								q-item-side.q-square-img(
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
								q-item-side.q-square-img(
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
								q-item-side.q-square-img(
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
								q-item-side.q-square-img(
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
								q-item-side.q-square-img(
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
							q-item-side.q-square-img(
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
							q-item-side.q-square-img(
								avatar="statics/passport.png"
							)
							q-item-main(
								label="Passport"
							)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-collapsible.q-square-img(
							label="Documents"
							avatar="statics/documents.png"
						)
								q-item(
								)
									q-item-side.q-square-img(
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
									q-item-side.q-square-img(
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
									q-item-side.q-square-img(
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
							q-item-side.q-square-img(
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
							q-item-side.q-square-img(
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
							q-item-side.q-square-img(
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
							q-item-side.q-square-img(
								avatar="statics/group.png"
							)
							q-item-main(
								label="Interview"
								)
							q-item-side(
								avatar="statics/wrong-thick.png"
							).q-verified-status
						q-collapsible.q-square-img(
							avatar="statics/certificate.png"
							label="Qualifications"
						)
							q-item(
								)
								q-item-side.q-square-img(
									avatar="statics/certificate.png"
								)
								q-item-main(
									label="Forklift Operator"
									)
								q-item-side(
									avatar="statics/wrong-thick.png"
								).q-verified-status
							q-item(
								)
								q-item-side.q-square-img(
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
								q-item-side.q-square-img(
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
				
				settings
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
				smart-login
				
</template>

<script>
import currentLocationNav from 'src/components/current-location-nav'
import smartLogin from 'src/components/smart-login'
import settings from 'src/components/settings'
export default {
	name: 'planet-express-drawer-comp',
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
		currentLocationNav,
		smartLogin,
		settings
	},
	computed: {
		mainDrawer: {
			get(){
				return this.$store.state.alopu.mainDrawer
			},
			set(val){
				this.$store.commit('mainDrawer', val)
			}
		},
	},
	watch: {
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
