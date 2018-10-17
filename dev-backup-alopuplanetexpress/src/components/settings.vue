<template lang='pug'>
	q-collapsible(
		label="Settings"
		)
		template(
			v-for="(setting, key, index) in settings"
		)
			q-item
				q-item-main(
					:label="key"
				)
			q-item
				q-input(
					v-if="typeof setting !== 'boolean'"
					:value="settings[key]"
					:placeholder="setting.toString()"
				).full-width
				q-toggle(
					v-else
					v-model="settings[key]"				
				)
			q-item-separator
		q-item(
			v-if="$route.name !== '/self/settings'"
		)
			q-item-main(

			)
				q-btn(
					label="go to settings"
					color="primary"
					@click="$router.push('self/settings')"
				).full-width
</template>

<script>
export default {
	name: 'settings-comp',
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
	},
	components: {
	},
	computed: {
		settings: {
			get(){
				var settings = this.$s.getsmart(this, '$store.state.alopu.entity.inventory.settings', undefined)
				return settings
			}
		}
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
.settings
	width: 100%
	max-width: 100%
	overflow: hidden
	// background: $grey
</style>
