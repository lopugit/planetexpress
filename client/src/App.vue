<template lang="pug">
  #q-app(ref="app")
    //- navbar(:siteTitle="siteTitle")
    q-layout(
      view="HHH Lpr fff"
      )
      q-layout-drawer(
        side="left"
        v-model="mainDrawer"
        :overlay="true"
        ).z-top
        //- q-toolbar(
        //-   color="primary"
        //-   )
          //- q-btn(
          //-   icon="close"
          //-   @click="mainDrawer = !mainDrawer"
          //-   ).shadow-0
        q-list
          q-item(
            )
            q-item-side
              q-item-tile(
                avatar
                sparse
                @click="mainDrawer = !mainDrawer"
                ).q-item-tile-profile-picture
                //- :style=`{
                //-   height: '50px',
                //-   width: 'auto'
                //- }`
                img(
                  src="/assets/astronaut.png"
                  )
            q-item-main(
            )
              q-item-tile(
                label
              ) Nikolaj Frey
              q-item-tile(
                sublabel
                size=".5rem"
                ) Star Man
            q-item-side(
              )
              q-btn(
                icon="close"
                @click="mainDrawer = !mainDrawer"
              ).shadow-0
          q-item-separator
          q-collapsible(
            label="Tracking"
            avatar="/assets/gps.png"
            )
            //- q-item(
              )
              q-item-main(
                label="Requested Jobs"
                )
            q-item(
              )
              q-item-main(
                label="Awaiting Pickup"
                )
            q-item(
              )
              q-item-main(
                label="Picked Up"
                )
            q-item(
              )
              q-item-main(
                label="En Route"
                )
            q-item(
              )
              q-item-main(
                label="Delivered"
                )
            q-item(
              )
              q-item-main(
                label="Routes"
                )
            q-item(
              )
              q-item-main(
                label="ETA's"
                )
            q-item(
              )
              q-item-main(
                label="Your Pilots"
                )
            q-item(
              )
              q-item-main(
                label="View Map"
                )
          q-item-separator
          q-collapsible(
            label="Notifications"
            avatar="/assets/bell.png"
            )
            //- q-item(
              )
              q-item-main(
                label="Requested Jobs"
                )
            q-collapsible(
              label="Messages"
              )
            q-item(
              )
              q-item-main(
                label="Picked Up"
                )
            q-item(
              )
              q-item-main(
                label="Delivered"
                )
            q-item(
              )
              q-item-main(
                label="ETA's"
                )
            q-item(
              )
              q-item-main(
                label="Delays"
                )
            q-item(
              )
              q-item-main(
                label="Discounts"
                )
            q-item(
              )
              q-item-main(
                label="Surges"
                )
            // Driver Only
            q-collapsible(
              label="New Jobs"
              avatar="/assets/a2b.png"
              )
          q-item-separator
          q-collapsible(
            label="Driver Hub"
            avatar="/assets/van.png"
            )
            q-collapsible(
              avatar="/assets/next-stop.png"
              label="Next Stop"
              )
              q-item-side()
              q-item-main(
                label="23 Conley St, Place Holder, 3174"
              )
            q-collapsible(
              avatar="/assets/route.png"
              label="Current Route"
              )
              q-item(
              )
                q-item-main(
                  label="Stop A"
                )
              q-item(

              )
                q-item-main(
                  label="Stop B"
                )
              q-item(
              )
                q-item-main(
                  label="Stop C (break)"
                )
              q-item(
              ) 
                q-item-main(
                  label="Stop D"
                )
            q-collapsible(
              avatar="/assets/routes.png"
              label="All Routes"
              )
            q-item(
              )
              q-item-side(
                avatar="/assets/sleep.png"
              )
              q-item-main(
                label="Rests"
                )
              q-item-side(
                avatar="/assets/question-yellow.png"
              ).q-verified-status
            q-collapsible(
              avatar="/assets/van.png"
              label="Your vehicle"
              )
            q-item(
              )
              q-item-side(
                avatar="/assets/box.png"
              )
              q-item-main(
                label="Current Inventory"
                )
              q-item-side(
                avatar="/assets/question-yellow.png"
              ).q-verified-status
            q-collapsible(
              label="New Jobs"
              avatar="/assets/a2b.png"
              ) 
          q-item-separator
          q-collapsible(
            label="profile"
            avatar="/assets/astronaut.png"
          )
            q-collapsible(
              label="Current Location"
              avatar="/assets/where.png"
            )
              
              //- q-item-separator()
              q-list()
                q-item(
                )
                  q-item-side(
                    avatar="/assets/devices.png"
                  )
                  q-item-main(
                    label="Available Devices"
                    sublabel="Link a Device"
                    )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/assets/smartphone.png"
                  )
                  q-item-main(
                    label="Samsung Galaxy S5"
                    sublabel="23 Conley St, Noble Park, 3174"
                    )
                  q-item-side(
                    avatar="/assets/location-yes.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/assets/smartphone.png"
                  )
                  q-item-main(
                    label="Motorola X Play"
                    sublabel="40 Highett Rd, Moorabin"
                    )
                  q-item-side(
                    avatar="/assets/location-no.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/assets/computer-screen.png"
                  )
                  q-item-main(
                    label="Macbook Pro"
                    )
                  q-item-side(
                    avatar="/assets/location-no.png"
                  )
                q-item-separator()
                q-item(
                )
                  q-item-side(
                    avatar="/assets/tablet.png"
                  )
                  q-item-main(
                    label="Nexus 7"
                    sublabel="23 Conley St, Noble Park, 3174"
                    )
                  q-item-side(
                    avatar="/assets/location-no.png"
                  )
                q-item-separator()
                q-item
                  q-btn(
                    label="add a device"
                    wide
                  )
            q-collapsible(
              label="Identity"
              avatar="/assets/identification.png"
              )
              
              //- q-collapsible(
                avatar="/assets/license-plate.png"
                label="Identification"
                )
              q-collapsible(
                avatar="/assets/license.png"
                label="Licenses"
                )
                q-item(
                )
                  q-item-side(
                    avatar="/assets/license.png"
                  )
                  q-item-main(
                    label="Car License"
                  )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                q-item(
                )
                  q-item-side(
                    avatar="/assets/license.png"
                  )
                  q-item-main(
                    label="Truck License"
                  )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                q-item(
                )
                  q-item-side(
                    avatar="/assets/license.png"
                  )
                  q-item-main(
                    label="Boat License"
                  )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                q-item(
                )
                  q-item-side(
                    avatar="/assets/license.png"
                  )
                  q-item-main(
                    label="PWC License"
                  )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                q-item(
                )
                  q-item-side(
                    avatar="/assets/license.png"
                  )
                  q-item-main(
                    label="Aircraft License"
                  )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
              q-item(
              )
                q-item-side(
                  avatar="/assets/birth-certificate.png"
                )
                q-item-main(
                  label="Birth Certificate"
                )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-item(
              )
                q-item-side(
                  avatar="/assets/passport.png"
                )
                q-item-main(
                  label="Passport"
                )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-collapsible(
                label="Documents"
                avatar="/assets/documents.png"
              )
                  q-item(
                  )
                    q-item-side(
                      avatar="/assets/documents.png"
                    )
                    q-item-main(
                      label="Utility Bill 1"
                    )
                    q-item-side(
                      avatar="/assets/wrong-thick.png"
                    ).q-verified-status
                  q-item(
                  )
                    q-item-side(
                      avatar="/assets/documents.png"
                    )
                    q-item-main(
                      label="Utility Bill 2"
                    )
                    q-item-side(
                      avatar="/assets/wrong-thick.png"
                    ).q-verified-status
                  q-item(
                  )
                    q-item-side(
                      avatar="/assets/documents.png"
                    )
                    q-item-main(
                      label="Utility Bill 3"
                    )
                    q-item-side(
                      avatar="/assets/wrong-thick.png"
                    ).q-verified-status
                
              q-item(
                )
                q-item-side(
                  avatar="/assets/license-plate.png"
                )
                q-item-main(
                  label="Registration"
                  )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-item(
                )
                q-item-side(
                  avatar="/assets/contract.png"
                )
                q-item-main(
                  label="Insurance"
                  )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-item(
                )
                q-item-side(
                  avatar="/assets/cap.png"
                )
                q-item-main(
                  label="Police Check"
                  )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-item(
                )
                q-item-side(
                  avatar="/assets/group.png"
                )
                q-item-main(
                  label="Interview"
                  )
                q-item-side(
                  avatar="/assets/wrong-thick.png"
                ).q-verified-status
              q-collapsible(
                avatar="/assets/certificate.png"
                label="Qualifications"
              )
                q-item(
                  )
                  q-item-side(
                    avatar="/assets/certificate.png"
                  )
                  q-item-main(
                    label="Working with Children"
                    )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                q-item(
                  )
                  q-item-side(
                    avatar="/assets/certificate.png"
                  )
                  q-item-main(
                    label="RSA"
                    )
                  q-item-side(
                    avatar="/assets/wrong-thick.png"
                  ).q-verified-status
                
                
          q-item-separator(
            )
          q-collapsible(
            label="Business Hub"
            avatar="/assets/store.png"
            )
            q-item(
              )
              q-item-side(
                avatar="/assets/store.png"
              )
              q-item-main(
                label="Your store"
                )
              q-item-side(
                avatar="/assets/question-yellow.png"
              ).q-verified-status
            q-item(
              )
              q-item-side(
                avatar="/assets/box.png"
              )
              q-item-main(
                label="Current Inventory"
                )
              q-item-side(
                avatar="/assets/question-yellow.png"
              ).q-verified-status
            
          q-item-separator
          q-collapsible(
            label="Settings"
            )
          q-item-separator
          q-collapsible(
            label="More"
            )
            q-item(
              )
              q-item-main(
                label="Terms and Conditions"
                )
            q-item(
              )
              q-item-main(
                label="Insurance"
                )
            q-item(
              )
              q-item-main(
                label="Legal"
                )
          //- q-toolbar-title() Planet Express
      //- q-layout-header.fixed-top
      q-page-container.q-pt-none
        router-view.router-view(:siteTitle="siteTitle")
      q-toolbar.fixed-top.q-nav-toolbar(
        color="primary"
        :overlay="true"
        )
        q-btn(
          icon="menu"
          @click="mainDrawer = !mainDrawer"
          size="1.2rem"
          ).shadow-0
        img(
          src="/assets/pe-logo.png"
          @click="mainDrawer = !mainDrawer"
        )
        //- q-toolbar-title() Planet Express
    //- sidebar
</template>

<script>
import navbar from '@/components/nav'
import sidebar from '@/components/sidebar'
import smartOpts from '@/components/mixins/smartOpts'
export default {
  mixins: [smartOpts],
  name: 'app',
  data(){
    return {
      siteTitle: 'alopu',
      entity: this.$store.state.entity,
      uuid: this._uid,
      pageHistory: this.$store.state.pageHistory,
      mainDrawer: false
    }
  },
  sockets: {
    connect: function(){
      // console.log("socket connect vue side")
    },
    giveAuthenticate(data) {
      console.log(data)
      // console.log("this.$store")
      // console.log(this.$store)
      if(data.entity && data.auth){
        // console.log("setting store user state to user")
        data.entity.auth = true
        this.$store.commit('entitySet', data.entity)
        // this.$store.commit('entityMessageUpdate', "welcome, <a href='/self'>" + (this.entity ? this.entity.username : 'anonymous') + "</a>")
        // console.log(this.entity)
        // console.log(this.pageHistory)
        // console.log('this')
        // console.log(this)
        // console.log("mystery string for this.$router.go")
        // console.log('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
        // this.$router.go('/')
        // this.$router.go('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
        // this.$router.go('/' + (this.pageHistory.length > 0 ? this.pageHistory[this.pageHistory.length-1] : ''))
      } else {
        console.log('resetting entity')
        this.$store.commit('entitySet',  {
          type: 'temporary',
          identity: 'anonymous',
          auth: false,
          username: undefined
        })
        if(data.err){
          this.$store.commit('newAuthLog', {
            err: data.err,
            msg: 'something went wrong authorizing the user'
            })
        }
      }
    },
    giveRealms(data){
      if(data.id == this.uuid){
        // console.log("setting reamls in store")
        // console.log(data)
        this.$store.commit('SetRealms', data.realms)
        // this.$store.state.realms = ret.realms
      }
    }
  },
  created(){
    let that = this
    var down
    var up
    var waitdown
    var waitup
    var movingTimerDown
    var movingTimerUp
    var lastUpTimer = new timer(()=>{}, 0)
    var lastDownTimer = new timer(()=>{}, 0)
    var count = 0
    var mouseClick = function(){
      // console.lgog('count click')
      let lastUp = lastUpTimer.getTimeLeft()
      new timer(()=>{
        document.body.classList.add('cursor-pointer')
      }, lastUp)
      lastDownTimer = new timer(()=>{}, lastUp+200)
    }
    var mouseUp = function(){
      // console.lgog('count release')
      let lastDown = lastDownTimer.getTimeLeft()
      new timer(()=>{
        document.body.classList.remove('cursor-pointer')
      }, lastDown)
      lastUpTimer = new timer(()=>{}, lastDown+100)
      count++
      // console.lgog(count)
    }
    document.body.onmousedown = mouseClick
    document.body.onmouseup = mouseUp
    console.log("%s was created", this.siteTitle)
    this.$socket.emit('getRealms', {
      id: this.uuid,
      find: {},
      count: Infinity
    })
    function timer(callback, delay) {
        var id, started, remaining = delay, running

        this.start = function() {
            running = true
            started = new Date()
            id = setTimeout(callback, remaining)
        }

        this.pause = function() {
            running = false
            clearTimeout(id)
            remaining -= new Date() - started
        }

        this.getTimeLeft = function() {
            if (running) {
                this.pause()
                this.start()
            }

            return remaining
        }

        this.getStateRunning = function() {
            return running
        }

        this.start()
    }
  },
  watch: {
    '$store.state.entity': function(){
      this.entity = this.$store.state.entity
    },
    '$store.state.pageHistory': function(){
      this.pageHistory = this.$store.state.pageHistory
    },
  },
  components: {
    navbar,
    sidebar
  }
}
</script>

<style lang="sass">
@import 'src/styles/vars'
html
  // cursor: url(/assets/cursors/ms/aero_link2.cur), pointer
  cursor: url(/assets/cursors/ms/aero_arrow.cur) 2 2, auto
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  // text-align: center
  color: $friendly
  // padding-top: 60px
  // min-height: 100vh
body
  margin: 0px
  &.cursor-pointer,
  &.cursor-pointer *
    cursor: url(/assets/cursors/ms/aero_link2.cur) 2 2, auto !important
h1,h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a,
.action,
.fa-icon,
a:-webkit-any-link,
.btn,
.btn-container
  color: $green
  text-decoration: none
  // cursor: url(/assets/cursors/ms/aero_link1.cur), pointer
  // border-bottom: 1px dotted rgba($green, .5)
  +animate(all, 300ms, ease)
  cursor: url(/assets/cursors/ms/aero_arrow.cur) 2 2, auto
  animation: 400ms hoverMaple linear infinite
  &:hover
    color: $greenhover

  +keyframes(hoverMaple)
    0%
      cursor: url(/assets/cursors/ms/aero_link2.cur) 2 2, pointer 
    49%
      cursor: url(/assets/cursors/ms/aero_link2.cur) 2 2, pointer 
    50% 
      cursor: url(/assets/cursors/ms/aero_link1.cur) 2 2, auto 
    99% 
      cursor: url(/assets/cursors/ms/aero_link1.cur) 2 2, auto 
    100%
      cursor: url(/assets/cursors/ms/aero_link2.cur) 2 2, pointer 
  
.fa-icon
  user-select: none
button,
.btn
  color: $green
  // cursor: url(/assets/cursors/ms/aero_link1.cur), pointer
.content-editable
  outline: none
  padding: 5px
  &:focus
    // background: white
input
  color: $friendly
body
  background: $white
.router-view
  // padding-top: 50px
.v-select
  $font-size: 1rem
  font-size: $font-size
  line-height: $font-size
  height: 100%
  max-width: 100%
  .dropdown-toggle
    border: none !important
    border-radius: 0px !important
    // border-bottom: 1px solid $grey !important
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    flex-wrap: wrap
    height: 100%
    max-width: 100%
    &:after
      display: none
    .input-container
      width: 100%
      max-width: 100%
      .form-control
        order: 1
        height: 100% !important
        max-width: 100%
        background: rgba(black, 0)
        font-size: $font-size
        line-height: $font-size
        font-family: $family
        padding: 0 4px
    .selected-tag-list
      order: 2
      max-width: 100%
      .selected-tag
        margin: 0
        margin-left: 4px
        padding: 0
        padding-right: 9px
        max-width: 100%
        height: auto
        font-size: $font-size
        line-height: $font-size + .3rem
        background: rgba(black, 0)
        color: $friendly
        font-family: $family
        width: auto
        border: none
        border-radius: 0px
        max-height: 100%
        white-space: normal
        position: relative
        text-transform: capitalize
        word-wrap: break-word
        &:first-child
          // margin-left: 4px
        button
          top: 0
          left: -5px
          position: absolute
          align-self: flex-start
          bottom: auto
          float: right
          font-size: .85rem
          line-height: .2rem
          // font-weight: 900
          color: rgba(darken($green, 0),.5)
          opacity: 1
    .open-indicator
      top: 0px
      display: flex
      align-self: flex-start
      align-items: center
      justify-content: center
      &:before
        height: 5px
        width: 5px
        border-width: 1px 1px 0 0
  .dropdown-menu
    border: 1px solid rgba($friendly, .15)
    display: flex
    align-items: flex-start
    justify-content: flex-start
    flex-direction: column
    text-transform: capitalize
    li
      margin-right: 4px
    .active,
      background-color: rgba($green, .5)
    .highlight
      background-color: $green
      a
        background-color: inherit
.mapboxgl-ctrl-logo
  display: none !important
.mapboxgl-ctrl-attrib
  display: none !important

// quasar style modifications
.q-pt-none
  // padding-top: 0px !important
.q-nav-toolbar
  background: rgba($green, 0) !important
  img
    width: 60px
    height: auto
    right: 0
    margin-right: 0px
    margin-left: auto
.text-primary
  color: $green !important
.q-chip
  margin-left: -16px !important
  top: -0.6rem !important
  padding: 0 10px !important
  min-height: 25px !important
.q-verified-status
  text-align: center
  justify-content: center
  img
    width: 20px
    height: auto
.q-item-tile-profile-picture
  img
    width: 60px
    height: auto
  width: auto
  height: auto
</style>
