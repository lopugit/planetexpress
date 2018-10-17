<template lang='pug'>
	.dispatch-container
		.dispatch-positioner
			.dispatch
				//- center: thingMapboxCoords(),
				mapbox(
					access-token="pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw"
					:map-options=`{
							style: 'mapbox://styles/lopu/cjaru8bau2y1x2rp9ks1fk973',
							//- style: 'mapbox://styles/lopu/cjemn2m2n74hz2rqkdiwy5a9o',
							zoom: 15.6,
							//- pitch: 60,
							container: 'map'+$uuid.v4()
						}`
					:geolocate-control=`{
							show: true, 
							position: 'top-left'
						}`
					)
					//- @map-init="locationInitialized"
				//- thing(
					:thing=`{
						names: ['map']
					}`
					)
</template>

<script>
import thing from 'vue-things'
export default {
	name: 'dispatch-comp',
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
		thing
	},
	computed: {

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
</style>
<style lang="stylus" scoped>
@import '~variables'
.dispatch-container
	width: 100%
	max-width: 100%
	overflow: hidden
	min-height: 100vh
	.dispatch-positioner
		background: $primary
		.dispatch
			width: 100%
			max-width: 100%
			min-height: 100vh
			display: flex
			align-items: center
			justify-content: center
			.mapboxgl-map
				width: 100%
				height: 800px
</style>
