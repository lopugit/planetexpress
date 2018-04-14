<template lang='pug'>
  .icoThings
    .icoThings-container
      .icoThings-positioner
        //- img(style="max-width: 220px" src="../assets/agoraLogo.png")
        img.noselect(style="transform: rotate(180deg); max-width: 100%" src="src/assets/logo.png" title="yes, this is the vue logo upside down")
        .intro-text-container
          .intro-text Welcome
            //- .inline {{ siteTitle }}
            //- .capitalize.inline Agora
        .inventories-container.maps-inventory-container
          // local inventory generator
          thing(
            :thing=`{
              title: 'The local inventory',
              description: 'Is there anything around you?',
              names: ['a lopu inventory generator', 'a lopu map'],
              uuid: 'woo',
              properties: [
                {
                  title: 'a saveable lopu?',
                  boolean: false
                },
                {
                  title: 'realms to match',
                  list: ['posts']
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
                  boolean: true
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
                },
                {
                  title: 'options',
                  list: [
                    'no options',
                    'addable',
                    'put-first',
                    'put new things first',
                    'dont load childrens children',
                    'inventory mode',
                    'show inventory',
                    'show-map-inventory',
                    'put addable last',
                    'show-active-options',
                    'location'
                    ]
                }
              ]
            }`
            )

        .inventories-container.vertical
          // html builder thing
          thing(
            :thing=`{
              names: ['a lopu root'],
              properties: [
                {
                  title: 'options',
                  names: ['property'],
                  list: [
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
                    'hide description'
                    ],
                }
              ],
              things: [{
                title: 'test thing',
                description: 'test thing description',
                properties: [
                  {
                    title: 'options',
                    names: ['property'],
                    list: [
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
                    type: Array,
                    properties: [
                      {
                        title: 'options',
                        names: ['property'],
                        list: [
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
                        list: [
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
                        list: [
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
                        list: [
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
                        list: [
                          //- 'show value'
                        ]
                      }
                    ]
                  },
                ]
              }]
            }`
            )
          // A thing
          thing(
            :thing=`{
              title: 'A thing',
              description: 'this is a modern, technologically advanced, thing',
              properties: [
                {
                  title: 'options',
                  names: ['property'],
                  list: [
                    'show options',
                    //- 'show properties',
                    'focused',
                    //- 'editing',
                    //- 'inventory mode',
                    //- 'show inventory',
                    //- 'addable',
                    //- 'put-first',
                    'put new things first',
                    'dont load childrens children',
                    'put addable last',
                    'hide title',
                    'properties not addable'
                    ],
                  type: Array,
                  properties: [
                    {
                      title: 'options',
                      names: ['property'],
                      list: [
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
                      list: [
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
                      list: [
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
                      list: [
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
                      list: [
                        //- 'show value'
                      ]
                    }
                  ]
                },
              ],
              things: [
              	{
              		title: 'a child thing'
              	}
              ]
            }`)
          // Showcase inventory
          thing(
            :thing=`{
              title: 'The Collective Inventory',
              description: 'test thing description',
              properties: [
                {
                  title: 'options',
                  names: ['property'],
                  list: [
                    'show options',
                    //- 'show properties',
                    'focused',
                    //- 'editing',
                    'inventory mode',
                    'show inventory',
                    //- 'addable',
                    //- 'put-first',
                    'put new things first',
                    'dont load childrens children',
                    'put addable last',
                    'properties not addable'
                    ],
                  type: Array,
                  properties: [
                    {
                      title: 'options',
                      names: ['property'],
                      list: [
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
                      list: [
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
                      list: [
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
                      list: [
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
                      list: [
                        //- 'show value'
                      ]
                    }
                  ]
                },
              ],
              //- things: [
              //- 	{
              //- 		title: 'test'
              //- 	}
              //- ]
            }`)
          // side by side
          .inventories-container.no-padding
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
          // inventory generator
          thing(
            :thing=`{
              names: ['a lopu inventory generator'],
              properties: [
                {
                  title: 'realms to match',
                  list: ['tests']
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
                  list: [
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
</template>

<script>
export default {
  name: 'icoThings-comp',
  data () {
    return {
      entity: this.$store.state.entity,
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
.icoThings
  width: 100%
  max-width: 100%
  overflow: hidden
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  .icoThings-container
    width: 100%
.intro-text-container
  margin-top: 8px
  margin-bottom: 40px
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
  .thing
    max-width: 1000px
  &.vertical
    align-items: center
    justify-content: flex-start
    flex-direction: column
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
  &.no-padding
    padding: 0%
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

