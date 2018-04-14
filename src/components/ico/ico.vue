<template lang='pug'>
  .ico
    .banner-container
      .banner-position-helper
        .banner-sizer
    .contents-container
      .contents-positioner
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things") things
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/manifest") manifest
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/sandbox") sandbox
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/styles") styles
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/styles/inventories") inventories
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/options") options
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things/options/etc") etc
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things") things
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things") things
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/things") things
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/status") status
            .content
        .content-container
          .content-positioner
            .content-title-container
              .content-title-positioner
                router-link.content-title(to="/ico/source") source
            .content
</template>

<script>
export default {
  name: 'ico-comp',
  data () {
    return {
      // objects: null,
      uuid: this._uid
    }
  },
  sockets: {
    connect: function(){
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
.ico
  width: 100%
  max-width: 100%
  overflow: hidden
  // background: $grey
</style>
