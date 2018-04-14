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
            :thing=`sandboxThing`
            )
        .buttons-container
          .button-container(@click="makeProperty")
            .button make property
          .button-container(@click="commit")
            .button commit
          .button-container(@click="resetThing")
            .button reset
</template>

<script>
import {mapState} from 'vuex'
import smarts from 'smarts'
export default {
  mixins: [smarts({
    vue: {
      reactiveSetter: true,
      vm: this
    }
  })],
  name: 'icoThings-comp',
  data () {
    return {
      entity: this.$store.state.entity,
      uuid: this._uid,
      wait: 2000
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
    let that = this
    this.wait = setInterval(function(){
      that.$store.commit('sandboxThingSet', that.sandboxThing)
    }, 1000)
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
    commit(){
      // this.$store.commit('sandboxThingSet', this.sandboxThing)
    },
    setRandomText(){
      console.log(Math.random(1000).toString())
      this.$set(this.sandboxThing, 'description', Math.random(1000).toString())
    },
    setRandomNum(){
      this.$set(this.sandboxThing, 'description', Math.random(1000).toString())
    },
    makeProperty(){
      this.pushOpt('property', this.sandboxThing.names)
    },
    resetThing(){
      this.sandboxThing = this.jsmart.parse(this.jsmart.stringify(this.$store.state.ico.sandboxThingSchema))
    },
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
  computed: {
    sandboxThing: {
      get(){
        return this.$store.state.ico.sandboxThing
      },
      set(){
        clearInterval(this.wait)
        let that = this
        this.wait = setInterval(function(){
          that.$store.commit('sandboxThingSet', that.sandboxThing)
        }, 2000)
        this.$store.commit('resetSandboxThing', true)
      }
    },
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
  height: auto
  min-height: 100vh
  box-sizing: border-box
  .icoThings-container
    width: 100%
    height: 100%
    .icoThings-positioner
      position: relative
      height: 100%
      padding-bottom: 100px
      .buttons-container
        position: absolute
        bottom: 0
        left: 0
        display: flex
        align-items: flex-start
        justify-content: flex-start
        flex-flow: row wrap
        width: 100%
        .button-container
          width: auto
          padding: 12px
          background: $green
          color: white
          // margin-bottom: 2px
          box-sizing: border-box
          border-right: 1px solid darken($green,2)
          
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

