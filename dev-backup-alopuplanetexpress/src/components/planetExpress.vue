<template lang='pug'>
q-page
	.planetExpress.fit
		.splash-container
			.splash-positioner
				.splash
					.particles-container(		
						v-show="logicView"
					)
						.particles-positioner
							.particles
								vue-particles.vue-particles(
									:moveSpeed="2.5"
									shapeType="star"
									color="#FFF"
									:opacity="0.7"
									:particlesNumber="35"
									:particleSize="4"
									:lineOpacity="0.3"
									:lineLinked="false"
									:hoverEffect="true"
									hoverMode="grab"
								)
					.particles-container(
						v-show="logicView"
					)
						.particles-positioner
							.particles
								vue-particles.vue-particles(
									:moveSpeed="2"
									shapeType="image"
									:image=`{
										src: "statics/pixel-ship.png"
									}`
									:particlesNumber="3"
									:particleSize="30"
								)
					.search-container(
						v-show="logicView"
						)
						.search-positioner
							.search
								.addresses-container
									.addresses-positioner
										.addresses
											.address-container(
												v-for="(address, index) in addresses"
												v-if="address"
												)
												.address-positioner(
													v-if=`index == 0 || interactionStarted`
													)
													.address
														q-chip(
															:floating="true"
															color="negative"
															small
															@click=`removeAddress(address, index)`
															).q-chip-delete.q-chip-address-delete
															q-icon(
																name="close"
																size=".9rem"
															)
														q-search.bg-primary.bg-white.q-if-inverted(
															:placeholder=`index == 0 ? "What's your first address?" : "Where else?  We'll reorganize for efficiency"`
															v-model='address.address'
															:float-label=`index == 0 ? "First Address?" : "Next?"`
															)
															q-autocomplete(
																@search="searchAddress"
																@selected="item => selectAddress(item, index, 'addresses')"
															)
														.all-goods-container
															.all-goods-positioner
																.all-goods
																	.goods-container(
																		v-for=`actionType in ["pickup", "dropoff"]`
																		)
																		.goods-positioner
																			draggable(
																				v-model=`address.goods[actionType]`
																				v-if="gosmart(address, 'goods.'+actionType, [])"
																				:options=`{
																					group: {
																						name: 'goods',
																						pull: 'clone'
																					}
																				}`
																				@end="cacheCurrentAddresses"
																			).goods
																				.good(
																					v-for="good in gosmart(address, 'goods.'+actionType, [])"
																					)
																					img(
																						src="statics/box.png"
																						)
																					q-chip(
																						:floating="true"
																						color="negative"
																						small
																						@click=`removeGood(good, address, actionType)`
										
																						).q-chip-delete.q-chip-good-delete
																						q-icon(
																							name="close"
																							size=".9rem"
																						)
																					.good-name-container
																						.good-name-positioner
																							.good-name {{ good.name }}
																				.good.placeholder(
																					slot="footer"
																					v-if="gosmart(address, 'goods.'+actionType, []).length < 1"
																					)
																					img(
																						src="statics/box.png"
																						:style=`{
																							opacity: .5
																						}`
																						)
																				.add-good(
																					slot="footer"
																					@click=`
																						addGood(false, address, actionType)
																						`
																					)
																					q-btn(
																						size="md"
																						color="white"
																						:label=`"add "+actionType+" box"`
																						).shadow-3.text-primary
																				
																						//- q-chip(
																							:floating="true"
																							color="secondary"
																							) {{ address.goods.length }}
											.additional-actions-container
												.additional-actions-positioner
													.additional-actions
														.addition-action-container
															.additional-action-positioner
																.addition-action
																	q-btn(
																		color="secondary"
																		size="sm"
																		push
																		@click="addAddress({addressType: 'addresses', actionSource: 'user'})"
																		).add-address-btn Add another stop
														.addition-action-container
															.additional-action-positioner
																.addition-action.q-pt-md
																	q-btn(
																		color="secondary"
																		text-color="white"
																		size="md"
																		push
																	).full-width Lets go!                         
					.map-container(
						v-show="mapView"
						)
						.map-positioner
							.map
								//- thing(
									:thing=`currentMap`
									)
					.view-switcher-container(
						:class=`{
							mapView,
							logicView
						}`
					)
						.view-switcher-positioner
							.view-switcher
								img(
									@click="toggleView"
									:src="'statics/'+(mapView ? 'box128' : 'globe')+ '.png'"
								)
</template>

<script>
import smarts from 'smarts'
import thing from 'src/components/thing'
export default {
	name: 'planetExpress-comp',
	mixins: [
		smarts({
			vue: {
				reactiveSetter: true,
				vm: 'this'
			}
		})
	],
	data () {
		return {
			// objects: null,
			uuid: this.$uuid.v4(),
			currentMap: {
				names: ['courier map'],
				properties: [
					{
						title: 'options',
						type: 'Array of Strings',
						'Array of Strings': [
							'show map',
							'no options',
							'hide description'
						]
					}
				]
			},
			addresses: this.$store.getters.latestCached,
			mapboxglAccessToken: "pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw",
			funCounter: 1
		}
	},
	sockets: {
		connect: function(){
		},
		giveUniqueName(data){
			// if(data.name){
			//   this.addGood(data.name, data.address, data.addressType)
			// }
		}
		// giveObjects(data){
		//   if(this.uuid == data.id){
		//     this.objects = data.objects
		//   }
		// }
	},
	created () {
		if(this.addresses.length == 0){
			this.addAddress({
				addressType: 'addresses'
				})
		}
		if(navigator.geolocation && !this.pickupAddress){
			navigator.geolocation.getCurrentPosition(pos=>{
				this.getAddressFromCoords(pos.coords.longitude, pos.coords.latitude)
				.then(res=>{
					this.setsmart(this, 'addresses.0.address', res)
					this.interactionStarted = true
				})
				.catch(res=>{
					console.error(res)
				})
			})
		}
	},
	methods: {
		cacheCurrentAddresses(){
			this.$store.commit('addCachedState', this.addresses)
		},
		addAddress({address={names: ['address'], address: undefined, goods: {}, uuid: this.$uuid.v4()}, actionSource}={}){
			if(address){
				this.pushThing({
					option: address,
					list: this.gosmart(this, 'addresses', []),
					obj: true,
					keys: ['uuid'],
				})
				
				this.cacheCurrentAddresses() // caches address into vuex state
				if(!this.interactionStarted){ // changes state value for user interaction started to
					this.interactionStarted = true
				}
			}
		},
		removeAddress(address, index, actionSource){
			if(address && (index || index == 0)){
				if(address.address !== undefined){
					address.address = undefined
				} else {
					if(
						this.addresses.length <= 1 
						&& this.getsmart(address, 'goods.pickup.length', 0) == 0 
						&& this.getsmart(address, 'goods.dropoff.length', 0) == 0 
						&& address.address == undefined
						){
						this.$q.dialog({
							title: 'Message',
							message: "Sorry but you can't remove the last empty address",
							ok: 'got it'
						})
					} else {
						this.$q.dialog({
							title: 'Warning',
							message: "This will remove the whole stop including all pickups and dropoffs",
							ok: 'got it',
							cancel: 'no no no no'             
						})
						.then(()=>{
							this.addresses.splice(index, 1)
							this.$q.notify({
								message: 'easy',
								color: 'positive',
								timeout: 1000
								})
						})
						.catch(()=>{
							// this.$q.notify({
							// 	message: 'that was lucky ;)',
							// 	color: 'positive',
							// 	timeout: 1000
							// 	})
						})
					}
				}
				this.interactionStarted = true
				this.cacheCurrentAddresses()
				// this.popThing({
				//   option: address,
				//   list: this.gosmart(this, 'addresses', []),
				//   obj: true,
				//   keys: ['uuid']
				// })
			}
		},
		addGood(name, address, addressType, funCounter=this.funCounter){
			if(!name){
				this.funCounter++
				let data = {
					name,
					address,
					addressType,
					funCounter
				}
				this.$socket.emit('getUniqueName', data)
				this.$options.sockets['giveUniqueName'] = data => {
					if(data.funCounter == funCounter){
						let good = {
							names: ['good'],
							name: data.name,
							uuid: data.uuid
						}
						this.setsmart(good, data.addressType, address)
						console.log('adding good')
						console.log('data')
						console.log(data)
						console.log('address')
						console.log(address)
						this.setThing({
							option: good, 
							list: this.gosmart(address, 'goods.'+data.addressType, []), 
							obj: "debug",  
							keys: ['uuid'],
							push: true
						})
						this.cacheCurrentAddresses()
					}
				}
			}
		},
		removeGood(good, address, goodsPath){
			if(good && address && goodsPath){
				console.log('removing')
				this.popThing({
					option: good, 
					list: this.gosmart(address, 'goods.'+goodsPath, []), 
					keys: ['uuid', '_id'],
					keymatchtype: 'broad'
				})
				this.cacheCurrentAddresses()
			}
		},
		tryGeojson(something){
			if(this.getsmart(something, 'coords', undefined) && this.getsmart(something, 'coords.latitude', undefined) && this.getsmart(something, 'coords.longitude', undefined)){
				let geojson = {
					center: [
						this.getsmart(something, 'coords.longitude', 145.179286),
						this.getsmart(something, 'coords.latitude', -37.983109)
					],
					geometry: {
						coordinates: [
							this.getsmart(something, 'coords.longitude', 145.179286),
							this.getsmart(something, 'coords.latitude', -37.983109)
						],
						type: 'Point'
					}
				}
				return geojson
			} else {
				return something
			}
		},
		getAddressFromCoords(lng, lat){
			return new Promise((resolve, reject)=>{
				let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + this.mapboxglAccessToken +"&types=address"
				this.$http.get(url)
				.then((data)=>{
					resolve(data.body.features[0].place_name)            
				})
				.catch((err)=>{
					console.error(err)
					reject(err)
				})
			})
		},
		autoCompleteAddress(text){
			return new Promise((resolve, reject)=>{
				let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+text+".json?access_token=" + this.mapboxglAccessToken +"&types=address"
				this.$http.get(url)
				.then((data)=>{
					resolve(data.body.features)            
				})
				.catch((err)=>{
					console.error(err)
					reject(err)
				})
			})
		},
		searchAddress(add, done){
			this.autoCompleteAddress(add)
			.then(res=>{
				let list = []
				for(var i=0;i<res.length;i++){
					list.push({
						label: res[i].place_name
					})
				}
				done(list)
			})
			.catch(res=>{
				console.error(res)
			})
		},
		selectAddress(item, index, which, actionSource){
			if(item && (index || index == 0) && which){
				this.setsmart(this, which+"."+index+".address", item.label)
				this.interactionStarted = true
			}
		},
		toggleView(){
			this.mapView = !this.mapView
			this.logicView = !this.logicView
		}
	},
	computed: {
		interactionStarted: {
			get(){
				return this.$store.state.app.interactionStarted
			},
			set(val){
				this.$store.commit('interactionStarted', val)
			}
		},
		mapView: {
			get(){
				return this.$store.state.app.mapView
			},
			set(val){
				this.$store.commit('mapView', val)
			}
		},
		logicView: {
			get(){
				return this.$store.state.app.logicView
			},
			set(val){
				this.$store.commit('logicView', val)
			}
		}
	},
	props: {
		"siteTitle": {}
	},
	components: {
		thing
	},
	watch: {
		'addresses'(){
			if(this.addresses.length == 0){
				this.addAddress()
			}
			this.cacheCurrentAddresses()
		},
		// 'addresses'(){
		//   if(this.addresses.length == 0){
		//     this.addAddress()
		//     this.cacheCurrentAddresses()
		//   }
		// },
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
<style lang="sass">
@import 'src/styles/vars'
.planetExpress
	width: 100%
	max-width: 100%
	overflow: hidden
	min-height: 100vh
	.splash-container
		min-height: 100vh
		background: $green
		// padding-top: 60px
		width: 100%
		align-items: flex-start
		justify-content: center
		display: flex
		flex-direction: column
		box-sizing: border-box
		.splash-positioner
			width: 100%
			height: 100%
			.splash
				width: 100%
				height: 100%
				align-items: flex-start
				justify-content: center
				display: flex
				flex-direction: column
				position: relative
				.particles-container
					position: absolute
					top: 0
					left: 0
					width: 100%
					min-height: 100vh
					height: 100%
					.particles-positioner
						width: 100%
						height: 100%
						.particles
							width: 100%
							height: 100%
							.vue-particles
								height: 100%
								width: 100%
								canvas
									height: 100%
									width: 100%
				.search-container
					width: 100%
					min-height: 100vh
					padding-top: 60px
					padding-bottom: 10%
					top: 0
					left: 0
					display: flex
					align-items: center
					justify-content: center
					flex-direction: column
					.search-positioner
						width: 100%
						display: flex
						align-items: center
						justify-content: flex-start
						flex-direction: column
						.search
							width: 100%
							display: flex
							align-items: center
							justify-content: center
							flex-direction: column
							max-width: 500px
							.q-search
								// margin-top: -15px
								padding: 15px
								// max-width: 95%
								.q-if-inner
									min-height: 24px !important
									padding-top: 0px !important
								.q-if-label
									// top: 3px
								.q-if-label-above
									// transform: scale(0.75) translate(0, -21px)
								input
									width: 280px
									&::selection
										color: $green
										background: rgba($green, .3)
									// max-width: 90%
							.addresses-container
								width: 100%
								max-width: 100%
								padding: 0px 10px
								padding-bottom: 30px
								.addresses-positioner
									.addresses
										.address-container  
											.address-positioner
												padding-bottom: 20px
												.address
													position: relative
													.q-chip-address-delete
														right: -5px
														left: auto
														// top: auto !important
														// bottom: 0
														border-radius: 5px
													&:hover
														.q-chip-address-delete
															display: inline-flex !important
															opacity: 1
													.all-goods-container
														margin-top: 13px
														max-width: 100%
														.all-goods-positioner
															display: flex
															max-width: 100%
															align-items: flex-start
															justify-content: flex-start
															flex-direction: row
															flex-wrap: wrap
															.all-goods
																display: flex
																max-width: 100%
																align-items: flex-start
																justify-content: flex-start
																flex-direction: column
																padding-bottom: 7px
																flex-wrap: wrap
																.goods-container
																	.goods-positioner
																		padding-bottom: 15px
																		.goods
																			display: flex
																			max-width: 100%
																			align-items: flex-start
																			justify-content: flex-start
																			flex-direction: row
																			padding-bottom: 7px
																			flex-wrap: wrap
																			.good
																				margin-right: 20px
																				margin-bottom: 13px
																				display: flex
																				align-items: center
																				justify-content: center
																				flex-direction: column
																				position: relative
																				order: 1
																				&.placeholder
																					order: 1
																				.q-chip-good-delete
																						left: 8px
																						right: auto
																						border-radius: 5px
																				&:hover
																					.q-chip-good-delete
																						display: inline-flex !important
																						opacity: 1
																				img
																					height: 40px
																					z-index: 100
																					// width: 40px
																				.good-name-container
																					position: relative
																					display: flex
																					justify-content: center
																					align-items: center
																					.good-name-positioner
																						position: relative
																						top: 0
																						display: flex
																						justify-content: center
																						align-items: center
																						.good-name
																							display: flex
																							justify-content: center
																							align-items: center
																							font-size: .77rem
																							text-align: center
																			.add-good
																				order: 2
																				// padding: 3px
																				margin-top: 5px
																				margin-left: 2px
																				// width: 30px
																				// height: 30px
																				background: white
																				border-radius: 3px
																				display: flex
																				align-items: center
																				justify-content: center
																				box-shadow: 0px 3px 8px -1px rgba(black, .2)
																				.add
																					// position:
																					color: $green
																					font-size: 1.3rem
													.map-container
														// display: none
														width: 100%
														margin-top: 5px
														.map-positioner
															width: 100%
															.map
																width: 100%
																// min-height: 100vh
																display: flex
																align-items: center
																justify-content: center
																flex-direction: column
																
								.additional-actions-container
									margin-top: 10px
									.action
										color: white
									.add-address-btn
										// margin-top: 5px
										// margin-bottom: 5px
										.q-btn-inner
											&::before
											// color: black !important
								
				
	// background: $grey
//quasar mods
.q-chip-delete
	padding: 0px 5px !important
	min-height: 20px !important
	margin-left: -20px !important
	top: -0.5rem !important
	// display: none !important
	opacity: 0
	pointer-events: all
	+animate(all, 200ms, ease)
	.q-chip-main
		display: flex
		align-items: center
		justify-content: center
		padding: 3px 0px !important
	&:hover
		display: inline-flex !important
		opacity: 1
</style>

<style lang="stylus">
@import '~variables'

.view-switcher-container
	position: fixed
	bottom: 0
	width: 100vw
	max-width: 100%
	display: flex
	align-items: center
	justify-content: center
	.view-switcher-positioner
		position: relative
		width: 100%
		.view-switcher
			transform: translateY(60%)
			display: flex
			align-items: center
			justify-content: center
			width: 100%
			img
				transition: all ease 500ms
				cursor: pointer
				&:hover
					transform: scale(1.1)
	&.mapView
		// bottom: initial
		// top: 0
		.view-switcher-positioner
			.view-switcher
				// transform: translateY(-60%)
	&.logicView
		top: initial
		bottom: 0

</style>