<template lang='pug'>
  .sidebar(:class="{ closed: optIn('closed') }")
    .sidebar-positioner
      //- .brand-container
      //-   a(href="/").brand {{ sidebar.siteTitle }}
      .welcome-message-container(v-if="entity")
        .welcome-message welcome,
          a(href="/self") {{ entity.username || entity.identity }}
      .inventory-list
        //- thing(
          :thing=`{
            title: 'Your Inventory',
            description: 'Somethings description..',
            properties: [
              {
                title: 'options',
                names: ['property'],
                list: [
                  //- 'show options',
                  //- 'show properties',
                  'focused',
                  //- 'editing',
                  'inventory mode',
                  'show inventory',
                  //- 'slotted',
                  //- 'show slots',
                  //- 'shrink slot icons',
                  //- 'generate slots',
                  //- 'addable',
                  //- 'put-first',
                  'put new things first',
                  'dont load childrens children',
                  'put addable last',
                  'hide title',
                  'properties not addable',
                  'holo mode'
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
            things: [
              //- {
              //- 	title: 'test'
              //- },
            ]
          }`)
        //- thing(
          :thing='entity.inventory && entity.inventory._id ? entity.inventory._id : entity.inventory'
          :count=40
          :parentOptions="['inventory mode', 'inventory', 'addable', 'put-last', 'owner-root', 'owner-only', 'put-options-last']"
          )

      .actions-group-container(v-if="sidebar")
        .actions-container(v-if="sidebar.actionGroups && sidebar.actionGroups.length > 0" v-for="actionsGroup in sidebar.actionGroups")
          .action(
            v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)"
            v-for="action in actionsGroup.actions"
            )
            a(v-if="action.type == 'link'" :href="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(v-else-if="action.type == 'dropdown'")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
        .actions-container(v-if="sidebar.actions && sidebar.actions.length > 0")
          .action(v-for="action in sidebar.actions" v-if="((action.auth.indexOf('user') >= 0) ? entity.auth : true) && (action.auth.indexOf('nouser') >= 0 ? !entity.auth : true)")
            a(v-if="action.type == 'link'" :href="action.link")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
            <component v-else-if="action.type == 'component' && !entity.auth" :is="action.text+'-comp'"></component>
            .dropdown-container(v-else-if="action.type == 'dropdown'")
              .text(v-if="action.render == 'text'") {{ action.text }}
              <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
      .actions-group-container.bottom-row
        .actions-container
          .action(
            v-if="entity.username"
            @click="logout"
            )
            .text logout
          .action(
            v-if="!entity.username"
            )
            router-link(
              to="/register"
              ) register
          .action(
            @click="pushOpt('closed')"
            )
            .text close

            //- <icon v-else-if="action.render == 'icon'" :name='action.icon'></icon>
</template>

<script>
import loginSmall from '@/components/login-small'
import smarts from 'smarts'
// import {mapGetters} from 'vuex'
export default {
  mixins: [smarts({
    vue: {
      reactiveSetter: true,
      vm: this
    }, 
    objList: 'this.optionsMutable', 
    stringList: 'this.optionsMutable',
  })],
  data () {
    return {
      sidebar: null,
      uuid: this._uid,
      entity: this.$store.state.entity,
      optionsMutable: this.$store.state.sideBarOptions
      // message: this.$store.state.entityMessage
    }
  },
  // computed: {
  //   // mix the getters into computed with object spread operator
  //   ...mapGetters({
  //     entity: 'entityGetter'
  //   })
  // },
  sockets: {
    connect: function(){
      // console.log("module %s connect vue side", this.$options.name)
    },
    giveNav(data){
      // console.log(data)
      if(this.uuid == data.id){
        this.sidebar = data.sidebar
      }
    }
  },
  created () {
    // this.getNav({
    //   id: this.uuid,
    //   siteTitle: this.siteTitle
    // })
    this.eventHub.$on('toggleSideBar', ()=>{
      this.toggleOpt('closed')
    })
    // this.$store.watch(state=>{
    //   return state.entity
    // },
    // ()=>{
    //   this.entity = state.entity
    // })
    this.optionsMutable = this.options
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
      this.entity.inventory = this.$store.state.entity.inventory
    },
    '$store.state.sideBarOptions': function(){
      this.optionsMutable = this.$store.state.sideBarOptions
    },
    // '$store.state.entityMessage': function(){
    //   this.message = this.$store.state.entityMessage
    // }
  },
  methods: {
    getNav(opts){
      this.$socket.emit('getNav', opts)
    },
    logout(){
      let opts = {}
      console.log('logging out')
      this.$socket.emit('logout', opts)
    }
  },
  props: {
    siteTitle: {
      default: "site title",
      type: String
    },
    options: {
      type: Array,
      default: function(){ return ['closed'] }
    }
  },
  components: {
    'login-small-comp': loginSmall
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
$sidebarSpace: 2%
.sidebar
  position: fixed
  display: flex
  flex-direction: row
  align-items: flex-start
  justify-content: flex-start
  top: 0
  right: 0
  width: 100%
  max-width: 369px
  overflow: hidden
  height: 100vh
  background: $grey
  z-index: 499
  transform: translateX(0%)
  +animate(all, 400ms, ease-in)
  .sidebar-positioner
    display: flex
    flex-direction: column
    align-items: center
    justify-content: flex-start
    height: 100%
    width: 100%
    padding-top: 55px
    box-sizing: border-box
    +animate(all, 500ms, ease)
    .brand-container
      margin-left: $sidebarSpace
      margin-right: auto
      .brand
        text-transform: capitalize
        font-size: 1.5rem
    .inventory-list
      width: 100%
      display: flex
      flex-direction: column
      padding-top: 20px
    .actions-group-container
      display: flex
      align-items: center
      justify-content: center
      flex-direction: row
      margin-left: auto
      margin-right: $sidebarSpace
      .actions-container
        display: flex
        align-items: center
        justify-content: center
        flex-direction: row
        margin-left: 15px
        // margin-right: $sidebarSpace
        &:first-child
          margin-left: 0px
        .action
          margin-right: 10px
          height: auto
          display: flex
          align-items: center
          justify-content: center
          a
            height: auto
            display: flex
            align-items: center
            justify-content: center
            // text-shadow: 1px 1px rgba(darken($green, 12), .4)
          .dropdown-container
            height: auto
            display: flex
            align-items: center
            justify-content: center
          .fa-icon
            margin-left: 10px
            margin-right: 10px
            // text-shadow: 1px 1px rgba(darken($green, 12), .4)
          .text
            margin-right: 5px
          &:last-child
            .text
              margin-right: 0px
      &.bottom-row
        margin-top: auto
        // margin-bottom: 0px
        // align-self: flex-end
        // top: auto
        // bottom: 0
        width: 100%
        padding-bottom: 10px
    .welcome-message-container
      // padding-left: 20%
      // padding-right: 10px
      display: flex
      align-items: center
      justify-content: center
      margin-right: auto
      margin-left: auto
      width: auto
  &.closed
    transform: translateX(100%)
    // width: 0%
</style>
