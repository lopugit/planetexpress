<template lang='pug'>
q-page
  .planetExpress.fit
    .splash-container
      .splash-positioner
        .splash
          .particles-container
            .particles-positioner
              .particles
                vue-particles.vue-particles(
                  :moveSpeed="2.5"
                  shapeType="star"
                  color="#FFF"
                  :opacity="0.7"
                  :particlesNumber="35"
                  :particleSize="4"
                  :lineLinked="false"
                )
          .particles-container
            .particles-positioner
              .particles
                vue-particles.vue-particles(
                :moveSpeed="2"
                  shapeType="image"
                  :image=`{
                    src: "/assets/pixel-ship.png"
                  }`
                  :particlesNumber="3"
                  :particleSize="30"
                )
          .search-container
            .search-positioner
              .search
                .addresses-container.pickupAddresses-container
                  .pickupAddresses-positioner
                    .pickupAddresses
                      .pickup-address-container(
                        v-for="(address, index) in pickupAddresses"
                        )
                        .pickup-address-positioner(
                          v-if=`index == 0 || interactionStarted`
                        )
                          .pickup-address
                            q-search.bg-primary.bg-white.q-if-inverted(
                              :placeholder=`index == 0 ? "What's the starting address?" : "What's the next stop?  We'll reorganize for efficiency"`
                              v-model='address.address'
                              :float-label=`index == 0 ? "Start from?" : "Next stop?"`
                              )
                              q-autocomplete(
                                @search="searchAddress"
                                @selected="item => selectAddress(item, index, 'pickupAddresses')"
                              )
                            .goods-container
                              .goods-positioner
                                .goods
                                  .good(
                                    v-for="good in gosmart(address, 'goods', [])"
                                    )
                                    img(
                                      src="assets/box.png"
                                      )
                                    q-chip(
                                      :floating="true"
                                      color="negative"
                                      small
                                      @click="removeGood(address, good, 'pickupAddress')"
                                      ).z-top.q-chip-good-delete
                                      q-icon(
                                        name="close"
                                        size=".9rem"
                                      )
                                    .good-name-container
                                      .good-name-positioner
                                        .good-name {{ good.name }}
                                  .add-good(
                                    @click=`
                                      addGood(false, address, 'pickupAddress')
                                      `
                                    )
                                    //- icon="add"
                                    q-btn(
                                      size="md"
                                      color="white"
                                      label="add box"
                                      ).shadow-3.text-primary
                                      //- q-chip(
                                        :floating="true"
                                        color="secondary"
                                        ) {{ address.goods.length }}
                                  //- .add-good(
                                    @click=`
                                      addGood(false, address, 'pickupAddress')
                                      `
                                    )
                                    //- icon="add"
                                    q-btn(
                                      size="md"
                                      color="white"
                                      label="link all"
                                      ).shadow-3.text-primary
                                      //- q-chip(
                                        :floating="true"
                                        color="secondary"
                                        ) {{ address.goods.length }}
                      .additional-actions-container
                        .additional-actions-positioner
                          .additional-actions
                            q-btn(
                              color="primary"
                              size="sm"
                              push
                              @click="addAddress({addressType: 'pickupAddresses', actionSource: 'user'})"
                              ).add-address-btn Add another stop
                .map-container
                  .map-positioner
                    .map
                      thing(
                        :thing=`currentMap`
                      )
                //- .addresses-container.dropoffAddresses-container
                  .dropoffAddresses-positioner
                    .dropoffAddresses
                      .dropoff-address-container(
                        v-for="(address, index) in dropoffAddresses"
                        )
                        .dropoff-address-positioner
                          .dropoff-address
                            q-search.bg-primary.bg-white.q-if-inverted(
                              placeholder="what's the dropoff address?"
                              v-model='address.address'
                              float-label="where to?"
                            )
                              q-autocomplete(
                                @search="searchAddress"
                                @selected="item => selectAddress(item, index, 'dropoffAddresses')"
                              )
                            .goods-container
                              .goods-positioner
                                .goods
                                  .good(
                                    v-for="good in gosmart(address, 'goods', [])"
                                    v-if="good.deliveryAddress && good.deliveryAddress == address.address"
                                    )
                                    img(
                                      src="assets/box.png"
                                      )
                                    .good-name-container
                                      .good-name-positioner
                                        .good-name {{ good.name }}
                                  .add-good(
                                    @click=`
                                      addGood(false, address, 'pickupAddress')
                                      `
                                    )
                                    q-btn(
                                      size="md"
                                      color="white"
                                      label="link all"
                                      ).shadow-3.text-primary
                                      q-chip(
                                        :floating="true"
                                        color="secondary"
                                        ).z-top {{ address.goods.length }}
                      .additional-actions-container
                        .additional-actions-positioner
                          .additional-actions
                            q-btn(
                              color="secondary"
                              size="sm"
                              push
                              v-if="dropoffAddresses.length > 0"
                              @click="addAddress('dropoffAddresses')"
                              ).add-address-btn Add another delivery address
          //- q-search.bg-primary.bg-white.q-if-inverted(
          //-   placeholder='where to?'
          //-   v-model='deliverAddress'
          //- )
          //-   q-autocomplete(
          //-     @search="searchAddress"
          //-   )
</template>

<script>
import smarts from 'smarts'
import thing from 'src/components/thing'
export default {
  name: 'planetExpress-comp',
  mixins: [
    smarts({
      vue: {
        reactiveSetter: true,
        vm: 'this'
      }
    })
  ],
  data () {
    return {
      // objects: null,
      uuid: this._uid,
      currentMap: {
        names: ['courier map'],
        properties: [
          {
            title: 'options',
            type: 'Array of Strings',
            'Array of Strings': [
              'show map',
              'no options',
              'hide description'
            ]
          }
        ]
      },
      pickupAddresses: [],
      dropoffAddresses: [],
      mapboxglAccessToken: "pk.eyJ1IjoibG9wdSIsImEiOiJjamFydTVhc3QxNjRtMzNwaHEzNmJ1bW0zIn0.Wm7f-1eyd7K5AT3WN7fRDw",
      funCounter: 1,
      interactionStarted: false
    }
  },
  sockets: {
    connect: function(){
      // console.log("socket connect vue side")
    },
    giveUniqueName(data){
      // console.log(data)
      // if(data.name){
      //   this.addGood(data.name, data.address, data.addressType)
      // }
    }
    // giveObjects(data){
    //   // console.log(data)
    //   if(this.uuid == data.id){
    //     this.objects = data.objects
    //   }
    // }
  },
  created () {
    this.addAddress({
      addressType: 'pickupAddresses'
      })
    this.addAddress({
      addressType: 'pickupAddresses'
      })
    console.log('window.L')
    console.log(window.L)
    if(navigator.geolocation && !this.pickupAddress){
      navigator.geolocation.getCurrentPosition(pos=>{
        this.getAddressFromCoords(pos.coords.longitude, pos.coords.latitude)
        .then(res=>{
          this.setsmart(this, 'pickupAddresses.0.address', res)
          this.interactionStarted = true
        })
        .catch(res=>{
          console.error(res)
        })
      })
    }
  },
  methods: {
    addAddress({addressType, address={address: undefined, goods: []}, actionSource}){
      if(addressType && address){
        if(this.interactionStarted || actionSource !== "user"){
          this.pushThing({
            option: address,
            list: this.gosmart(this, addressType, []),
            obj: true,
            key: 'address'
          })
        }
        if(actionSource == "user"){
          this.interactionStarted = true
        }
        
      }
    },
    removeGood(address, good, addressType){
      this.popThing({
        option: good,
        list: this.gosmart(address, 'goods', []),
        obj: true,
        key: 'name'
      })
    },
    addGood(name, address, addressType, funCounter=this.funCounter){
      if(!name){
        this.funCounter++
        let data = {
          name,
          address,
          addressType,
          funCounter
        }
        this.$socket.emit('getUniqueName', data)
        this.$options.sockets['giveUniqueName'] = data => {
          if(data.funCounter == funCounter){
            let good = {
              name: data.name
            }
            this.setsmart(good, data.addressType, address.address)
            this.setThing({
              option: good, 
              list: this.gosmart(address, 'goods', []), 
              obj: true, 
              key: 'name',
              push: true
            })
          }
        }
      }
    },
    tryGeojson(something){
      if(this.getsmart(something, 'coords', undefined) && this.getsmart(something, 'coords.latitude', undefined) && this.getsmart(something, 'coords.longitude', undefined)){
        let geojson = {
          center: [
            this.getsmart(something, 'coords.longitude', 145.179286),
            this.getsmart(something, 'coords.latitude', -37.983109)
          ],
          geometry: {
            coordinates: [
              this.getsmart(something, 'coords.longitude', 145.179286),
              this.getsmart(something, 'coords.latitude', -37.983109)
            ],
            type: 'Point'
          }
        }
        return geojson
      } else {
        return something
      }
    },
    getAddressFromCoords(lng, lat){
      return new Promise((resolve, reject)=>{
        let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + this.mapboxglAccessToken +"&types=address"
        this.$http.get(url)
        .then((data)=>{
          resolve(data.body.features[0].place_name)            
        })
        .catch((err)=>{
          console.error(err)
          reject(err)
        })
      })
    },
    autoCompleteAddress(text){
      return new Promise((resolve, reject)=>{
        let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+text+".json?access_token=" + this.mapboxglAccessToken +"&types=address"
        this.$http.get(url)
        .then((data)=>{
          console.log('data')
          console.log(data)
          resolve(data.body.features)            
        })
        .catch((err)=>{
          console.error(err)
          reject(err)
        })
      })
    },
    searchAddress(add, done){
      console.log(add)
      this.autoCompleteAddress(add)
      .then(res=>{
        console.log('res')
        console.log(res)
        let list = []
        for(var i=0;i<res.length;i++){
          list.push({
            label: res[i].place_name
          })
        }
        done(list)
      })
      .catch(res=>{
        console.error(res)
      })
    },
    selectAddress(item, index, which, actionSource){
      if(item && (index || index == 0) && which){
        this.setsmart(this, which+"."+index+".address", item.label)
        if(!this.interactionStarted){
          this.interactionStarted = true
        }
      }
    }
  },
  props: {
    "siteTitle": {}
  },
  components: {
    thing
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
<style lang="sass">
@import 'src/styles/vars'
.planetExpress
  width: 100%
  max-width: 100%
  overflow: hidden
  min-height: 100vh
  .splash-container
    min-height: 100vh
    background: $green
    width: 100%
    align-items: center
    justify-content: center
    display: flex
    flex-direction: column
    .splash-positioner
      width: 100%
      height: 100%
      .splash
        width: 100%
        height: 100%
        align-items: flex-start
        justify-content: center
        display: flex
        flex-direction: column
        position: relative
        .particles-container
          position: absolute
          top: 0
          left: 0
          width: 100%
          min-height: 100vh
          height: 100%
          .particles-positioner
            width: 100%
            height: 100%
            .particles
              width: 100%
              height: 100%
              .vue-particles
                height: 100%
                width: 100%
                canvas
                  height: 100%
                  width: 100%
        .search-container
          width: 100%
          min-height: 100vh
          // position: absolute
          padding-top: 20%
          padding-bottom: 10%
          top: 0
          left: 0
          display: flex
          align-items: center
          justify-content: center
          flex-direction: column
          .search-positioner
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            .search
              width: 100%
              display: flex
              align-items: center
              justify-content: center
              flex-direction: column
              max-width: 500px
              .q-search
                // margin-top: -15px
                padding: 15px
                // max-width: 95%
                .q-if-inner
                  min-height: 24px !important
                  padding-top: 0px !important
                .q-if-label
                  top: 3px
                .q-if-label-above
                  transform: scale(0.75) translate(0, -21px)
                input
                  width: 280px
                  &::selection
                    color: $green
                    background: rgba($green, .3)
                  // max-width: 90%
              .addresses-container
                width: 100%
                max-width: 100%
                padding: 0px 5px
                .additional-actions-container
                  margin-top: 10px
                  .action
                    color: white
                  .add-address-btn
                    // margin-top: 5px
                    // margin-bottom: 5px
                    .q-btn-inner
                      &::before
                      // color: black !important
                .pickupAddresses-positioner
                  .pickupAddresses
                    .pickup-address-container
                      padding-bottom: 25px
              .dropoffAddresses-container
                margin-top: 40px
                
        .goods-container
          margin-top: 13px
          max-width: 100%
          .goods-positioner
            max-width: 100%
            .goods
              display: flex
              max-width: 100%
              align-items: flex-start
              justify-content: flex-start
              flex-direction: row
              padding-bottom: 7px
              flex-wrap: wrap
              .good
                padding-right: 8px
                padding-bottom: 13px
                display: flex
                align-items: center
                justify-content: center
                flex-direction: column
                position: relative
                &:hover
                  .q-chip-good-delete
                    display: inline-flex !important
                    opacity: 1
                img
                  height: 40px
                  z-index: 100
                  // width: 40px
                .good-name-container
                  position: relative
                  display: flex
                  justify-content: center
                  align-items: center
                  .good-name-positioner
                    position: absolute
                    top: 0
                    display: flex
                    justify-content: center
                    align-items: center
                    .good-name
                      display: flex
                      justify-content: center
                      align-items: center
                      font-size: .6rem
                      text-align: center
              .add-good
                // padding: 3px
                margin-top: 5px
                margin-left: 2px
                // width: 30px
                // height: 30px
                background: white
                border-radius: 3px
                display: flex
                align-items: center
                justify-content: center
                box-shadow: 0px 3px 8px -1px rgba(black, .2)
                .add
                  // position:
                  color: $green
                  font-size: 1.3rem
        .map-container
          // display: none
          width: 100%
          margin-top: 5px
          .map-positioner
            width: 100%
            .map
              width: 100%
              // min-height: 100vh
              display: flex
              align-items: center
              justify-content: center
              flex-direction: column
  // background: $grey
//quasar mods
.q-chip-good-delete
  padding: 0px 5px !important
  min-height: 20px !important
  margin-left: -20px !important
  top: -0.5rem !important
  // display: none !important
  opacity: 0
  pointer-events: all
  +animate(all, 200ms, ease)
  .q-chip-main
    display: flex
    align-items: center
    justify-content: center
    padding: 3px 0px !important
  &:hover
    display: inline-flex !important
    opacity: 1
</style>
