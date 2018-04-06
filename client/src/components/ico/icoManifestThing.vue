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
            :thing=`{}`
            )
</template>

<script>
import smarts from 'smarts'
export default {
  mixins: [smarts({vue: true, objList: 'this.thingMutable.things', stringList: 'this.thingMutable.properties.mapped.options.list'})],
  name: 'icoThings-comp',
  data () {
    return {
      entity: this.$store.state.entity,
      // sandboxThing: this.$store.state.ico.sandboxThing,
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

