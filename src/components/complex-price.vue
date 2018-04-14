<template lang='pug'>
  .complex-price
  
</template>

<script>
export default {
  name: 'complex-price-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid
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
    removePrice: function(id){
      
    }    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // }
  },
  props: {

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
.complex-price
  width: 800px
  max-width: 100%
  overflow: hidden
  height: 100px
  background: $grey
</style>
