<template lang='pug'>
		q-collapsible(
			label="Current Location"
			avatar="statics/where.png"
			)
			q-list()
				q-item(
				)
					q-item-side(
						avatar="statics/devices.png"
					)
					q-item-main(
						label="Available Devices"
						sublabel="Link a Device"
						)
				template(
					v-for="device in $s.gosmart($store, 'state.alopu.entity.inventory.devices', [])"
				)
					q-item-separator(
					)
					q-item(
					)
						q-item-side(
							:avatar="'statics/'+deviceTypeImage($s.getsmart(device, 'type', undefined))+'.png'"
						)
						//- :label="userAgentToDevice($s.getsmart(device, 'userAgent', undefined))"
						q-item-main(
							:label="$s.getsmart(device, 'title', undefined)"
							:sublabel="$s.getsmart(device, 'textAddress', 'No address known')"
							)
						q-item-side(
							:avatar="'statics/location-'+($s.getsmart(device, 'livelocation', false) ? 'yes' : 'no')+'.png'"
						)
				q-item-separator()
				q-item
					q-btn(
						label="add a device"
						
					).full-width
								
</template>

<script>
export default {
  name: 'current-location-nav-comp',
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
