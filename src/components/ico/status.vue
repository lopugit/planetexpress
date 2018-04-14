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
        .inventories-container.vertical
          thing(
            :thing=`"5a4e3eb47c0fdc593d0992ea"`
            )
          //- thing(
            :thing=`{
              title: 'An organizational planner for alopu',
              description: 'This is the work status of alopu',
              name: ['a lopu asana themed work planner'],
              properties: [
                {
                  title: 'options',
                  names: ['property'],
                  'Array of Strings': [
                    'show inventory',
                    'hide description'
                  ],
                  type: 'Array of Strings',
                },
                {
                  title: 'things schema',
                  properties: [
                    {
                      title: 'properties',
                      type: 'Array',
                      Array: [
                        {
                          title: 'css',
                          json: {
                            'max-width':'200px',
                            'width':'100%'
                          },
                          type: 'Thing'
                        },
                        {
                          title: 'options',
                          'Array of Strings': [
                            'show title',
                            'hide description',
                            'show inventory',
                            'feed',
                            'ignore client option icon'
                          ],
                          type: 'Array of Strings',
                          properties: [
                            {
                              title: 'overwrite',
                              boolean: true,
                              type: 'Boolean'
                            }
                          ]
                        },
                        {
                          names: ['a lopu client option'],
                          title: 'things limit',
                          Number: 25,
                          type: 'Number',
                        },
                        {
                          title: 'things schema',
                          Thing: {
                            properties: [
                              {
                                title: 'options',
                                Array: [
                                  
                                ],
                                type: 'Array',
                                properties: [
                                  {
                                    title: 'overwrite',
                                    boolean: true,
                                    type: 'Boolean'
                                  }
                                ]
                              }
                            ]
                          },
                          type: 'Thing'
                        }
                      ]
                    }
                  ]
                }
              ],
              things: [
                {
                  title: 'ideas'
                },
                {
                  title: 'working on'
                },
                {
                  title: 'needs debugging'
                },
                {
                  title: 'done'
                },
              ]
            }`)
          
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
  padding-left: 3%
  padding-right: 3%
  box-sizing: border-box
  padding-bottom: 20px
  .thing
    // max-width: 1000px
  &.vertical
    align-items: center
    justify-content: flex-start
    flex-direction: column
    // padding-left: 0%
    // padding-right: 0%
    &.inventory-width
      width: 50%
      .inventory-mode
        width: 100%
    .thing
      margin-bottom: 20px
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

