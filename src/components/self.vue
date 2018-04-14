<template lang='pug'>
  .self
    .entity-container
    .entity-inventories
      thing(
        :thing="entity.inventory"
        :parentOptions="['options', 'inventory', 'inventory mode', 'addable', 'put-options-last']"
      )
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
      this.entity.inventory = this.$store.state.entity.inventory
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
.self
  padding: 10px
  box-sizing: border-box
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
</style>
