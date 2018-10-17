<template lang='pug'>
	q-collapsible.q-square-img(
		label="Current Location"
		avatar="statics/where.png"
		)
		q-list()
			q-item(
			)
				q-item-side.q-square-img(
					avatar="statics/devices.png"
				)
				q-item-main(
					label="Available Devices"
					sublabel="Link a Device"
					)
			template(
				v-for="(device, index) in $s.gosmart($store, 'state.alopu.entity.inventory.devices', [])"
			)
				q-item-separator(
				)
				q-item(
				)
					q-item-side.q-square-img(
						:style=`{
							'text-transform': 'capitalize'
						}`
						:avatar="'statics/'+$s.getsmart(device, 'device.type', $s.getsmart(device, 'os.name', 'smartphone'))+'.png'"
					)
					//- :label="userAgentToDevice($s.getsmart(device, 'userAgent', undefined))"
					q-item-main(
						:label="$s.getsmart(device, 'device.model', $s.getsmart(device, 'os.name', 'Device '+index))"
						:sublabel="$s.getsmart(device, 'location', 'No address known')"
						)
				q-item(
				)
					q-item-side.q-img-xs.q-centered(
						:avatar="'statics/location-'+($s.getsmart(device, 'currentLocation', false) ? 'yes' : 'no')+'.png'"
					)
					q-item-side.q-img-xs.q-centered(
						:avatar="'statics/satellite'+($s.getsmart(device, 'liveLocation', false) ? '' : '-disconnected')+'.png'"
					)
				q-collapsible(
					label="options"
				)
					q-item(
					)
						q-item-main(
						)
							q-btn(
								:label="$s.getsmart(device, 'currentLocation', false) ? 'Not your current location?' : 'Set as your current Location'"
								:color="$s.getsmart(device, 'currentLocation', false) ? 'negative' : 'positive'"
								@click="toggleCurrentLocation(index)"
							).full-width
					q-item(
					)
						q-item-main(
						)
							q-btn(
								:label="$s.getsmart(device, 'liveLocation', false) ? 'Delink location from this devices GPS' : 'Link location to this devices GPS'"
								:color="$s.getsmart(device, 'liveLocation', false) ? 'negative' : 'positive'"
								@click="toggleLiveLocation(index)"
							).full-width
					q-item(
					)
						q-item-main(
						)
							q-btn(
								label="delete device"
								color="negative"
								@click="removeDevice(index)"
							).full-width
					template(
						v-if="!$s.getsmart(device, 'liveLocation', false)"
					)
						q-item(
							
						)
							q-item-main(
								label="enter location manually"
							)
						q-item(

						)
							q-search.bg-primary.bg-white.q-if-inverted(
								:placeholder=`"Enter location manually"`
								v-model='device.location'
								:float-label=`"Location"`
								)
								q-autocomplete(
									@search="searchAddress"
									@selected="item => { device.location = item.label }"
								)
			q-item-separator()
			q-item
				q-item-main(
					label="To add a device, login to the App or Website on that device and it will ask to sync with your account"
				).text-center.q-txt-sm.text-fade
				//- q-btn(
				//- 	label="add a device"
					
				//- ).full-width
								
</template>

<script>
export default {
  name: 'current-location-nav-comp',
  data () {
    return {
      // objects: null,
			uuid: this._uid,
			mapboxglAccessToken: "pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw",

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
		test(item){
			console.log(item)
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
		deviceTypeImage(i){
			return i
		},
		removeDevice(index){
			let entity = this.$s.getsmart(this.$store, 'state.alopu.entity', undefined)
			let devices = this.$s.getsmart(entity, 'inventory.devices', undefined)
			if(devices){
				devices.splice(index, 1)
				this.$store.commit('entity', {entity})
				this.$store.dispatch('syncEntity')
			}
		},
		toggleLiveLocation(index){
			console.log('toggling')
			let entity = this.$s.getsmart(this.$store, 'state.alopu.entity', undefined)
			let devices = this.$s.getsmart(entity, 'inventory.devices', undefined)
			let device = devices[index]
			let ua = device.userAgent
			if(devices && device){
				device.liveLocation = !device.liveLocation
				// devices.forEach(device=>{
				// 	if(device.userAgent !== ua){
				// 		device.liveLocation = false
				// 	}
				// })
				this.$store.commit('entity', {entity})
				this.$store.dispatch('syncEntity')
			}
		},
		toggleCurrentLocation(index){
			console.log('toggling')
			let entity = this.$s.getsmart(this.$store, 'state.alopu.entity', undefined)
			let devices = this.$s.getsmart(entity, 'inventory.devices', undefined)
			let device = devices[index]
			let ua = device.userAgent
			if(devices && device){
				device.currentLocation = !device.currentLocation
				devices.forEach(device=>{
					if(device.userAgent !== ua){
						device.currentLocation = false
					}
				})
				this.$store.commit('entity', {entity})
				this.$store.dispatch('syncEntity')
			}
		}
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
  },
  props: {
    "siteTitle": {}
  },
  components: {
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
.current-location-nav
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
</style>
