<template lang='pug'>
	.home
		//- img(style="max-width: 220px" src="../assets/agoraLogo.png")
		img.noselect(
			style="transform: rotate(180deg); max-width: 100%" 
			src="assets/logo.png" title="yes, this is the vue logo upside down"
			)
			//- ref="logo"
			//- @click="spinLogo"
		.intro-text-container
			.intro-text Welcome to&nbsp;
				.inline alopu, a social platform for trading anything
				//- .capitalize.inline Agora
		search(
			@go=`createNewGetter(data)`
			:options=`frontPageThing.things`
			label=`title`
			@searchText=`queryNewThings`
			)
		.inventories-container.stream-container.maps-inventory-container
			//- thing(
				:thing=`{
					title: 'The Collective Inventory',
					names: ['a lopu inventory generator', 'a lopu map'],
					uuid: 'woo',
					properties: [
						{
							title: 'a saveable lopu?',
							boolean: false
						},
						{
							title: 'realms to match',
							type: 'Array of Strings',
							'Array of Strings': ['posts']
						},
						{
							title: 'broadly match realms',
							boolean: true
						},
						{
							title: 'use this things location',
							boolean: true
						},
						{
							title: 'broadly match location',
							boolean: true,
							properties: [
								{
									title: 'how broad?',
									Number: 12,
									properties: [
										{
											title: 'unit',
											text: 'km'
										}
									]
								}
							]
						},
						{
							title: 'how broad?',
							Number: 12,
							json: {
								unit: {
									title: 'unit',
									text: 'km'
								}
							}
						},
						{
							title: 'limit',
							Number: 50
						}
			thing(
				:thing=`frontPageThing`
			)

		.inventories-container.vertical
			// html builder thing
			//- thing(
				:thing=`{
					names: ['a lopu root'],
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								'show inventory',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'no options',
								'feed',
								'addable',
								//- 'put-first',
								//- 'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'hide description'
								],
						}
					],
					things: [{
						title: 'test thing',
						text: 'test thing description',
						properties: [
							{
								title: 'options',
								names: ['property'],
								type: 'Array of Strings',
								'Array of Strings': [
									'show options',
									'show properties',
									'focused',
									//- 'editing',
									'addable',
									'put-first',
									'put new things first',
									'dont load childrens children',
									'put addable last',
									'hide title'
									],
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some number',
								names: ['property'],
								Number: 5,
								type: Number,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some boolean',
								names: ['property'],
								boolean: true,
								type: Boolean,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some text',
								names: ['property'],
								text: 'fill me',
								type: String,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
							{
								title: 'some thing',
								names: ['property'],
								thing: {},
								type: Object,
								properties: [
									{
										title: 'options',
										names: ['property'],
										type: 'Array of Strings',
										'Array of Strings': [
											//- 'show value'
										]
									}
								]
							},
						]
					}]
				}`
				)
			// single thing
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								'inventory mode',
								'show inventory',
								//- 'slotted',
								//- 'show slots',
								//- 'shrink slot icons',
								//- 'generate slots',
								//- 'put-first',
								'put new things first',
								'dont load childrens children',
								'put addable last',
								//- 'hide addable button',
								'hide title',
								'properties not addable',
								//- 'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'inventory mode',
								//- 'show inventory',
								'slotted',
								'show slots',
								'shrink slot icons',
								//- 'generate slots',
								//- 'addable',
								//- 'put-first',
								'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'properties not addable',
								'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- thing(
				:thing=`{
					title: 'Your Inventory',
					description: 'Somethings description..',
					properties: [
						{
							title: 'options',
							names: ['property'],
							type: 'Array of Strings',
							'Array of Strings': [
								//- 'show options',
								//- 'show properties',
								//- 'focused',
								//- 'editing',
								//- 'inventory mode',
								//- 'show inventory',
								'slotted',
								'show slots',
								'shrink slot icons',
								//- 'generate slots',
								//- 'addable',
								//- 'put-first',
								'put new things first',
								'dont load childrens children',
								'put addable last',
								'hide title',
								'properties not addable',
								//- 'holo mode'
								],
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										'show value'
									]
								}
							]
						},
						{
							title: 'some number',
							names: ['property'],
							Number: 5,
							type: Number,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some boolean',
							names: ['property'],
							boolean: true,
							type: Boolean,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some text',
							names: ['property'],
							text: 'fill me',
							type: String,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
						{
							title: 'some thing',
							names: ['property'],
							thing: {},
							type: Object,
							properties: [
								{
									title: 'options',
									names: ['property'],
									type: 'Array of Strings',
									'Array of Strings': [
										//- 'show value'
									]
								}
							]
						},
					],
					things: [
						//- {
						//- 	title: 'test'
						//- },
					]
				}`)
			//- .inventories-container.vertical.inventory-width
				thing(
					:thing='entity.inventory'
					:count=40
					:parentOptions=`['inventory mode',
						'show inventory',
						'addable',
						'put addable last',
						'owner-root',
						'owner-only',
						'put-options-last'
						]`
					)
				thing(
					:thing=`{owner: entity._id,
						title: 'Add to your wishlist',
						description: 'this is your wishlist, any things you put in here will be sent out to your peers',
						stateType: 'unlinked'
						}`
					:parentOptions=`['inventory mode',
						'show inventory',
						'addable',
						'put addable last',
						'owner-root',
						'owner-only',
						'put-options-last'
						]`
					)
		//- thing(
			:thing=`{
				names: ['a lopu inventory generator'],
				properties: [
					{
						title: 'realms to match',
						type: 'Array of Strings',
						'Array of Strings': ['tests']
					},
					{
						title: 'limit',
						Number: 5
					},
					{
						title: 'broadly match realms',
						boolean: true
					},
					{
						title: 'options',
						type: 'Array of Strings',
						'Array of Strings': [
							'no options',
							'addable',
							'no context',
							'put-first',
							'feed',
							'show-children-comments',
							'put new things first',
							'addable with template',
							'dont load childrens children',
							'wide-adder',
							'put addable last',
							'put-options-last'
							]
					}
				]
			}`
			)
		// feed example
		.inventories-container.vertical
</template>

<script>

import search from 'src/components/search'
import smarts from 'smarts'
import thing from 'src/components/thing'
export default {
	mixins: [
		smarts({
		vue: {
				reactiveSetter: true,
				vm: 'this'
		}, 
		})
	],
	name: 'home',
	data () {
		return {
			entity: this.$store.state.entity,
			pageHistory: this.$store.state.pageHistory,
			frontPageThing: {
				title: 'The Collective Inventory',
				names: ['a lopu inventory generator'],
				uuid: 'hngg',
				properties: [
					{
						title: 'a saveable lopu?',
						Boolean: false,
						type: 'Boolean'
					},
					{
						title: 'things schema',
						properties: [
							{
								title: 'properties schema',
								type: 'Array',
								Array: [
									{
										title: 'options',
										type: 'Array of Strings',
										'Array of Strings': [
											'show title'
										]
									}
								],


							}
						]
					},
					{
						title: 'things render limit',
						type: 'Number',
						Number: 20
					},
					{
						title: 'count',
						Number: 20,
						type: 'Number'
					},
					// {
					// 	title: 'dont gen this lopu',
					// 	Boolean: true,
					// 	type: 'Boolean'
					// },
					{
						title: 'sort',
						type: 'json',
						json: {
							created: -1
						}
					},
					{
						title: 'options',
						type: 'Array of Strings',
						'Array of Strings': [
							'no options',
							'addable',
							'put new things first',
							'dont load childrens children',
							'show inventory',
							'hide description',
							'put addable first',
							'template adder',
							//- 'location',
							'holo mode',
							'feed',
							]
					}
				]
			}
		}
	},
	sockets: {
		connect: function(){
		}
	},
	created() {
		this.$store.commit('addPage', this.$options.name)
	},
	methods: {
		spinLogo(){
			this.$refs.logo.classList.add('spin')
			let that = this
			this.$refs.logo.movingTimer = this.$refs.logo.movingTimer || 1000
			// clearTimeout()
			this.$refs.logo.movingTimer = setTimeout(function(){
				that.$refs.logo.classList.remove('spin')			
			}, this.$refs.logo.movingTimer)
		},
		queryNewThings(txt){
			this.setThing({
				option: {
					title: 'a special lopu regex to match',
					type: 'String',
					String: txt.title
				},
				list: this.gosmart(this, 'frontPageThing.properties', []),
				key: ['title'],
				push: true
			})
			this.popOpt('gotten', this.getsmart(this, 'frontPageThing.properties.mapped.options.Array of Strings', []))
			this.pushOpt('regen lopu', this.getsmart(this, 'frontPageThing.properties.mapped.options.Array of Strings', []))
		}
	},
	watch: {
		'$store.state.entity': function(){
			this.entity = this.$store.state.entity
			this.entity.inventory = this.$store.state.entity.inventory
		},
		'$store.state.pageHistory': function(){
			this.pageHistory = this.$store.state.pageHistory
		},
		// '$store.state.entity': function(){
		// 	this.entity = this.$store.state.entity
		// }
	},
	props: ["siteTitle"],
	components: {
				 search,
				 thing
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">

	.home
		display: flex
		align-items: center
		justify-content: flex-start
		flex-direction: column
		padding-bottom: 200px
	.search
		// padding-bottom: 10px
	.spin
		// +animate(transform, 400ms, ease)
		animation: spin 1000ms linear
	@keyframes spin
		0%
			transform: rotateZ(180deg)
		100%
			transform: rotateZ(539.99deg)
	.intro-text-container
		margin-top: 10px
		margin-bottom: 10px
		.intro-text
			display: inline-block
	.inventories-container
		display: flex
		align-items: flex-start
		justify-content: center
		width: 100%
		padding-left: 10%
		padding-right: 10%
		box-sizing: border-box
		padding-bottom: 20px
		.inventory-mode
			// display: inline-block
			// width: 50%
		.thing
			max-width: 1000px
		&.vertical
			flex-direction: column
			// padding-left: 0%
			// padding-right: 0%
			&.inventory-width
				width: 50%
				.inventory-mode
					width: 100%
		&.maps-inventory-container
			padding-left: 0%		
			padding-right: 0%
			padding-bottom: 100px		
			.inventory-mode
				width: 100%
			.thing
				max-width: 100%
		&.stream-container
			padding-left: 10%
			padding-right: 10%
	.uppercase
		text-transform: uppercase

	.capitalize
		text-transform: capitalize

	.inline
		display: inline-block

	ul
		list-style-type: none
		padding: 0


	li
		display: inline-block
		margin: 0 10px


	a
		color: #42b983

</style>
