<template lang='pug'>
  .trade
    .entity-container
    .inventories
      .trader-container
        .trader-positioner
          thing(
            :thing=`{
              title: 'Your Offerings',
              names: ['inventory'],
              uuid: $uuid.v4()
            }`
            :parentOptions="['options', 'slotted', 'generate slots', 'show slots', 'show inventory', 'inventory mode', 'addable', 'put-options-last']"
          )
          .accept-trade-button-container
            .accept-trade-button-positioner
              .accept-trade-button.accept
                .accept-trade-button-content Accept
      .trader-container
        .trader-positioner
          thing(
            :thing=`{
              title: 'Their Offerings',
              names: ['inventory'],
              uuid: $uuid.v4()
            }`
            :parentOptions="['options', 'show inventory', 'slotted', 'generate slots', 'show slots', 'inventory mode', 'addable', 'put-options-last']"
          )
          .accept-trade-button-container
            .accept-trade-button-positioner
              .accept-trade-button.reject
                .accept-trade-button-content Reject

</template>

<script>
export default {
  data () {
    return {
      // objects: null,
      uuid: this._uid,
      entity: this.$store.state.entity
    }
  },
  sockets: {
    connect: function(){
      console.log("socket connect vue side")
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
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
  },
  components: {
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
.trade
  padding: 10px
  box-sizing: border-box
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
  .inventories
    display: flex 
    align-items: row
    justify-content: flex-start
    align-items: flex-start
    .trader-container
      width: 50%
      .trader-positioner
        width: 100%
        .accept-trade-button-container
          width: 100%
          max-width: 200px
          .accept-trade-button-positioner
            width: 100%
            .accept-trade-button
              width: 100%
              background: $green
              padding: 10px 4px
              box-sizing: border-box
              cursor: pointer
              .accept-trade-button-content
                color: white
              &.reject
                background: $red
</style>
