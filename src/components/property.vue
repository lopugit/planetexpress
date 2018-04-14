<template lang='pug'>
  .property(
    :style=`
      getsmartval(property, 'properties.style', undefined)
    `
    )
    //- v-html=`property`
    //- special client properties
    template(
      v-if=`title == 'description'`
      )
      .description(
        v-html=`property`
        )
    template(
      v-if=`title == 'title'`
      )
      div(
        v-html=`property`
        )
</template>

<script>
import smarts from 'smarts'
export default {
  mixins: [smarts({
    vue: {
      reactiveSetter: true,
      vm: 'this'
    }, 
    objList: 'this', 
    stringList: 'this',
  })],
  name: 'property',
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
    "title": {},
    "property": {}
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
.property
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
</style>
