<template lang='pug'>
  .search
    .search-container
      .search-form
        v-select(
          placeholder=`Type in anything that you're looking for` @click=`popOpt('all'); pushOpt('first')`
          :pushTags=`false`
          :inputStore=`true`
          :taggable=`true`
          searchMessage=`No suggestions`
          :noDropArrow=`true`
          :options=`options`
          :label=`label`
          @input=`updateCurrentSearchText`
          :minResults=`2`
          )
</template>

<script>
import smartOpts from 'src/components/mixins/smartOpts'
export default {
  mixins: [smartOpts],
  name: 'search-comp',
  data () {
    return {
      optionsMutable: this.options
    }
  },
  sockets: {
    connect: function(){
      // console.log("module %s connect vue side", this.$options.name)
    },
    // giveObjects(data){
    //   // console.log(data)
    //   if(this.someid == data.id){
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
    //     id: this.someid
    //   })
    // } else {
    //   this.objects = null
    // }
  },
  methods: {
    // getObjects(opts){
    //   this.$socket.emit('getObjects', opts)
    // },
    updateCurrentSearchText(txt){
      this.$emit('searchText', txt)
    }

  },
  props: {
    options: {
      default: function(){ return ['double', 'all'] }
    },
    label: {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
@import 'src/styles/vars'

.search
  width: 80%
  margin-bottom: 10px
  .search-container
    width: 100%
    .search-form
      width: 100%
      display: flex
      flex-direction: row
      align-items: center
      justify-content: center
      flex-grow: 1
      flex-shrink: 1
      flex-wrap: no-wrap
      border-left: 2px solid darken($grey, 3)
      border-right: 2px solid darken($grey, 3)
      margin-bottom: 5px
      .search-input
        outline: none
        font-size: .8rem
        // font-weight: 800
        width: 100%
        padding: 12px
        text-align: center
        border: 2px solid darken($grey, 3)
        border-left: none
        border-right: none
        background: $grey
        +animate(all, 350ms, ease)
        height: auto
      .v-select
        width: 100%
        .dropdown-toggle
          border-radius: 0px
          border: none
          .selected-tag-list
            display: none
          .input-container
            // height: 100%
            input
              outline: none
              font-size: .8rem
              width: 100%
              height: auto
              // font-weight: 800
              box-sizing: border-box
              padding: 12px
              text-align: center
              border: 2px solid darken($grey, 3)
              border-left: none
              border-right: none
              background: $grey
              +animate(all, 350ms, ease)
              line-height: .8rem
        .dropdown-menu
          padding: 0px
          border-radius: 0px
          // border: 2px solid $grey
          border: none
          box-sizing: border-box
          overflow: hidden
          // li>a
          li
            +animate(all, 0ms, ease)
            margin: 0px
            padding: 0 10px
            padding-right: 4px
            width: 100%
            box-sizing: border-box
            a
              padding-left: 5px
              +animate(all, 0ms, ease)
</style>
