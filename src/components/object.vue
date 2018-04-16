<template lang='pug'>
  .thing(
    ) {{ optIn('a lopu dom node', getsmartval(thing, 'properties.names', [])) ? domval(thing) : '' }}
    //- .debug {{ thing }}
    // 
    template(
      v-for="(property, key) in thing.properties"
      v-if=`
        thing.properties
        &&
        !optIn('a lopu dom node', getsmartval(thing, 'properties.names', []))
        &&
        thing.constructor == Object
        `
      )
      div {{ key }}
      div {{ property }}
      //- v-if=`key == 'description'`
      //- object(
      //-   :title=`key`
      //-   :thing=`property`
      //-   )
</template>

<script>
import smarts from 'smarts'
export default {
  mixins: [smarts({
    vue: {
      reactiveSetter: true,
      vm: 'this'
    }, 
    objList: 'this.thingMutable.things', 
    stringList: 'this.thingMutable.properties.mapped.options.Array of Strings',
    })],
  data () {
    return {
      thingMutable: this.thing,
      entity: this.$store.state.entity,
      feedback: null,
      realms: this.$store.state.realms,
      thingTypes: this.$store.state.thingTypes,
      types: this.$store.state.types,
      thingNames: this.$store.state.thingNames,
      priceUnits: this.$store.state.priceUnits,
      currencies: this.$store.state.currencies,
      urls: [
        "http://agora.dev/forum",
        "http://lopu.com.au",
        "http://agora.lopu.com.au"
      ],
      err: null,
      alterEgos: [this.$store.state.entity.username ? this.$store.state.entity.username : 'anonymous', 'anonymous'],
      neighboursMutable: this.neighbours,
      messages: [],
      funCounter: 0,
      limitMutable: 5,
      loadLimitMutable: 5,
      propertiesLimitMutable: 50,
      propertiesLoadLimitMutable: 5,
      valueLimitMutable: 5,
      valueLoadLimitMutable: 5,
      savesToMutable: this.savesTo,
      optionsMutable: [],
      childOptions: [],
      parentOptionsMutable: this.parentOptions,
      defaultThingMutable: this.defaultThing,
      thingMap: undefined,
      thingMapGeocoder: undefined,
      thingMapFeatures: {
        type: "FeatureCollection",
        features: []
      },
      invGrid: {
        width: 80,
        invWidth: undefined,
        padding: '2px 3px'
      },
    }
  },
  sockets: {
    connect: function(){
      // console.error("socket connect vue side")
    },
    giveThing(data){
      if(this.thingMutable.uuid == 'hmm'){
        console.log('got thing %s', Date.now())
      }
      /** check if this is the matching component for the received thing,
       *  or if this is the matching thing for the received thing,
       *  we update the data
       **/
      if(this.sameObj(data.thing, this.thingMutable, data)){
          this.thingMutable = data.thing
          if(data.giveEvent = 'save'){
            this.$emit('saved')
          }
          /** map the properties of the thing
          */
           this.mapProperties()
           .then(ret=>{
              this.reinit()
              this.popOpt('editing')
              this.pushOpt('fetched')
           })
           .catch(err=>{
             console.error(err)
           })
          this.setFeedback(data.feedback)
        }
      /** otherwise check if this thing is the parent/parent component of the received thing
       *  and add it to this/the receiving thing's things
       */
      else if (this.isParent(data)) {
        if(this.optIn('a lopu inventory generator', this.getsmart(this.thingMutable, 'names', []))){
          if(this.thingMutable.uuid == 'hmm'){
            console.log('where we should be')
          }
          data.thing.tag = 'loading'
          this.setThing({
            option: data.thing, 
            list: this.gosmart(this, 'thingMutable.things', []), 
            obj: true, 
            key: ['_id', 'uuid', 'tag'], 
            keymatchtype: 'broad', 
            push: true, 
            strings: true
          })
          .then(suc=>{
            delete data.thing.tag
          })
          .catch(err=>{
            if(err){
              console.error(err)
            }
          })
          if(this.optIn('a lopu map', this.getsmart(this.thingMutable, 'names', []))){
            this.pushThingFeature(data.thing, 'render')
          }
        } else {
          for(var relation=0; relation<data.thing.relatives.length;relation++){
            /** then check if the receiving thing has the id of the given thing stored in 
             *  it's list of the relationship we're checking
             *  if so, replace the id with the given thing
             */
              if(
                this.optIn(data.thing._id, this.thingMutable[data.thing.relatives[relation].path]) 
                || 
                this.optIn(data.thing, this.thingMutable[data.thing.relatives[relation].path], true)
                ||
                this.optIn(data.thing, this.thingMutable[data.thing.relatives[relation].path], true, 'uuid')
                ){
                  this.setThing({option: data.thing, list: this.thingMutable[data.thing.relatives[relation].path], obj: true, key: ['_id', 'uuid'], keymatchtype: 'broad', strings: true})
                }
            /** otherwise check if the thing already exists as an object in the receiving things list
             *  of things
             */
              else if (this.optIn(data.thing, this.thingMutable.things, true)){
                /** ?.? how to handle an existant object in the place of the given thing
                 *  store the previous state in the states of the given thing
                 */
                  // this.pushOpt(this.thingMutable.things.mapped[this.optIndex(data.thing, this.thingMutable.things, true, '_id')], this.editHistory)
                /** replace the given thing's state stored in the receiving thing's list of things
                 *  with the given thing
                 */
                  // this.pushOpt(data.thing, this.thingMutable.things, true, '_id')
              }
            /** otherwise we check if the given thing's relatives list includes
             *  this/the receiving thing's id and
             *  append it to the relative list of this relationship
             */
              if(this.thingMutable._id && this.thingMutable._id.toString() == data.thing.relatives[relation].relative){
                this.pushOpt(data.thing, this.thingMutable[data.thing.relatives[relation].path], true)
              }
              // if (this.anyOptsIn([this.thingMutable._id, this._uid], data.thing.parents)){
              //   if(!data.returnPath && this.optIn(data.thing._id, this.thingMutable.things)){
              //     this.pushChildThing(data.thing, this.thingMutable[data.thing.relatives[relation].path])
              //   } else if(data.returnPath){
              //     this.pushChildThing(data.thing, this.thingMutable[data.thing.relatives[relation].path])                
              //   }
              // } 
              // else if (!this.optIn('owner-only')) {
              //   this.pushOpt(data.thing, this.thingMutable[data.returnPath], true)
              // }
          }
          if(this.entity && this.entity.inventory){
            if((this.entity.inventory._id == this.thingMutable._id && this.thingMutable._id !== undefined) || (this.entity.inventory.uuid == this.thingMutable.uuid && this.thingMutable.uuid !== undefined)){
              this.$store.commit('entityInventorySet', this.thingMutable)
            }
          }
        }

      } else if (data.thing.title && data.thing.title.indexOf('-comments') >= 0){

      }
    },
    giveThings(data){
      /** check if this thing is the parent of the given things
       */
        if(this.isParent(data) && data.returnPath){
          this.setThings({options: data.things, list: this.thingMutable[data.returnPath], obj: true, strings: true})
          this.mapList(this.thingMutable[data.returnPath])
        }
    },
    confirmThingDeletion(data){
      console.log('wtf')
      console.log(this.sameObj(this.getsmart(data, 'thing', undefined), this.getsmart(this, 'thingMutable', undefined), data))
      console.log(data)
      if(this.sameObj(this.getsmart(data, 'thing', undefined), this.getsmart(this, 'thingMutable', undefined), data)){
        if(this.getsmart(data, 'feedback.success', false)){
          this.$emit('remove')
          this.setsmart(this, 'thingMutable', undefined)
        } else {
          this.setFeedback(null)
          this.pushOpt({
            text: this.getsmart(data, 'feedback.message', 'There was an error deleting this thing from the database'),
            // text: 'um',
            from: 'lopu'
          }, this.messages)
        }
      }
    }
  },
  created(){
  },
  mounted() {
    this.isMounted = true
    let that = this
    window.onresize = function(){
      that.addSlotsToInv()
    }
    // instantiates thing
    this.create()
  },
  methods: {
    // constructors/initializors
      create(){
        /** check if the passed thing is an object
         */
          if(this.thingMutable && typeof this.thingMutable === 'object'){
            this.reinit()
            /** optional feedback message for empty inventory
             */
              // if(this.thingMutable.things.length < 1){
              //   this.pushOpt({
              //     text: 'this inventory has nothing in it, yet',
              //     from: 'Agora'
              //   }, this.messages)
              // }
          }
        /** otherwise if the passed thing was a string, most likely an objectId
         * we fetch it if the option no-fetch was not passed
         */
          else if ( typeof this.thingMutable == 'string' && !this.optIn('no-fetch')){
            
            this.getThing({
              thing: this.thingMutable,
              parentId: this.parentId,
              clientId: this._uid,
              populations: [
                {
                  path: 'properties'
                }
              ]
            })
            this.thingMutable = {
              _id: this.thingMutable,
              names: ['loading']
            }
          } else {
          }

        /** a timeout function for hiding loading things to not annoy users
         */
          let that = this
          setTimeout(function(){
            if(that.optIn('loading', that.getsmart(that, 'thingMutable.names', []))){
              // that.pushOpt('waiting-hidden', that.thingMutable.names)
            }
            }, 12345)

        /** set options for child things */
          this.setChildOptions()
          
      },
      reinit(){
        if(this.thingMutable.uuid == 'hmm'){
          console.log('reinitting')
        }
        /** create mutable / unlinked version of originally passed parent options 
        */
          this.parentOptionsMutable = JSON.parse(JSON.stringify(this.parentOptions))
        this.mapProperties()
        .then(ret=>{
          /** merge client passed schema
           */
          this.applySchema()
          .then(success=>{
            this.mapProperties()
            .then(success=>{
              /** check properties for client side options that usually require a value
              */
                this.checkPropertiesForOptions()
              /** take options from options property and load them into optionsMutable
               */
                this.updateOpts()
              /** set thing location to client location then continue
               */
                this.updateThingLocation({loc: 'user', overwrite: false})
                .then(status=>{
                  /** check if the passed thing is an inventory generator, identified by
                  * the string 'a lopu inventory generator' within thing.properties.mapped['meta-names'] list
                  */
                    if(
                      this.optIn('a lopu inventory generator', this.getsmart(this, 'thingMutable.names', [])) 
                      && 
                      !this.optIn('gotten')
                      &&
                      !this.getsmart(this, 'thingMutable.properties.mapped.dont gen this lopu', false)
                      ){
                      /** create the find and count variables for our mongoose query
                      * we separate count because it's a function of .find()
                      * we separate populate because it's a funciton of .find()
                      */
                        let find = this.generateFind()
                      if(find){
                        let count = this.generateFind({piece: 'count'})
                        let findOptions = this.generateFind({piece: 'options'})
                        var currentCount = this.getsmart(this, 'thingMutable.things.length', 0)
                        var things = this.gosmart(this, 'thingMutable.things', [])
                        for(var i=0; i<count; i++){
                          this.pushThing({
                            option: {
                              names: ['loading'],
                              uuid: false,
                              tag: 'loading'
                            },
                            list: things
                          })
                          var that = this
                        }
                        this.limitMutable = this.limitMutable + count
                        /** then emit a socket.io function asking for things
                        *
                        */
                          this.getThings({
                            parentId: this.getsmart(this, 'thingMutable._id', this._uid),
                            entity: {_id: this.entity._id},
                            returnPath: 'things',
                            find,
                            count,
                            findOptions,
                            stream: true
                          })
                          this.pushOpt('gotten')
                          this.popOpt('regen lopu')
                      }
    
                    }
                })
                .catch(err=>{
                  if(err){
                    console.error(err)
                  }
                })
              /** check if we should render any comments */
                if(this.optIn('show-comments')){
                  this.loadComments()
                }
              /** check if the passed thing is a classical inventory
              *  if so, set option show inventory, so that when you click an inventories icon, it automatically
              *  shows the inventory
              */
                if(this.optIn('inventory', this.thingMutable.names)){
                  this.pushOpts(['show inventory', 'inventory mode'])
                }
      
      
              /** set options for child things */
                this.setChildOptions()
              /** set default new thing */
                this.resetDefaultThing()
              
              /** slotify things */
                this.addSlotsToInv()
            })
            .catch(err=>{
              if(err){
                console.error(err)
              }

            })
          })
          .catch(err=>{
            if(err){
              console.error(err)
            }
          })
        })
        .catch(err=>{
          console.error(err)
        })
      },
    // socket functions
      getThing(opts){
        this.$socket.emit('getThing', opts)
      },
      getThings(opts){
        console.log('emitting request %s', Date.now())
        this.$socket.emit('getThings', opts)
      },
    // prices
      addPrice(){
        if(this.thingMutable.contract){
          this.thingMutable.contract.push({
            thing: null,
            amount: null,
            multiplier: null,
            unit: null
          })
        } else {
          this.$set(this.thingMutable, 'contract', [
            {
              thing: null,
              amount: null,
              multiplier: null,
              unit: null
            }
          ])
        }
      },
      removePrice(price){
        this.thingMutable.contract.splice(price, 1)
      },
    // editing
      updateDescription(operation){
        // if()
        this.setsmart(this, 'thingMutable.description', operation.api.origElements.innerHTML)
      },
      updateTitle(operation){
        // if()
        this.setsmart(this, 'thingMutable.title', operation.api.origElements.innerHTML)
      },
      updateValue(operation){
        // if()
        this.value = operation.api.origElements.innerHTML
      },
      updateAt(a, b, c){
        console.log(a)
        console.log(b)
        console.log(c)
      },
    // option render management
      showOptions(){
        if(!this.optIn('icon') && !this.optIn('hiding')){
          this.pushOpt('show options')
        }
      },
      showOptionsPerm(){
        this.pushOpts(['show options', 'focused'])
        this.popOpts(['hiding'])
      },
      toggleOptions(){
        if(this.optIn('focused')){
          this.popOpts(['show options', 'focused'])
          // this.pushOpts(['hiding'])
        } else if (!this.optIn('icon')) {
          this.pushOpts(['show options', 'focused'])
          // this.popOpt('hiding')
        }
      },
      hideOptions(){
        this.popOpts(['show options', 'focused'])
        this.pushOpt('hiding')
        setTimeout(this.popOpt('hiding'), 4000)
      },
      hideOptionsMaybe(){
        if(!this.optIn('focused') && this.optIn('show options')){
          this.popOpt('show options')
          // setTimeout(this.hideOptionsMaybe('second'), 600)
        }
      },
    // feedback
      setFeedback(opts){
        /** @argument's
         *  @param opts.message is the text message
         *  @param opts.type is the type of feedback
         *  @param opts.success is a boolean signifying some successful action or not
         *  @param opts.err is the accomponying error if there is one
         */
        if(!opts){
          this.feedback = null
        } else {
          this.feedback = opts
        }
      },
    
    // generators/automators
      generateFind({piece='for', obj = this.thingMutable} = {}){
        // generate owner/parents find options
        if(typeof obj == 'object'){
          if(!piece || piece == 'for'){
            var find = {}
            // if(this.getsmartvalue(obj, 'properties.mapped.dont gen this lopu', false)){
            //   return false
            // } else {
              if(this.getsmart(obj, 'properties.mapped.a special lopu regex to match.'+this.getsmart(obj, 'properties.mapped.a special lopu regex to match.type', 'String'), false)){
                let string = this.getsmart(obj, 'properties.mapped.a special lopu regex to match.'+this.getsmart(obj, 'properties.mapped.a special lopu regex to match.type', 'String'), undefined)
                let split = string.split(" ")
                find.realms = {$in: split}
                find.names = {$in: split}
                find.text = { regex: true, value: string, options: 'i' }
                find.description = { regex: true, value: string, options: 'i' }
                find.title = { regex: true, value: string, options: 'i' }
                find.orAllTheThings = true
              } else {
                find.realms = this.getsmart(obj, 'properties.mapped.ignore realms.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.realms to match.Array of Strings.length', 0) > 0 ? this.getsmart(obj, 'properties.mapped.broadly match realms.Boolean', false) ? {$in: this.getsmart(obj, 'properties.mapped.realms to match.Array of Strings', undefined)} : {$all: this.getsmart(obj, 'properties.mapped.realms to match.Array of Strings', undefined)} : undefined
                find.names = this.getsmart(obj, 'properties.mapped.ignore names.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.names to match.Array of Strings.length', 0) > 0 ? this.getsmart(obj, 'properties.mapped.broadly match names.Boolean', false) ? {$in: this.getsmart(obj, 'properties.mapped.names to match.Array of Strings', undefined)} : {$all: this.getsmart(obj, 'properties.mapped.names to match.Array of Strings', undefined)} : undefined
                find.owners = this.getsmart(obj, 'properties.mapped.ignore owners.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.owners to match.Array of Strings.length', 0) > 0 ? this.getsmart(obj, 'properties.mapped.broadly match owners.Boolean', false) ? {$in: this.getsmart(obj, 'properties.mapped.owners to match.Array of Strings', undefined)} : {$all: this.getsmart(obj, 'properties.mapped.owners to match.Array of Strings', undefined)} : undefined
                find.text = this.getsmart(obj, 'properties.mapped.ignore text.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.text to match.String', false) ? this.getsmart(obj, 'properties.mapped.broadly match text.Boolean', false) ? { regex: true, value: this.getsmart(obj, 'properties.mapped.text to match.String', undefined), options: 'i' } : this.getsmart(obj, 'properties.mapped.text to match.String', undefined) : undefined
                find.description = this.getsmart(obj, 'properties.mapped.ignore description.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.description to match.String', false) ? this.getsmart(obj, 'properties.mapped.broadly match description.Boolean', false) ? { regex: true, value: this.getsmart(obj, 'properties.mapped.description to match.String', undefined), options: 'i' } : this.getsmart(obj, 'properties.mapped.description to match.String', undefined) : undefined
                find.title = this.getsmart(obj, 'properties.mapped.ignore title.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.title to match.String', false) ? this.getsmart(obj, 'properties.mapped.broadly match title.Boolean', false) ? { regex: true, value: this.getsmart(obj, 'properties.mapped.title to match.String', undefined), options: 'i' } : this.getsmart(obj, 'properties.mapped.title to match.String', undefined) : undefined
                find['geojson.geometry'] = this.getsmart(obj, 'properties.mapped.ignore location.Boolean', false) ? undefined : this.getsmart(obj, 'properties.mapped.geojson to match.geojson', false) ? { '$near': { '$maxDistance': this.getsmart(obj, 'properties.mapped.broadly match location.Boolean', false) ? this.getsmart(obj, 'properties.mapped.geojson search radius.Number', 12) * 10000 : 10000, '$geometry': this.getsmart(obj, 'geojson.geometry', undefined) } } : this.getsmart(obj, 'properties.mapped.use this things location.Boolean', false) ? { '$near': { '$maxDistance': this.getsmart(obj, 'properties.mapped.broadly match location.Boolean', false) ? this.getsmart(obj, 'properties.mapped.geojson search radius.Number', 12) * 1000 : 10000, '$geometry': this.getsmart(obj, 'geojson.geometry', undefined) } } : undefined
              }
              return find
            // }
          } else if (piece == 'count'){
            var count = this.getsmart(obj, 'properties.mapped.limit.Number', false) || this.getsmart(obj, 'properties.mapped.count.Number', 5)
            return count
          } else if (piece == 'options'){
            var options = {}
            options.sort = this.getsmart(obj, 'properties.mapped.sort.'+this.getsmart(obj, 'properties.mapped.sort.type', 'json'), undefined)
            return options
          }
        } 
        return false
        
      },
      getProperty(property, key='title', list=this.gosmart(this, 'thingMutable.properties', [])){
        for(var i = 0; i > list.length; i++){
          if(list[i][key] == property){
            return list[i]
          }
        }
      },
      updateRealmsList(realm, loading){
        this.$set(this.realms, 'searched', null)
        this.realms.push({
          key: "searched",
          realm: realm
        })
        // if(this.realms.indexOf(realm) < 0){
        //   this.searchedRealm = [realm]
        // }

      },
      genDefaultThing(type=undefined){
        if(type == 'slot'){
          return {
            realms: ['inventory slots'],
            title: 'debug',
            names: ['inventory slot'],
            properties: [
              {
                title: 'options',
                'Array of Strings': [
                  'inventory slot',
                  'icon'
                ],
                type: 'Array of Strings'
              }
            ],
            owners: [this.entity._id],
            parents: [this.thingMutable.uuid],
            uuid: this.$uuid.v4(),
          }
        } else if(this.optIn('a lopu inventory generator', this.thingMutable.names)){
          return {
            realms: ['new'].concat(this.getsmart(this.thingMutable, 'properties.mapped.realms to match.Array of Strings', [])),
            names: this.getsmart(this.thingMutable, 'properties.mapped.names to match.Array of Strings', []),
            description: undefined,
            properties: [
              {
                title: 'options',
                'Array of Strings': [
                  'editing',
                  'edited',
                  'is-default-thing',
                  this.optIn('shallow adders') ? 'less padding' : null
                ],
                type: 'Array of Strings'
              }
            ],
            owners: [this.entity._id],
            parents: [this.thingMutable],
            uuid: this.$uuid.v4(),
          }
        } else {
          return {
            realms: ['new'],
            description: undefined,
            properties: [
              {
                title: 'options',
                'Array of Strings': [
                  'editing',
                  'edited',
                  'is-default-thing',
                  this.optIn('shallow adders') ? 'less padding' : null
                ],
                type: 'Array of Strings'
              }
            ],
            owners: [this.entity._id],
            parents: [this.thingMutable],
            uuid: this.$uuid.v4(),
          }
        }
      },
      resetDefaultThing(){
        // this.defaultThingMutable = undefined
        this.defaultThingMutable = this.genDefaultThing()
      },
      setChildOptions(){
        this.childOptions = [
            this.optIn('feed') ? 'wide' : 'icon' ,
            this.optIn('addable') ? 'addable' : null,
            this.optIn('slotted') ? 'in slot' : null,
            this.optIn('shrink slot icons') ? 'shrink slot icon' : null,
            this.optIn('feed') ? null : 'inventory item',
            this.optIn('icon') ? 'no-fetch' : null,
            this.optIn('show inventory') ? 'fetch' : null,
            this.optIn('dont load childrens children') ? 'dont load children' : null,
            this.optIn('dont load children children children') ? 'dont load childrens children' : null,
            this.optIn('show-children-comments') ? 'show-comments' : null,
            this.optIn('shallow adders') ? 'shallow adders' : null
          ]
        this.childOptions = this.childOptions.filter(option => option || option == 0 )
      },
      removeMessage(index){
        this.messages.splice(index, 1)
      },
      sameObj(thing, thingOther, data){
        if(!thing || !thingOther){
          return false
        } else {
          return (
              thingOther 
              && 
              (
                (
                  (
                    ( data && this._uid && this._uid == data.clientId)
                    &&
                    (
                      (thingOther._id && thingOther._id == thing._id) 
                      || 
                      (thingOther.uuid && thingOther.uuid == thing.uuid) 
                    )
                  ) 
                  || 
                  (thingOther._id && thingOther._id == thing._id) 
                  || 
                  (thingOther.uuid && thingOther.uuid == thing.uuid) 
                )
                
              )
            )
        }
      },
      isParent(data){
        let ret =
          ( 
            (
              data.parentId !== undefined 
              && 
              ( 
                this.getsmart(this, 'thingMutable.uuid', undefined) == data.parentId
                || 
                this._uid == data.parentId 
                || 
                this.getsmart(this, 'thingMutable._id', undefined) == data.parentId
              )
            ) 
            ||
            (
              data.thing 
              && 
              ( 
                this.getsmart(data, 'thing.relatives',[]) 
                && 
                this.getsmart(this, 'thingMutable._id', false) 
                && 
                this.optIn({path: 'parents', relative: this.getsmart(this, 'thingMutable._id', {toString(){return undefined}}).toString()}, this.getsmart(data, 'thing.relatives',[]), true, ['relative', 'path'])
              ) 
            )
          )
            // ||
            // (
            //   data.clientId
            //   &&
            //   data.clientId == this._uid
            // )
        return ret
      },
      thingCleaned(thing=this.thingMutable){
        return {
          _id: thing._id,
          uuid: thing.uuid,
          title: thing.title,
          description: thing.description,
        }
      },
      valueToAThing(value){
        if(this.getsmart(value, 'constructor', undefined) !== Object){
          var thing = {
            type: this.childType,
            names: ['a lopu value']
          }
          thing[this.childType] = value
          return thing
        } else if(this.getsmart(value, 'constructor', undefined) === Object) {
          return value
        } else {
          return value
        }
      },
      firstOrLast(index, limit, list, Class='thing'){
        if((index == 0 || index) && limit && list){
          if(index == 0 && (limit == 1 || list.length == 1)){
            return false
          } else if(index == 0){
            return 'first-'+Class
          } else if(index <= limit && index == list.length-1 || index == limit-1) {
            return 'last-'+Class
          } else {
            return 'mid-'+Class
          }
        } else {
          return false
        }
      },
      osxTrunc(text){
        if(typeof text == 'string'){
          let textNormalized = text.replace(/&nbsp;/g, ' ')
          if(textNormalized.replace(/^\s+|\s+$/g, '').length > 26){
            let endString = textNormalized
              // replaces &nbsp; with ' ' to get normalized substring
              .replace(/&nbsp;/g, ' ')
              // replaces all trailing spaces with empty characters
              .replace(/\s+$/g, '')
              // gets a substring from the end of the string
              .substr(-8)
              // replaces all leading white spaces
              .replace(/^\s+/g, '')
              // replaces spaces with &nbsp; as a test
              // .replace(/\s/g, '&nbsp;')
              // replaces &nbsp; with spaces as a test
              // .replace(/&nbsp;/g, ' ')
            return textNormalized.replace(/&nbsp;/g, ' ').substr(0,19).replace(/\s+$/g, '') +"..."+ endString
          } else {
            return text
          }
        } else {
          return undefined
        }
      },
      trunc(text){
        if(typeof text == 'string'){
          let textNormalized = text.replace(/&nbsp;/g, ' ')
          if(textNormalized.replace(/^\s+|\s+$/g, '').length > 26){
            return textNormalized.replace(/&nbsp;/g, ' ').substr(0,26).replace(/\s+$/g, '') +".."
          } else {
            return text
          }
        } else {
          return undefined
        }
      },
      updateOpts(){
        return new Promise((resolve, reject)=>{
          /** check if given thing has options property
           */
            if(this.getsmart(this, 'thingMutable.properties.mapped.options', false)){
              /** merge / apply options passed from parent */
                this.pushOpts(this.parentOptionsMutable.filter(option => {
                  if(this.getsmart(this, 'thingMutable.properties.mapped.options.Array of Strings', []).indexOf('ignore client option '+option) < 0){
                    return option || option == 0
                  } else {
                    return false
                  }
                }))
                this.parentOptionsMutable = []
              resolve(true)
            } 
          /**  */
            else {
              this.mapList(this.gosmart(this, 'thingMutable.properties', []), 'title', 'options')
              .then(ready=>{
                if(ready){
                  resolve(this.updateOpts())
                } else {
                  var propertiesList = this.gosmart(this, 'thingMutable.properties', [])
                  this.pushThing({
                    option: {
                      // names: ['property'],
                      title: 'options',
                      'Array of Strings': [],
                      type: 'Array of Strings'
                    },
                    list: propertiesList,
                    obj: true,
                    key: 'title'
                  })
                  resolve(this.updateOpts())
                }
              })
              .catch(err=>{
                console.error(err)
                reject(err)
              })
            }
        })
      },
      checkPropertiesForOptions(){
        /** check if there are any options and meta values stored in properties 
         */
        if(this.gosmart(this, 'thingMutable.properties', []).constructor == Array){
          for(let property of this.thingMutable.properties){
            // this.mapList(property.properties)
            if(property.title == 'things render limit'){
              this.limitMutable = property[property.type || 'Number'] || 5
            }
            this.pushOpt(property.title)
          }
        }
      },
      addSlotsToInv(when){
        // initialize things variable
        var widthHave = Math.floor(this.getsmart(this, '$refs.inventory-list-container.offsetWidth', 93*6)) -2
        var widthOrig = 93
        var width = widthOrig
        if((this.invGrid.invWidth) == widthHave && (widthHave < widthOrig)){
        } else if(this.optIn('slotted')){
          // get width to work with
          // var widthHave = 500
          // figure out compromise width
          if(widthHave % width > width/3){
            while(widthHave % width > 7){
              width--
            }
          } else {
            while(widthHave % width > 7){
              width++
            }
          }
          this.invGrid.width = width
          // slot filling
          this.invGrid.invWidth = ( Math.floor(widthHave/width) ) * width
          if(this.optIn('generate slots')){
            var things = this.gosmart(this, 'thingMutable.things', [])
            // set rows
            // for non collapsing rows
            // var rows = Math.ceil(things.length / (Math.floor(widthHave/width))) > 4 ? Math.ceil(things.length / (Math.floor(widthHave/width))) : 4
            // collapse rows
            var rows = 4
            var slots = rows * ( Math.floor(widthHave/width) ) 
            slots = slots < this.limitMutable ? this.limitMutable : slots
            if(things.length < slots){
              let limit = slots-things.length
              for(var i=0;i<limit;i++){
                let thing = this.genDefaultThing('slot')
                this.mapList(this.setsmart(thing, 'properties', this.getsmart(thing, 'properties', [])))
                .then(result=>{
                  things.push(thing)
                })
                .catch(err=>{
                  console.error(err)
                })
              }
              this.limitMutable = slots
            } else if (things.length >= slots){
              // var thing = 0
                // var stop = false
                // while(things.length > slots && !stop ){
                //   if(this.optIn('inventory slot', this.getsmart(things, thing+'.names', []))){
                //     things.splice(thing, 1)
                //     if(thing > things.length-3){
                //       stop = true
                //     }
                //   } else {
                //     if(thing > things.length-2){
                //       stop = true
                //     }                    
                //   }
                //   thing++
                // }
              this.limitMutable = slots
            }
          }          
  
  
        } else {
        }

      },
      noValids(list){
        if(list && list.length){
          for(var i=0;i<list.length;i++){
            if(!list[i]){
              return true
            }
          }
          return false
        } else {
          return true
        }
      },
      applySchema(schema=this.getsmart(this, 'schema', undefined), thing=this.getsmart(this, 'thingMutable', undefined)){
        return new Promise((resolve, reject)=>{
          if(schema && thing){
            if(typeof schema == 'string'){
              // code for populating the schema here
              resolve(false)
            } else if(typeof thing !== 'string') {
              if(schema.properties){
                this.mapList(schema.properties, 'title', undefined, true)
                .then(success=>{
                  if(success){
                    schema.properties.forEach((property, index)=>{
                      if(typeof this.getsmart(property, 'title', '') == 'string' && this.getsmart(property, 'title', '').indexOf(' schema') >= 0){
                      let value = this.getsmart(property, property.type, false)
                      if(value){
                        if(value.constructor == Array){
                          let merge = this.getsmartvalue(property, 'properties', 'merge', false)
                          if(merge === true){
                            for(var i=0;i<value.length;i++){
                              this.pushThing({
                                option: value[i],
                                list: this.gosmartvalue(thing, property.title.replace(' schema', ''), [])
                              })
                            }
                          } else {
                            
                          }   
                        }
                        this.setsmart(thing, property.title.replace(' schema', ''), this.jsmart.parse(this.jsmart.stringify(value)))
                      }
                      }
                    })
                    resolve(true)
                  } else {
                    resolve(false)
                  }
                })
                .catch(err=>{
                  if(err){
                    console.error(err)
                  }
                })
              } else {
                // handle if schema has no data
                resolve(true)
              }
            } else {
              resolve(false)
            }
          } else if(!schema && thing) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      },
    // thing action handling
      pushChildThing(thing, list=this.gosmart(this, 'thingMutable.things', [])){
        this.pushOpt(thing, list, true, '_id')
        this.mapThings()
        this.mapThings('title', thing.properties)
      },
      saveThing(){
        // if(this.getsmart(this, 'thingMutable.description', false)){
          this.pushOpt(this.entity._id, this.gosmart(this, 'thingMutable.owners', []))
          if(this.savesToMutable){
            if(this.getsmart(this, 'savesToMutable.properties.#')){

            }
            this.pushOpts(this.savesToMutable, this.gosmart(this, 'thingMutable.parents', []))
          }
            this.thingMutable.clientId = this._uid
          let opts = {
            thing: this.thingMutable,
            clientId: this._uid,
            entity: this.entity,
          }
          this.$socket.emit('saveThing', opts)
        // } else {
        //   this.setFeedback({message: "please include some text for this post"})
        // }
      },
      forkThing(){
      },
      referenceThing(){
      },
      deleteThing(confirmed, path){
        if(confirmed == true){
          if(typeof this.thingMutable == 'object' && !this.thingMutable._id){
            this.$emit('remove')
            this.setsmart(this, 'thingMutable', undefined)
            this.setFeedback(null)
          } else {
            // this.$emit('remove')
            let opts = {
              thing: this.thingMutable,
              clientId: this._uid,
              entity: this.entity,
            }
            this.$socket.emit('deleteThing', opts)
            // this.neighboursMutable.splice(this.index, 1)
            this.setFeedback(null)
          }
        } else {
          this.setFeedback({message: "Are you sure you want to delete this?", type: "delete"})
        }
      },
      deleteChildThing(index, path){
        if((index || index == 0) && path && this.getsmart(this, 'thingMutable.'+path, false)){
          this.gosmart(this, 'thingMutable.'+path, []).splice(index, 1)
        }
      },
      savedChildThing(index){
        if(this.optsIn(['a lopu inventory generator', 'a lopu map'], this.getsmart(this.thingMutable, 'names', []))){
          this.renderThingsOnMap()
        }
      },
      addNewChildThing(){
        let thing = this.genDefaultThing()
        var things = this.gosmart(this, 'thingMutable.things', [])
        this.limitMutable = this.limitMutable + 1
        things.push(thing)
        this.updateThingLocation({thing, loc: 'map'})
      },
      addNewProperty(){
        var thing = {
          names: ['property'],
          owners: [this.entity._id],
          parents: [this.thingMutable._id],
          uuid: this.$uuid.v4(),
        }
        this.propertiesLimitMutable = this.propertiesLimitMutable + 1
        let properties = this.gosmart(this, 'thingMutable.properties', [])
        properties.push(thing)
      },
      addNewValue(){
        if(this.getsmart(this, 'thingMutable.type', undefined)){
          if(this.childType == 'String'){
            var thing = 'new string'
          } else {
            var thing = {
              names: ['a lopu value'],
              owners: [this.entity._id],
              parents: [this.thingMutable._id],
              uuid: this.$uuid.v4(),
              type: this.childType
            }
          }
          this.valueLimitMutable = this.valueLimitMutable + 1
          let array = this.gosmart(this, 'thingMutable.'+this.getsmart(this, 'thingMutable.type', undefined), [])
          array.push(thing)
        }
      },
      updateType(type){
        if(type && false){
          var curType = this.getsmart(this, 'thingMutable.type', undefined)
          var origType = this.getsmart(this, 'thingMutable.type', undefined)
          if(type.indexOf('Array') == 0){
            curType = Array
            if(type == 'Array of Arrays'){
              curType = []
              curType[0] = Array
            } else if(type == 'Array of Booleans'){
              curType = []
              curType[0] = Boolean
            } else if(type == 'Array of Things'){
              curType = []
              curType[0] = Object
            } else if(type == 'Array of Numbers'){
              curType = []
              curType[0] = Number
            } else if(type == 'Array of Strings'){
              curType = []
              curType[0] = String
            }
          } else if(type == 'Boolean'){
            curType = Boolean
          } else if(type.indexOf('Thing') == 0){
            curType = Object
            if(type == 'Thing of Arrays'){
              curType = {}
              curType["Array"] = Array
            } else if(type == 'Thing of Booleans'){
              curType = {}
              curType["Boolean"] = Boolean
            } else if(type == 'Thing of Things'){
              curType = {}
              curType["Object"] = Object
            } else if(type == 'Thing of Numbers'){
              curType = {}
              curType["Number"] = Number
            } else if(type == 'Thing of Strings'){
              curType = {}
              curType["String"] = String
            }
          } else if(type == 'Number'){
            curType = Number
          } else if(type == 'String'){
            curType = String
          }
          if(curType !== origType){
            // this.setsmart(this, 'thingMutable.type', curType)
            this.setsmart(this, 'thingMutable.type', curType)
          }
        }
        this.type = type
      },
    // client/server data merging
      mapInventory(currentThing, currentInventory, i){
        if(typeof currentThing == 'object' && currentThing.things){
          for(let thingOrInv of currentThing.things){
            if(currentThing.thing){
              currentInventory[thingOrInv.thing] = thingOrInv
              this.mapInventory(thingOrInv, currentInventory[thingOrInv.thing], i++)
            }
          }
        }
      },
      mapList(list, keyProperty='title', returnExistant, populate){
        return new Promise((resolve, reject)=>{
          if(!keyProperty){
            reject()
          } else if (list) {
            if(!list.mapped || typeof list.mapped === 'boolean'){
              this.$set(list, 'mapped', {})
            }
            if(list.length == 0){
              if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
                resolve(true)
              } else if(returnExistant) {
                resolve(false)
              } else {
                resolve()
              }
            }
            for(var i=0;i<list.length;i++){
              if(typeof list[i] !== 'string'){
                this.$set(list.mapped, list[i][keyProperty], list[i])
                if(i==list.length-1){
                  if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
                    resolve(true)
                  } else if(returnExistant) {
                    resolve(false)
                  } else {
                    resolve()
                  }
                }
              } else if(populate){
                var funCounter = this.funCounter
                this.funCounter = this.funCounter + 1
                this.getThing({
                  thing: list[i],
                  clientId: this._uid,
                  funCounter
                })
                this.$options.sockets['giveThing'] = data => {
                  if(this._uid == data.clientId && data.funCounter == funCounter){
                    this.$set(list, i.toString(), data.thing)
                    this.$set(list.mapped, list[i][keyProperty], list[i])
                  }
                  if(i==list.length-1){
                    if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
                      resolve(true)
                    } else if(returnExistant) {
                      resolve(false)
                    } else {
                      resolve()
                    }
                  }
                } 
              } else if(i==list.length-1) {
                if((returnExistant && this.getsmart(list, 'mapped.'+returnExistant, false)) || !returnExistant){
                  resolve(true)
                } else if(returnExistant) {
                  resolve(false)
                } else {
                  resolve()
                }
              }
            }
            // if(list.mapped && !list.mapped['agora-client-mapped']){
            //   this.$set(list.mapped, 'agora-client-mapped', true)
            // }
            
          }
        })
      },
      mapThings(key='title', things=this.gosmart(this, 'thingMutable.things', [])){
        return this.mapList(things, key)
      },
      mapProperties(){
        return this.mapList(this.gosmart(this, 'thingMutable.properties', []), 'title')
      },
    // comments
      loadComments(limit=5, source='all'){
        /** check if already loaded
         */
          if(!this.optIn('comments-loaded')){
            /** check if we want to source all comments from all inventories of comments
             */
              if(source=='all'){
                /** ask the server to populate/and filter all of the comments according to the opts
                 *  @param limit a limit of results
                 *  @param sortDirection ascending, descending
                 *  @param sortProperty ie. date, a-Z
                 */
      
                this.populateThings({
                  rules: {
                    title: { regex: true, value: '-comments' },
                  },
                  returnPath: 'things'
                  /** implentation lacking
                   *  populate based off a rule that references data that needs to be populated 
                   *  properties: {
                   *    uniques: {
                   *       list: {$in: ['title']}
                   *    }
                   *  }
                   */
                })
                  .then(()=>{
                    /** compile comments
                     */
                      this.compileComments()
                  })
              }
          }
      },
      compileComments(things=this.gosmart(this, 'thingMutable.things', [])){
        /** make sure the all-comments inventory exists
         */
          if(!things.mapped['all-comments']){
            things.push({
              title: 'all-comments',
              things: [],
              parents: [this.thingMutable._id],
              owners: [],
              properties: [
                {
                  title: 'things render limit',
                  Number: 0,
                  names: ['a lopu client option'],
                },
                {
                  title: 'uniques',
                  'Array of Strings': ['title'],
                  type: 'Array of Strings'
                }
              ],
              uuid: this.$uuid.v4(),

            })
            this.mapList(things)
          }
        /** make sure the this lopus comments inventory exists
         */
          if(!things.mapped['this lopus comments']){
            things.push({
              title: 'this lopus comments',
              things: [],
              parents: [this.thingMutable._id],
              owners: [],
              properties: [
                {
                  title: 'things render limit',
                  Number: 5,
                  names: ['a lopu client option']
                },
                {
                  title: 'uniques',
                  'Array of Strings': ['title'],
                  type: 'Array of Strings'
                }
              ],
              uuid: this.$uuid.v4(),

            })
            this.mapList(things)
          }
        /** loop over all things of the current thing to find comment inventories
         *  and store the results in the all-comments thing
         */
          for(let thing of things){
            /** match comment inventory by title and unique title property */
            // && this.optIn('title', thing.properties.uniques.things)
            if(thing.title && thing.title.indexOf('comments') >= 0 && thing.title !== 'all-comments'){
              this.pushOpts(thing.things, things.mapped['all-comments'].things)
            }
          }
        /** push opts saying we've populated comments
         */
          this.pushOpt('comments-loaded')
      },
    // populating
      populateThings({things=this.gosmart(this, 'thingMutable.things', []), returnPath='things', funCounter=this.funCounter, rules=undefined} = {}){
        /** increment function counter to track returns
         */
          this.funCounter++
        /** return a promise to signify population
         */
          // this.$options.sockets['giveThings'] = data => {
          // }      
          return new Promise((resolve, reject)=>{
            /** emit our population request
             */
              this.$socket.emit('populateThings', {
                  things: things,
                  parentId: this.thingMutable._id || this.thingMutable.uuid || this._uid, 
                  returnPath,
                  rules,
                  funCounter,
                  sort: 'inception',
                }
              ) 
            // allows us to await a socket specifically in this function
            this.$options.sockets['giveThings'] = data => {
              if(this.isParent(data) && data.funCounter == funCounter){
                this.setThings({options: data.things, list: this.gosmart(this, 'thingMutable.'+data.returnPath, []), obj: true, strings: true})
                  .then(()=>{
                    this.mapList(this.gosmart(this, 'thingMutable.'+data.returnPath, []))
                    .then(()=>{
                      resolve()
                    })
                  })
              }
            }
            // setTimeout(reject(), 30000)
          })
      },
      populate({things=this.gosmart(this, 'thingMutable.things', []), returnPath='things', funCounter=this.funCounter, rules=undefined} = {}){
        /** increment function counter to track returns
         */
          this.funCounter++
        /** return a promise to signify population
         */
          // this.$options.sockets['giveThings'] = data => {
          // }      
          return new Promise((resolve, reject)=>{
            /** emit our population request
             */
            this.$socket.emit('populateThings', {
                  things: things,
                  parentId: this.thingMutable._id || this.thingMutable.uuid || this._uid, 
                  returnPath,
                  rules,
                  funCounter,
                  sort: 'inception',
                }
              ) 
            // allows us to await a socket specifically in this function
            let that = this
            this.$options.sockets['giveThings'] = data => {
              if(this.isParent(data) && data.funCounter == funCounter){
                this.setThings({options: data.things, list: this.gosmart(this, 'thingMutable.'+data.returnPath, []), obj: true, strings: true})
                  .then(()=>{
                    resolve()
                    // this.mapList(this.thingMutable[data.returnPath])
                    //   .then(()=>{
                    //   })
                  })
                  .catch(()=>{
                    reject()
                  })
              } else {
                resolve()
              }
            }
            // setTimeout(reject(), 30000)
          })
      },
    // location
      locationInitialized(map){
        
        // geocoder search bar
        let geocoder =  new MapboxGeocoder({
          accessToken: mapboxgl.accessToken
        })
        this.thingMapGeocoder = geocoder
        map.addControl(geocoder);

        this.thingMap = map
        map.on('load', ()=>{
          // features
            // create thing feature layer
              map.addSource('things', {
                type: 'geojson',
                data: this.thingMapFeatures
              })
            // update search input address value
              this.updateGeoSearchValue()

          // listeners
            // listen for move events
            this.listenForDragEvents(map)
        })
      },
      listenForDragEvents(map){
        var movingTimer
        map.on('move', ()=>{
          clearTimeout(movingTimer)
          movingTimer = setTimeout(()=>{
              this.updateGeoSearchValue()
          }, 500)            
        })
      },
      updateThingLocation({thing=this.thingMutable, loc='user', overwrite=true}={}){
        return new Promise((resolve, reject)=>{
          if(!this.getsmart(thing, 'geojson', false)){
            if(loc == 'user'){
              if(navigator.geolocation && (overwrite || this.getsmart(thing, 'geojson', true))){
                navigator.geolocation.getCurrentPosition(pos=>{
                  this.$set(thing, 'geojson', this.tryGeojson(pos))
                  resolve(true)
                },
                err=>{
                  if(err){
                    console.error(err)
                  }
                  resolve(false)
                })
              } else {
                resolve(false)
              }
            } else if(loc=='map' && (overwrite || this.getsmart(thing, 'geojson', true))){
              if(!this.optIn('locationSet') || !this.sameObj(thing, this.thingMutable)){
                this.updateGeoSearchValue(thing)
                .then(geojson=>{
                  if(geojson){
                    thing.geojson = geojson
                    // if(thing == this.thingMutable){
                      this.pushOpt('locationSet')
                    // }
                    if(this.optsIn(['a lopu inventory generator', 'a lopu map'], this.gosmart(this.thingMutable, 'names', []))){
                      if(!this.sameObj(thing, this.thingMutable)){
                        this.pushThingFeature(thing, 'render')
                      }
                      resolve(true)
                    } else {
                      this.pushThingFeature(thing, 'render')
                      resolve(true)
                    }
                  } else {
                    resolve(false)
                  }
                })
                .catch(err=>{
                  console.error(err)
                  reject(err)
                })
              } else {
                this.popOpt('locationSet')
                this.removeMarker()
                resolve(false)
              }
            } else {
              resolve(false)
            }
          } else {
            resolve(false)
          }
        })
      },
      thingMapboxCoords(thing=this.thingMutable){
        return [this.findCoord('lng', thing), this.findCoord('lat', thing)]
      },
      thingLCoords(thing=this.thingMutable){
        return [this.findCoord('lat', thing), this.findCoord('lng', thing)]
      },
      findCoord(coord, thing=this.thingMutable){
        if(coord == 'lng'){
          return this.getsmart(thing, 'geojson.geometry.coordinates.0', this.getsmart(thing, 'geojson.coords.longitude', 145.1794972))
        } else if(coord == 'lat'){
          return this.getsmart(thing, 'geojson.geometry.coordinates.1', this.getsmart(thing, 'geojson.coords.latitude', -37.9831522))
        }
      },
      pushThingFeature(thing=this.thingMutable, render=false){
        let features = this.getsmart(this.thingMapFeatures, 'features', undefined)
        if(features){
          let feature = this.thingToFeature(thing)
          this.setThing({
            option: feature, 
            list: features, 
            obj: true, 
            key: ['properties.thing._id', 'properties.thing.uuid'],
            targets: ['properties.thing', 'geometry'],
            keymatchtype: 'broad', 
            push: true
          })
          .then(index=>{
            if(this.getsmart(this, 'thingMap.getSource', false) && this.thingMap.getSource('things')){
              this.thingMap.getSource('things').setData(this.thingMapFeatures)
            }
            if(render){
              this.renderFeatureMarker(index, features)
            }
          })
        }
      },
      removeMarker(index, features=this.gosmart(this, 'thingMapFeatures.features', []), thing=this.thingMutable){
        if(!index){
          for(var i=0; i<features.length;i++){
            if(this.sameObj(this.getsmart(features[i], 'properties.thing', undefined), thing)){
              let oldEl = features[i].properties.el
              if(oldEl){
                if(oldEl.parentNode){
                  oldEl.parentNode.removeChild(oldEl)
                }
              }
            }
          }
        } else {
          let oldEl = this.getsmart(features[index], 'properties.el', undefined)
          if(oldEl){
            if(oldEl.parentNode){
              oldEl.parentNode.removeChild(oldEl)
            }
          }
        }
      },
      renderFeatureMarker(index, features=this.gosmart(this, 'thingMapFeatures.features', [])){
        if(features && features[index] && this.thingMap){
          this.removeMarker(index, features)
          let markerEl = document.createElement('div')
          markerEl.className = 'marker'
          let imgEl = document.createElement('img')
          markerEl.appendChild(imgEl)
          let text = this.getsmart(features[index], 'properties.thing.description', this.getsmart(features[index], 'properties.thing.uuid', undefined))
          if(text){
            let textEl = document.createTextNode(text)
            // append text
            markerEl.appendChild(textEl)
          }
          imgEl.src = "../statics/svg/thingMarker.svg"
          features[index].properties.el = markerEl
          new mapboxgl.Marker(markerEl, {offset: [0, -15]})
            .setLngLat(features[index].geometry.coordinates)
            .addTo(this.thingMap)
        }
      },
      renderFeatureMarkers(features=this.gosmart(this, 'thingMapFeatures.features', [])){
        for(var i=0; i<features.length;i++){
          this.renderFeatureMarker(i, features)
        }
      },
      thingToFeature(thing=this.thingMutable){
        let feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: this.thingMapboxCoords(thing)
          },
          properties: {
            thing: this.thingCleaned(thing)
          }
        }
        return feature
      },
      updateGeoSearchValue(thing=this.thingMutable){
        return new Promise((resolve, reject)=>{
          this.getMapCentreAddress()
          .then((geojson)=>{
            if(geojson){
              this.thingMapGeocoder._inputEl.value = geojson.place_name
            }
            resolve(geojson)
          })
          .catch(err=>{
            if(err){
              console.error(err)
            }
          })
        })
      },
      getMapCentreAddress(){
        return new Promise((resolve, reject)=>{
          if(this.thingMap){
            let lng = this.thingMap.getCenter().lng
            let lat = this.thingMap.getCenter().lat
            let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + mapboxgl.accessToken +"&types=address"
    
            this.$http.get(url)
            .then((data)=>{
              resolve(data.body.features[0])            
            })
            .catch((err)=>{
              console.error(err)
              reject(err)
            })
          } else {
            reject()
          }
        })
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
      renderThingsOnMap(things=this.gosmart(this.thingMutable, 'things', [])){
        if(things){
          this.convertListToFeatures(things)
            .then(()=>{
              this.renderFeatureMarkers()
            })
        }
      },
      convertListToFeatures(things=this.gosmart(this.thingMutable, 'things', [])){
        return new Promise((resolve, reject)=>{
          if(things){
            for(var i=0; i<things.length;i++){
              this.pushThingFeature(things[i])
              if(i == things.length -1){
                resolve()
              }
            }
          } else {
            reject()
          }
        })
      },
  },
  watch: {
    '$store.state.entity'(){
      this.entity = this.$store.state.entity
    },
    '$store.state.realms'(){
      this.realms = this.$store.state.realms
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.thingTypes'(){
      this.thingTypes = this.$store.state.thingTypes
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.thingNames'(){
      this.thingNames = this.$store.state.thingNames
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.priceUnits'(){
      this.priceUnits = this.$store.state.priceUnits
      // this.searchRealms = this.$store.state.realms
    },
    '$store.state.currencies'(){
      this.currencies = this.$store.state.currencies
      // this.searchRealms = this.$store.state.realms
    },
    'thing'(){
      if(!this.sameObj(this.thing, this.thingMutable)){
        this.setsmart(this, 'thingMutable', this.thing)
        this.create()
      } else if(this.sameObj(this.thing, this.thingMutable)){
        // if(this.getsmart(this.thing, 'names', []).includes('a lopu inventory generator')){
        //   console.log('woo')
        // }
      }
    },
    'thing.properties'(){
      console.log('hmm')
      if(this.sameObj(this.thing, this.thingMutable)){
        if(this.getsmart(this.thing, 'names', []).includes('a lopu inventory generator')){
          if(!this.optIn('gotten') && this.optIn('regen lopu')){
            this.popOpt('regen lopu')
            console.log('woo')
            this.reinit()
          }
        }
      }
    },
    'thingMutable'(){
      let that = this
      if(this.thingMutable){
        /** remap things and properties if the new thingMutable is an object
         *
         */
          this.mapThings()
          this.resetDefaultThing()
          this.mapProperties()
          .then(ret=>{
            this.resetDefaultThing()
            this.updateOpts()
          })
        setTimeout(function(){
          if(that.optIn('loading', that.getsmart(that, 'thingMutable.names', []))){
            // that.$set(that, 'thingMutable', undefined)
            // that.$emit('remove')
            that.pushOpt('waiting-hidden', that.getsmart(that, 'thingMutable.names', []))
          }
        }, 6000)
        if(this.entity && this.entity.inventory){
          if((this.entity.inventory._id == this.thingMutable._id && this.thingMutable._id !== undefined) || (this.entity.inventory.uuid == this.thingMutable.uuid && this.thingMutable.uuid !== undefined)){
            this.$store.commit('entityInventorySet', this.thingMutable)
          }
        }
      }
    },
    'thingMutable.properties.mapped.options.Array of Strings'(){
      if(this.optIn('show inventory')){
        this.popOpt('no-fetch', this.childOptions)
        this.pushOpt('fetch', this.childOptions)
        if(!this.optIn('watched-inv')){
          this.addSlotsToInv()
        }
        this.pushOpt('watched-inv')
        // this.$nextTick(function(){
          
        // })
      } else {
        this.popOpt('watched-inv')
      }
    },
    'optionsMutable'(){
    },
    'parentOptions'(){
      if(!this.optIn('no-fetch', this.parentOptionsMutable) && !this.optIn('fetched') && this.optIn('fetch', this.parentOptionsMutable)){
        this.popOpt('no-fetch')
        this.create()
      }
    },
    // '$store.state.entityMessage'(){
    //   this.message = this.$store.state.entityMessage
    // }
  },
  props: {
    thing: {
      default(){
        return {
          properties: {
            title: 'my trip to wonderland',
            names: ['a lopu'],
            description: 'It was a hot summers night, awh awh awhoooooo',
            uuid: this.$uuid.v4()
          }
        }
      }
    },
    title: String,
    source: {},
    defaultThing: {
      default(){
        return undefined
      }
    },
    neighbours: {
      default(){
        return []
      }
    },
    parentId: {},
    index: {},
    options: {
      type: Array,
      default(){return []}
    },
    parentOptions: {
      type: Array,
      default(){ return [] }
    },
    theme:{
      default: 'reddit',
      type: String
    },
    fieldsDraft: {
      default(){return undefined}
    },
    requiredRealms: {
      default(){ return [ {realm: 'all'} ] }
    },
    limit: {
      type: Number,
      default: 50
    },
    loadLimit: {
      type: Number,
      default: 5
    },
    savesTo: {
      default: undefined
    },
    schema: {
      
    }

  },
  computed: {
    thingComputed: {
      get(){
        return this.thing || {
          description: '',
          parents: [this.parentId],
          names: ['new']
        }
      }
    },
    fieldsComputed: {
      get(){
        return this.fieldsDraft || {
          title: null,
          description: this.getsmart(this, 'thingMutable.description', ''),
          owners: [this.$store.state.entity._id],
          ownerAlias: this.$store.state.entity.username,
          realms: null,
          names: null,
          url: null,
          parents: this.getsmart(this, 'thingMutable.parents', [])
          // prices: [],
          // things: null,
        }
      }
    },
    value: {
      get(){
        // var type = this.gosmart(this, 'thingMutable.type', undefined)
        var ret = undefined
        if(this.type && typeof this.type == 'string'){
          if(this.type.indexOf('String') == 0){
            ret = this.thingMutable['String']
          } else if(this.type.indexOf('Thing') == 0){
            ret = this.thingMutable[this.type]
          } else if(this.type.indexOf('Array') == 0){
            ret = this.thingMutable[this.type]
          } else if(this.type.indexOf('Number') == 0){
            ret = this.thingMutable['Number']
          } else if(this.type.indexOf('Boolean') == 0){
            ret = this.thingMutable['Boolean']
          }
        }
        return ret
      },
      set(value){
        // var type = this.gosmart(this, 'thingMutable.type', undefined)
        if(typeof value == 'string' && typeof this.type == 'string'){
          if(this.type.indexOf('String') == 0){
            this.$set(this.thingMutable, 'String', value)
          } else if(this.type.indexOf('Thing') == 0){
            this.$set(this.thingMutable, this.type, value)
          } else if(this.type.indexOf('Array') == 0){
            this.$set(this.thingMutable, this.type, value)
          } else if(this.type.indexOf('Number') == 0){
            let parsed = parseInt(value)
            this.$set(this.thingMutable, 'Number', parsed)
          } else if(this.type.indexOf('Boolean') == 0){
            this.$set(this.thingMutable, 'Boolean', value)
          }
        }
      }
    },
    valueString: {
      get(){
        var valueString = 'undefined'
        // var type = this.gosmart(this, 'thingMutable.type', undefined)
        var value = this.value
        if(this.type && typeof this.type == 'string'){
          if(this.type.indexOf('String') == 0){
            valueString = this.getsmart(this, 'thingMutable.String', 'undefined')
          } else if(this.type.indexOf('Thing') == 0){
            valueString = this.getsmart(this, 'thingMutable.'+this.type, 'undefined').toString()
          } else if(this.type.indexOf('Array') == 0){
            valueString = this.getsmart(this, 'thingMutable.'+this.type, 'undefined').toString()
          } else if(this.type.indexOf('Number') == 0){
            valueString = this.getsmart(this, 'thingMutable.Number', 'undefined').toString()
          } else if(this.type.indexOf('Boolean') == 0){
            valueString = this.getsmart(this, 'thingMutable.Boolean', 'undefined').toString()
          }
        }
        return valueString
      }
    },
    valueShortRender: {
      get(){
        var valueShortRender = 'undefined'
        // var type = this.gosmart(this, 'thingMutable.type', undefined)
        var value = this.value
        if(this.type && typeof this.type == 'string'){
          if(this.type.indexOf('String') == 0){
            // valueShortRender = this.osxTrunc(this.thingMutable.text) || 'undefined'
            valueShortRender = this.trunc(this.thingMutable.String) || 'undefined'
          } else if(this.type.indexOf('Thing') == 0){
            valueShortRender = '{'+ ( this.getsmart(this, 'thingMutable.'+this.type+'.title', false) || 'thing' ) + '}'
          } else if(this.type.indexOf('Array') == 0){
            valueShortRender = '[ '+this.getsmart(this, 'thingMutable.'+this.type+'.length', 0)+' ]'
          } else if(this.type.indexOf('Number') == 0){
            valueShortRender = this.getsmart(this, 'thingMutable.Number', 'undefined').toString()
          } else if(this.type.indexOf('Boolean') == 0){
            valueShortRender = this.getsmart(this, 'thingMutable.Boolean', 'undefined').toString()
          }
        }
        return valueShortRender
      }
    },
    type: {
      get(){
        return this.thingMutable.type
      },
      set(type){
        this.$set(this.thingMutable, 'type', type)
      }
    },
    typeString: {
      get(){
        var string = this.type
        // var type = this.gosmart(this, 'thingMutable.type', undefined)
          // if(this.type && typeof this.type !== 'string'){
          //   if(this.type.constructor == Array || this.type == Array){
          //     string = 'Array'
          //     if(this.type[0] == Array){
          //       string = 'Array of Arrays'
          //     } else if(this.type[0] == Boolean){
          //       string = 'Array of Booleans'
          //     } else if(this.type[0] == Object){
          //       string = 'Array of Things'
          //     } else if(this.type[0] == Number){
          //       string = 'Array of Numbers'
          //     } else if(this.type[0] == String){
          //       string = 'Array of Strings'
          //     }
          //   } else if(this.type == Boolean){
          //     string = "Boolean"
          //   } else if(this.type.constructor == Object || this.type == Object){
          //     string = 'Thing'
          //     if(this.type["Array"]){
          //       string = 'Thing of Arrays'
          //     } else if(this.type["Boolean"]){
          //       string = 'Thing of Booleans'
          //     } else if(this.type["Object"]){
          //       string = 'Thing of Things'
          //     } else if(this.type["Number"]){
          //       string = 'Thing of Numbers'
          //     } else if(this.type["String"]){
          //       string = 'Thing of Strings'
          //     }
          //   } else if(this.type == Number){
          //     string = 'Number'
          //   } else if(this.type == String){
          //     string = 'String'
          //   }
          // } else if (typeof this.type == 'string'){
          //   string = this.type
          // }
        return string
      }
    },
    childType: {
      get(){
        var childType = undefined
        if(typeof this.type == 'string'){
          if(this.optIn(0, [this.type.indexOf('Thing'), this.type.indexOf('Array')])){
            if(this.type.length > 'Array'.length || this.type.length > 'Thing'.length){
              childType = this.type.split(" ")
              childType = childType[childType.length-1].replace(/s$/gi,'')
            }
          } 
        } else {
          childType = undefined
        }
        return childType
      }
    },
    thingDescriptionInputOptions: {
      get(){
        return {
          toolbar: {
            //  buttons: ['bold', 'strikethrough', 'h1']
          },
          placeholder: {
            text: 'Start typing to add a description',
            hideOnClick: false
          },
          targetBlank: true
        }
      }
    },
    thingValueInputOptions: {
      get(){
        var ret = {
          toolbar: {
            //  buttons: ['bold', 'strikethrough', 'h1']
          },
          placeholder: {
            text: 'Start typing to express your self',
            hideOnClick: false
          },
          targetBlank: true
        }
        if(typeof this.getsmart(this.thingMutable, 'type', undefined) == 'string' && this.getsmart(this.thingMutable, 'type', '').indexOf("Boolean") == 0){
          ret.placeholder.text = 'Enter either true or false, 0 or 1, yes or no'
        } else if(typeof this.getsmart(this.thingMutable, 'type', undefined) == 'string' && this.getsmart(this.thingMutable, 'type', '').indexOf("Number") == 0){
          ret.placeholder.text = 'Enter any number you want, "500 million" works, so does "negative 900", as does "four times eight"'
        } else if(typeof this.getsmart(this.thingMutable, 'type', undefined) == 'string' && this.getsmart(this.thingMutable, 'type', '').indexOf("String") == 0){
          ret.placeholder.text = 'Start typing to enter the text value'
        } 
        return ret
      }
    },
    thingTitleInputOptions: {
      get(){
        return {
          toolbar: {
            //  buttons: ['bold', 'strikethrough', 'h1']
          },
          placeholder: {
            text: 'Start typing to add a title',
            hideOnClick: false
          },
          targetBlank: true
        }
      }
    },
    editable: {
      get(){
        var filtered = this.getsmart(this, 'thingMutable.owners', []).filter(function(owner){
          owner !== undefined || owner !== null || owner !== ''
        })
        if(filtered.length == 0 || this.optIn(this.getsmart(this, 'entity._id', undefined), filtered)){
          return true
        } else {
          return false
        }
      }
    },
  },
  components: {
    // 'show inventory' : inventory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import 'src/styles/vars'
.thing
  width: 100%
  max-width: 100%
  min-height: 1px
  height: auto
  margin-bottom: 4px
  display: flex
  align-items: center
  justify-content: flex-start
  flex-direction: column
  z-index: 100
  overflow: visible
  position: relative
  box-sizing: border-box
  >.main-container
    position: relative
    width: 100%
    max-width: 100%
    overflow-y: auto
    height: auto
    box-sizing: border-box
    overflow: visible
    >.main-positioner
      position: relative
      height: auto
      width: 100%
      max-width: 100%
      display: flex
      align-items: flex-start
      justify-content: flex-start
      flex-direction: column
      flex-wrap: wrap
      box-sizing: border-box
      >.option-container
        width: 100%
        box-sizing: border-box
        // display: table-row
        position: relative
        display: flex
        overflow: hidden
        // align-items: flex-start
        // justify-content: flex-start
        // flex-direction: column
        +animate(all, 250ms, ease)
        order: 3
        .btn
          margin-left: 4px
        >.option-positioner
          width: 100%
          display: flex
          align-items: center
          justify-content: flex-start
          flex-direction: column
          flex-wrap: wrap
          width: 100%
          box-sizing: border-box
          padding-top: 15px
          padding-bottom: 15px
          +animate(all, 250ms, ease)
          background: $grey
          box-shadow: 0px 0px 7px -1px rgba(lighten(black, 50), .25)
          position: relative
          >.option
            display: flex
            align-items: center
            justify-content: center
            flex-direction: row
            box-sizing: border-box
            text-align: center
            +animate(all, 250ms, ease)
            .action
              margin-right: 4px
              display: flex
              align-items: center
              justify-content: center
              white-space: nowrap
              margin-left: 4px
              // color: inherit
              &.label
                margin-right: 0px
              &:first-child
                margin-left: 0px
              &:last-child
                margin-right: 0px
            .label-group
              display: flex
              align-items: flex-start
              justify-content: flex-start
              flex-direction: row

              // color: inherit

            .thing-list-container
              width: 100%
              display: flex
              align-items: center
              justify-content: flex-start
              flex-direction: column
              box-sizing: border-box
              .thing-list
                width: 100%
                max-width: 100%
                display: flex
                align-items: flex-start
                justify-content: flex-start
                flex-direction: column
                box-sizing: border-box
                >.value.medium-editor-element
                  text-align: center
                .meta-thing
                  >.meta-thing-square
                    background: darken(rgba($grey, 1), 3)
                    width: 100%
                    height: 100%
                    display: flex
                    align-items: center
                    justify-content: center
                    +animate(all, 250ms, ease)
                    border-radius: 19px
                    &:hover
                      background: darken(rgba($grey, 1), 5)
                  &.add-new
                    order: 9999
                    // margin-bottom: 4px
                    &.put-addable-first
                      order: 1
                      margin-bottom: 4px
                    &.put-addable-last
                      order: 9999
                  &.rounded
                    border-radius: 20px
                    border-bottom-left-radius: 5px
                  &.wide
                    margin-left: 0px
                    margin-right: 0px
                    width: 100%
                >.slot-container
                  align-self: flex-start
                  display: block
                  box-sizing: border-box
                  position: relative
                  width: 100%
                  // width: 80px
                  // height: 80px
                  box-sizing: border-box
                  >.slot-positioner
                    width: 100%
                    height: 100%
                    display: flex
                    align-items: center
                    justify-content: center
                    box-sizing: border-box
                    >.meta-thing
                      order: 2
                      margin-bottom: 0px
                      border-radius: 19px
                      padding: 6px
                      background-color: $grey
                      font-size: $littleFont
                      line-height: .6rem
                      word-wrap: break-all
                      display: flex
                      align-items: center
                      justify-content: center
                      +animate(all, 250ms, ease)
                      box-sizing: border-box
                      &:hover
                        background-color: darken($grey, 5)
                        // font-size: .28rem
                      >.meta-thing-square
                        box-sizing: border-box
                        max-width: 100%
                        padding: 4px
                        display: flex
                        align-items: center
                        justify-content: center
                      >.add-thing
                        font-size: 1.2rem
                      &.load-next
                        justify-content: flex-start
                        // height: auto
                        // padding: 4px
                        // margin-top: 0px
                        font-size: $niceFont
                        border-radius: 15px
                        border-bottom-left-radius: 3px
                        .name
                          line-height: $niceFont
                        &.wide
                          width: auto
                  &.add-new
                    order: 9999
                    // margin-bottom: 4px
                    &.put-addable-first
                      order: 1
                      margin-bottom: 4px
                    &.put-addable-last
                      order: 9999
                  &.rounded
                    border-radius: 20px
                    border-bottom-left-radius: 5px
                  &.wide
                    margin-left: 0px
                    margin-right: 0px
                    width: 100%
                  &.property-slot-container
                    >.slot-positioner
                      >.meta-thing
                        padding: 6px
                        border-radius: 19px
                  &.inventory-slot-container
                    margin: 4px
                    >.slot-positioner
                      >.meta-thing
                        background: darken($grey, 3)
                &.show-slots
                  >.slot-container
                    box-sizing: border-box
                    >.slot-positioner
                      background: darken($grey, 3)
                      box-shadow: 3px 3px 6px -2px rgba(darken($grey, 12), 1) inset
                      border-radius: 2px
                      +animate(all, 100ms, ease)
                      >.slot
                      >.meta-thing
                        box-shadow: 3px 3px 6px -2px rgba(darken($grey, 12), 1) inset
                        // background: rgba($grey, 0)
                        &:hover
                          background: darken(rgba($grey, 1), 5)
                      &:hover
                        background: darken(rgba($grey, 1), 5)
            >.option-container
              width: 100%
              box-sizing: border-box
              display: flex
              align-items: flex-start
              justify-content: flex-start
              flex-direction: column
              >.option-positioner
                display: flex
                align-items: flex-start
                justify-content: flex-start
                flex-direction: row
                flex-wrap: wrap
                width: 100%
                box-sizing: border-box
            
            .option-messages
              .message
                width: 100%
                display: flex
                align-items: flex-start
                justify-content: flex-start
                flex-direction: column
                .contents
                  @extend .message
                  flex-direction: row
                  background: $grey
                  border-top-right-radius: 7px
                  border-bottom-right-radius: 7px
                  .from
                    // margin-right: 4px
                    border-radius: 7px
                    border-bottom-left-radius: 3px
                    background: $green
                    color: $white
                    padding: 3px 6px
                  .text
                    @extend .from      
                    +animate(all, 250ms, ease)
                    background: $grey
                    color: $green
                .action
                  // display: block
                  margin-top: 3px
                  margin-bottom: 3px
                  text-transform: uppercase
                  font-weight: 900
                  font-size: .7rem
            &.realms
              input
                width: auto
                outline: none
                background: rgba($white, 0)
                border: none
                border-bottom: 1px solid rgba($friendly, .1)
                margin-left: 4px
                font-size: .87rem
                text-align: center

            &.postas
              .btn
                opacity: .6
                margin-left: 4px
                &.selected
                  opacity: 1
                &.meta-selected
                  opacity: 1
              select
                margin-left: 4px
                background: rgba(black, 0)
                outline: none
                border: none
                border-radius: 0px
                bottom: 0
                align-self: flex-end
                font-size: .87rem
                font-family: 'Avenir', Helvetica, Arial, sans-serif
                color: $friendly
            &.submit
              // margin-left: auto
            &.question
              .tf
                text-transform: uppercase
                font-weight: 900
                font-size: .7rem
                &:first-child
                  margin-right: 4px
            &.commerce
              // margin-left: auto
            &.url
              // margin-left: auto
              .fa-icon
                // margin-left: 4px
            &.contract
              display: flex
              justify-content: flex-start
              align-items: flex-start
              .contract-list
                display: flex
                align-items: flex-start
                justify-content: flex-start
                flex-direction: column
                max-width: 100%
                .price
                  max-width: 100%
                  display: flex
                  align-items: center
                  justify-content: flex-start
                  flex-direction: row
                  margin-bottom: 4px
                  .denominator
                    margin-left: 4px
                  .signifier
                    margin-left: 4px
                    margin-right: 4px
              .label-group
                .label
                  margin-right: 0px
                  +animate(all, 250ms, ease)
                  // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
                  &.price-add
                    background: $grey
                    display: flex
                    align-items: center
                    justify-content: center
                    // color: rgba($white, 0)
                    font-weight: 900
                    padding: 1px 12px
                    margin-left: 0px
                    color: $green
                    font-size: 1.2rem
                    border-bottom-right-radius: 9px
                    border-top-right-radius: 9px
                    border-bottom-left-radius: 0px
                    border-top-left-radius: 0px
                    .fa-icon
                      // position: absolute
                      color: $green
                &:hover
                  .label
                    // background: $grey
                    // color: $green
                    &.price-add
                      // box-shadow: 0px 0px 40px -5px darken($green, 20) inset
                      // background: $green
                      // color: $grey
            &.pill
              // border-top-left-radius: 5px
              // border-bottom-left-radius: 5px
              // padding-right: 2px
              margin-bottom: 4px
              // padding-left: 0px
              max-width: 100%
              display: flex
              align-items: flex-start
              justify-content: flex-start
              flex-direction: column
              .action
                // color: inherit
                margin-right: 7px
              .label
                // margin-left: 2px
                background: $green
                color: $white
                padding: 4px 10px
                border-radius: 7px
                text-transform: capitalize
                margin-right: 7px
                margin-bottom: 4px
            &.comments
              justify-content: flex-start
              width: 100%
              max-width: 100%
            &.value
              width: 100%
              .option-container
                &.value-container
                  &.input-value
                    // padding-left: 15px
                    // padding-right: 15px
                    width: 100%
                  .option-positioner
                    .value-input
            &.feedback-list-container
              .feedback-list-positioner
                // width: 100%
                // height: auto
                .feedback-list
                  .message
                    width: 100%
                    display: flex
                    align-items: flex-start
                    justify-content: flex-start
                    flex-direction: column
                    .contents
                      @extend .message
                      flex-direction: row
                      background: $grey
                      border-top-right-radius: 7px
                      border-bottom-right-radius: 7px
                      .from
                        // margin-right: 4px
                        border-radius: 7px
                        border-bottom-left-radius: 3px
                        background: $green
                        color: $white
                        padding: 3px 6px
                      .text
                        @extend .from      
                        +animate(all, 250ms, ease)
                        background: $grey
                        color: $green
                    .action
                      // display: block
                      margin-top: 3px
                      margin-bottom: 3px
                      text-transform: uppercase
                      font-weight: 900
                      font-size: .7rem
        &.title-container
          width: 100%
          box-sizing: border-box
          >.title-positioner
            border-bottom-left-radius: 0px
            width: 100%
            max-width: 100%
            height: auto
            min-height: 100%
            max-height: 100%
            color: $friendly
            background: $grey
            padding: 0px 15px
            // // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
            box-sizing: border-box
            display: flex
            align-items: center
            justify-content: flex-start
            position: relative
            border-radius: 19px
            +animate(all, 250ms, ease)
            >.option
              text-align: left
              white-space: normal
              word-wrap: break-word
              width: auto
              line-break: normal
              justify-content: flex-start
              // padding: 0px 12px
              width: 100%
            textarea
              font-size: .88rem !important
              color: $friendly
              background: rgba(black, 0)
              border: none
              outline: none
              // height: auto !important
              width: 100% !important
          &.cap
            .title-positioner
              border-bottom-right-radius: 0px
        &.name-container
          height: auto
          // display: flex
          // align-items: flex-start
          // justify-content: center
          position: relative
          clear: both
          >.name-positioner
            height: auto
            >.option
              hyphens: auto
              justify-content: flex-start
              padding: 0px 12px
        &.description-container
          display: flex
          align-items: flex-start
          justify-content: flex-start
          width: 100%
          box-sizing: border-box
          >.description-positioner
            border-radius: 0px
            padding: 0px 15px 0px 15px
            width: 100%
            max-width: 100%
            height: auto
            min-height: 100%
            max-height: 100%
            color: $friendly
            background: $grey
            padding: 0px 15px
            // // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
            box-sizing: border-box
            display: flex
            align-items: center
            justify-content: flex-start
            position: relative
            border-radius: 19px
            +animate(all, 250ms, ease)
            >.option
              text-align: left
              white-space: normal
              word-wrap: break-word
              width: auto
              width: 100%
              justify-content: flex-start
              align-items: flex-start
              flex-flow: column
          &.round
            >.description-positioner
              border-radius: 19px
              border-bottom-left-radius: 5px
              overflow: hidden
          &.cap
            >.description-positioner
              border-bottom-left-radius: 0px
              border-bottom-right-radius: 0px

        
        &.status-container
          display: flex
          width: 100%
          height: 100%
          align-items: center
          justify-content: center
          >.option-positioner
            padding: 15px 5px
        &.indented-container
          width: 100%
          margin-left: auto
          margin-right: 0px
          // border-left: 1px solid rgba($green, .6)
          // border-bottom: 1px solid rgba($green, .6)
          // border-bottom-left-radius: 3px
          // display: flex
          // align-items: center
          // justify-content: flex-start
          >.option-positioner
            background: $grey
            padding: 0px 15px
            box-sizing: border-box
            >.option-container
              >.option-title-container
                width: 100%
                height: auto
                padding: 0px 15px
                background: $grey
                // border-radius: 19px
                // border-bottom-left-radius: 5px
                // border-bottom-left-radius: 5px
                position: relative
                display: flex
                box-sizing: border-box
                >.option-title-positioner
                  position: relative
                  height: 100%
                  display: flex
                  align-items: center
                  justify-content: center
                  >.option-title

        &.location-container
          width: 100%
          >.option-positioner
            padding: 0px
            width: 100%
            height: auto
            display: flex
            align-items: center
            justify-content: center
            flex-direction: column
            >.option
              width: 100%
              display: flex
              align-items: center
              justify-content: flex-start
              flex-direction: column
              height: auto
              >.map-container
                width: 100%
                display: flex
                align-items: center
                justify-content: center
                flex-direction: column
                position: relative
                >.map-positioner
                  width: 100%
                  display: flex
                  align-items: center
                  justify-content: center
                  position: relative
                  flex-direction: column
                  >.overlay-container
                    position: absolute
                    // left: 0
                    top: 50%
                    transform: translateY(-50%)
                    .overlay-positioner
                      .custom-pin-container
                        .custom-pin-positioner
                          .pin-svg
                            width: 40px
                            margin-top: -20px
              >.btn-container
                width: 100%
                .btn-positioner
                  width: 100%
                  // padding: 4px
                  box-sizing: border-box
                  .wide-btn
                    display: flex
                    align-items: center
                    justify-content: center
                    width: 100%
                    padding-top: 10px
                    padding-bottom: 10px
                    background: $green
                    // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
                    +animate(all, 250ms, ease)
                    .wide-btn-content
                      width: auto
                      color: $white
                    &:hover
                      background: darken($green, 4)

        &.inventory-container
          >.option-positioner
            padding: 5px 0px
            >.inventory
              display: flex
              flex-direction: column
              align-items: flex-start
              justify-content: center
              width: 100%
              >.option-title-container
                padding-left: 11px
              >.inventory-list-container
                width: 100%
                position: relative
                display: flex
                justify-content: center
                align-items: flex-start
                padding: 1px 0px 1px 0px
                // text-align: center
                box-sizing: border-box
                >.inventory-list
                  display: flex
                  flex-flow: row wrap
                  justify-content: flex-start
                  align-items: flex-start
                  width: 100%
                  box-sizing: border-box
                  position: relative
                  flex-basis: 1
                  >.slot-container
                    align-self: flex-start
                    display: block
                    box-sizing: border-box
                    position: relative
                    width: 100%
                    margin: 4px
                    >.slot-positioner
                      width: 100%
                      height: 100%
                      box-sizing: border-box
                      >.slot

                  &.show-slots
                    >.slot-container
                      box-sizing: border-box
                      margin: 0
                      >.slot-positioner
                        background: darken($grey, 3)
                        box-shadow: 3px 3px 6px -2px rgba(darken($grey, 12), 1) inset
                        border-radius: 2px
                        +animate(all, 100ms, ease)
                        >.slot
                        >.meta-thing
                          box-shadow: 3px 3px 6px -2px rgba(darken($grey, 12), 1) inset
                          // background: rgba($grey, 0)
                          &:hover
                            background: darken(rgba($grey, 1), 5)
                          &.shrink-slot-icon
                            box-shadow: 0px 0px 0px 0px rgba(darken($grey, 0), 0) inset
                        &:hover
                          background: darken(rgba($grey, 1), 5)
        &.properties-container
          >.option-positioner
            // padding-top: 15px
            padding-bottom: 15px
            // background: rgba($green, .125)
            // background: lighten(rgba($green, .7), 2)
            background: lighten(rgba($friendly, 1), 0)
            // border: 1px solid rgba($green, .45)
            // background: lighten(rgba($green, 1), 0)
            width: 100%
            >.option
              width: 100%
              flex-direction: column   
              >.option-title-container
                width: 100%
                >.option-title-positioner             
                  width: 100%
                  justify-content: flex-start
                  align-items: center
                  display: flex
                  >.option-title
                    // color: $white
              >.properties-list-container
        &.comments-container
          margin-bottom: 0px
          padding-left: 4px
          // padding-left: 4px
          width: 100%
          max-width: 100%
          box-sizing: border-box
          .options-positioner
            .comments
              margin-top: 0px
              .comments-container
            .inventory-option-container
              padding-left: 4px
              border-left: 1px solid rgba($green, .137)
              border-bottom: 1px solid rgba($green, .137)


        &.value-container
          // background: $grey
          +animate(all, 250ms, ease)
          >.option-positioner
            padding-top: 15px
            padding-bottom: 15px
            // background: rgba($green, .125)
            background: rgba($grey, 1)
            border: 1px solid rgba($green, .45)
            // background: lighten(rgba($green, 1), 0)
            width: 100%
            >.option
              width: 100%
              flex-direction: column   
              .value-list-container
                width: 100%
              .option-title-container
                width: 100%
                .option-title-positioner             
                  width: 100%
                  justify-content: flex-start
                  align-items: center
                  display: flex
                  .option-title
                    // color: $white



        &.icons-container
          width: 100%
          display: flex
          align-items: flex-start
          justify-content: flex-end
          flex-wrap: wrap
          +animate(all, 250ms, ease)
          >.option-positioner
            width: 100%
            display: flex
            align-items: center
            justify-content: flex-end
            flex-flow: row wrap
            padding-bottom: 0px
            border-radius: 0px 0px 19px 19px
            box-sizing: border-box
            >.option
              $square: 8px
              padding: $square 15px
              +animate(all, 250ms, ease)
              &:last-child
                padding-left: 11px
                padding-right: $square + 3px
              &:hover
                svg
                  transform: translateY(-4px)
      >b
        order: 3
        display: none !important
      >b:first-of-type+.option-container
        // overflow: visible
        >.option-positioner
          border-radius: 19px 19px 0px 0px
      >b:last-of-type+.option-container
        >.option-positioner
          border-radius: 0px 0px 19px 5px
        &.icons-container
          >.option-positioner
            border-bottom-left-radius: 19px
            border-bottom-right-radius: 19px
        &:first-of-type+.option-container
          >.option-positioner
            border-radius: 19px 19px 19px 5px
      >b:not(:last-of-type)
        &:not(:first-of-type)
          &+.option-container
            >.option-positioner
              border-radius: 0px
      >b:only-of-type+.option-container
        >.option-positioner
          border-radius: 19px 19px 19px 5px
        
  &:hover
    >.main-container
      >.main-positioner        
        >.option-container
          >.option-positioner
          &.icons-container
            display: flex !important
        >b:last-of-type
          &:not(b:first-of-type)
            &+.option-container
              &:not(.icons-container)
                >.option-positioner
                  border-bottom-right-radius: 0px
                  border-bottom-left-radius: 0px
        
    &:not(.inventory-mode)
      &:not(.show-options)
        &:not(.icon)
          >.main-container
            >.main-positioner        
              >b:last-of-type
                &+.option-container
                  &:not(.icons-container)
                    >.option-positioner
                      border-bottom-right-radius: 0px
                      border-bottom-left-radius: 0px
    &.icon
      >.main-container
        >.main-positioner        
          >.option-container
            >.option-positioner
            &.icons-container
              display: none !important
    &.no-options
      >.main-container
        >.main-positioner        
          >.option-container
            >.option-positioner
            &.icons-container
              display: none !important
  &.inventory-slot
    .main-container
      
  &.icon
    width: 80px
    height: 80px
    // border-radius: 1px
    // margin: 2px 4px
    font-size: .7rem
    // line-height: .6rem
    word-wrap: break-all
    display: flex
    align-items: center
    justify-content: center
    // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
    +animate(all, 250ms, ease)
    position: relative
    box-sizing: border-box
    >.main-container
      width: 100%
      height: 100%
      margin: 0
      display: flex
      align-items: flex-start
      justify-content: center
      border-radius: 5px
      overflow: hidden
      >.main-positioner
        height: 100%
        >.option-container
          >.option-positioner
            padding-top: 0px
            padding-bottom: 0px
            height: 100%
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            // background: rgba($grey, 0)
          &.title-container
            height: 100%
            >.title-positioner
              padding: 0px 12px
          &.name-container
            height: auto
            max-height: 100%
            width: 100%
            max-width: 100%
            overflow: hidden
            .name-positioner
              height: auto
              max-height: 100%
              width: 100%
              max-width: 100%
              overflow: hidden
              align-self: center
              display: flex
              justify-content: center
              align-items: flex-start
              padding: 4px
              box-sizing: border-box
              color: $green
              position: relative
              .name
                width: auto
                height: 100%
                max-height: 100%
                max-width: 100%
                overflow: hidden
                // display: flex
                // justify-content: center
                // align-items: center
                white-space: normal
                word-wrap: break-word
                border: none
                box-sizing: border-box
                hyphens: auto
                >:first-child
                  // margin-top: 15%
          &.description-container
            .description-positioner
              align-items: center
              justify-content: center
              padding: 4px
      &:hover
        // background-color: darken($grey, 4)

    &.in-slot
      width: 100%
      height: 100%
      >.main-container
        background: darken($grey, 3)
        >.main-positioner
      &.shrink-slot-icon
        padding: 10px
    &:hover
      >.main-container
        >.main-positioner
          >.option-container
            >.option-positioner
              background: darken(rgba($grey, 1), 3)              

  &.shrink-slot-icon
    padding: 10px
  &.inventory-item
    // margin-top: 4px
  &.inventory-mode
    margin-bottom: 10px
    >.main-container
      background: rgba($white, 0)
      >.main-positioner
        >.option-container
          >.option-positioner
          &.title-container
            width: 100%
            text-align: center
            order: 2
            font-size: $largeFont
            // weird design
              // .name-positioner
              //   padding: 5px 50px 5px 50px
              //   width: 
              //   border-radius: 45px 45px 2px 2px / 40px 40px 5px 5px
              //   background: rgba($green, 1)
              //   .name
              //     color: $white
              //     font-size: $largeFont
            >.option-positioner
              padding: 0px 0px 5px 0px
              background: rgba($grey, 0)
              >.option
                justify-content: center

          &.name-container
            width: 100%
            text-align: center
            order: 2
            font-size: $largeFont
            >.name-positioner
              padding: 0px 0px 5px 0px
              background: rgba($grey, 0)
              >.option
                justify-content: center
                
          &.description-container
            order: 2
            >.option-positioner
              flex-direction: column
              background: rgba($grey, 0)
              padding-bottom: 15px
              >.option
                text-align: center
                width: 100%
                justify-content: center
                margin: 4px
                z-index: 50
                position: relative
                top: 0
                left: 0
                font-size: $littleFont
                opacity: .5
                
          &.inventory-container
            order: 2
            >.option-positioner
              .inventory
                border: none
                padding: 0
            &.vis
              &:first-child
                .option-positioner
                  border-radius: 5px 5px 0px 0px
                &:last-child
                  .option-positioner
                    border-radius: 5px 5px 19px 19px
        >b:nth-of-type(3)
          &+.option-container
            >.option-positioner
              border-top-left-radius: 19px
              border-top-right-radius: 19px
          &:not(b:last-of-type)
            &+.option-container
              >.option-positioner
                border-radius: 19px 19px 19px 19px
    &.icon
      >.main-container
        >.main-positioner
          >.option-container
            .name-container
              font-size: .7rem
              margin-bottom: 0px
    &.a-lopu-map
      >.main-container
        >.main-positioner
          >.option-container
            >.option-positioner
            
            &.location-container
              order: 2
            &.inventory-container
              order: 3
  &.feed
    width: 100%
    box-sizing: border-box
    // margin-left: 10%
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
            >.option
              &.inventory
                border: none
                padding: 0px
    &.comments
      margin-left: 0
  &.editing
    z-index: 105
    >.main-container
      display: flex
      position: relative
      align-items: flex-start
      justify-content: center
      width: 100%
      max-width: 100%
      // border: 1px solid rgba($green, .2)
      // background: $grey
      >.main-positioner
        >.option-container
          >.option-positioner
            background: $grey
            >.option
              &.url
                .action
                  // margin-left: 10px
                  // margin-right: 10px
                  &:first-child
                    // margin-right: 30px
                  .icon-wrapper
                    width: 100%
                .fa-icon
                  // height: 1.4rem
                  // width: auto
                  // /* You would have to include the following two lines to make this work in Safari */
                  // max-width: 100%
                  // max-height: 100%
                .link
                  position: relative
                  .input-popup-positioner
                    display: none
                    align-items: center
                    justify-content: center
                    position: absolute
                    top: -145%
                    right: 0
                    width: 100%
                    overflow: visible
                    .input-popup
                      z-index: 10
                      .input-wrapper

                      input,
                      .input
                        // border: none
                        border: 1px solid $greenhover
                        padding: 5px 10px
                        min-width: 150px
                        font-size: .8rem
                        background: $white
                        width: auto
                        text-align: center
                        outline: none
                        display: flex
                        align-items: center
                        justify-content: center
                        // cursor: text
                        &[contenteditable=true]:empty:before
                          content: attr(placeholder)
                          display: block
                    .input-diamond-positioner
                      width: 100%
                      display: flex
                      align-items: center
                      justify-content: center
                      position: absolute
                      bottom: 0px
                      height: 1px
                      overflow: visible
                      z-index: 5
                      .input-diamond
                        // bottom: 50%
                        height: 8px
                        width: 8px
                        transform: rotate(45deg)
                        background: $friendly
                  &:hover
                    .input-popup-positioner
                      display: flex
              &.inventory
                // display: inline-block
                align-items: flex-start
                justify-content: flex-start
                position: relative
                // flex-grow: 1
                .label
                  display: inline-block

              &.thingType,
              &.thingNames
                align-items: flex-start
                justify-content: flex-start
              &.thingNames
              &.contract
                .label-group
                  .label
                    border-bottom-right-radius: 0px
                    border-top-right-radius: 0px                    
              &.value
                width: 100%
                border: 1px 0px 1px 0px solid rgba($green, .17)
                // background: rgba($green, .125)
                // border: 1px solid rgba($green, .17)
                // border-top: 0px
                .option-container
                  &.value-container
                    &.input-value
                      // padding-left: 15px
                      // padding-right: 15px
                    .option-positioner
                      .value-input
          &.description-container
            .description-positioner
              color: $white
              background: $green
              border: none
              width: 100%
              max-width: 100%
              height: auto
              max-height: 100%
              margin-bottom: 0px

          &.icons-container
            .option-positioner
              background: $green
              .option
                svg
                  color: $friendly

          &.indented-container
            >.option-positioner
              // background: rgba($green, .125)
          &.inventory-container
            .option-positioner
              background: rgba($green, 1)          

          
          &.upload-container
            max-width: 20%
            width: 100%
            height: 100%
            padding: 20px 10px
            box-sizing: border-box
            display: flex
            align-items: center
            justify-content: flex-start
            flex-direction: column
            .img-inputer
              width: 100%
              height: 60px
                outline: none
        
    &.icon
      // background: rgba($white, 0)
      >.main-container
        // background: $green
        >.main-positioner
          >.option-container
            >.option-positioner
            &.name-container
              color: $white
            &.description-container
              .description-positioner

                color: $white
        &:hover
          // background: darken($green,4)        
    &.inventory-mode
      >.main-container
        >.main-positioner
          >.option-container
            &.description-container
              >.description-positioner
                color: $friendly
                background: rgba($green, 0)


  &.shallow
    >.main-container
      border-radius: 14px
      border-top-left-radius: 5px
      >.main-positioner
        >.option-container
          >.option-positioner
          &.description-container
            .description-positioner
              padding: 4px 10px
              
  &.debate
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
          &.description-container
            .description-positioner
              .description
                text-align: center
              .medium-editor-element
                text-align: center
                
  &.property
    >.main-container
      background: rgba($grey, 0)
      >.main-positioner
        >.option-container
          >.option-positioner
            >.value-render-container
              padding: 4px
              padding-top: 0px
              padding-right: 0px
              height: 100%
              min-height: 100%
              overflow: auto
              width: auto
              max-width: 160px
              position: absolute
              top: 0
              right: 0
              box-sizing: border-box
              display: flex
              .value-render-positioner
                border-radius: 15px
                border-top-left-radius: 15px
                // border-bottom-left-radius: 0px
                overflow: hidden
                height: 100%
                display: flex
                align-items: center
                justify-content: center
                background: rgba($grey, 0)
                // border: 1px solid rgba($green, .3)
                box-sizing: border-box
                padding: 4px 14px 5px 15px
                flex-wrap: wrap
                position: relative
                .value-render
                  // color: $white
                  color: $friendly
                  font-size: $littleFont
                  font-weight: 900
                  max-height: 100%
                  width: 100%
                  max-width: 100%
                  // text-overflow: ellipsis
                  // overflow-wrap: wrap
                  // word-break: break-all
                  hyphens: auto
                  white-space: pre-wrap
                  // overflow: hidden
                  // text-transform: capitalize
                  
          &.title-container
            >.title-positioner
              background: rgba($grey, 1)
              >.title
              >.type-container
                width: auto
                position: absolute
                top: 10px
                left: 0
                padding-left: 16px
                >.type-positioner
                  >.type
                    font-size: $tinyFont
                    text-transform: capitalize
                    color: rgba($green, 1)
          &.description-container
            // >.option-positioner
            //   flex-direction: column
            //   align-items: flex-start
            //   justify-content: flex-start
            //   padding: 4px
            //   >.option
            //     background: $grey
            //     width: auto
            //     padding: 10px 20px
            //     border-radius: 18px
            //     border-bottom-left-radius: 5px
                

          &.icons-container
            border-radius: 0px
    &.editing
      >.main-container
        background: rgba($grey, 0)
        >.main-positioner
          >.option-container
            >.option-positioner
              >.value-render-container
                .value-render-positioner
                  // background: $white
                  .value-render
                    color: $friendly
            &.title-container
              >.title-positioner
                background: rgba($green, .125)
                border: 1px solid rgba($green, .17)
                border-bottom: 0px
              >.type-container
                >.type-positioner
                  >.type
                    color: rgba($friendly, 1)
            &.description-container
              // overflow: auto
              >.description-positioner
                padding: 5px

                padding-left: 10px
  &.value
    &.editing
      >.main-container
        >.main-positioner
          >.option-container
            &.title-container
              >.title-positioner
                background: rgba($green, .125)
                border: 1px solid rgba($green, .17)
                border-bottom: 0px
  &.show-options
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
          &.title-container
            .title-positioner
              transition: all 250ms, border-radius 0ms
          &.description-container
            .description-positioner
              transition: all 250ms, border-radius 0ms
          &.inventory-container
            &.vis
              &:nth-last(2)
                padding-bottom: 0px

  &.tight-list-thing
    margin-bottom: 0px
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
            transition: all 300ms ease, border-radius 0ms ease
    &.editing
      >.main-container
        >.main-positioner
          >.option-container
            &.value
              >.value-positioner
                border-radius: 0px
    &:not(:last-child)
      >.main-container
        >.main-positioner
          >.option-container
            >.option-positioner
              border-radius: 0px
            &.icons-container
              >.option-positioner
                border-radius: 0px

    &:first-child:not(:last-child)
      >.main-container
        >.main-positioner
          >.option-container

          >b:first-of-type
            &+.option-container
              >.option-positioner
                border-radius: 5px 19px 0px 0px
              &.icons-container
                border-radius: 0px
                
      &.show-options,
      &.show-value
        >.main-container
          >.main-positioner
            >.option-container
              &.title-container
                >.title-positioner
                  border-radius: 5px 19px 0px 0px
              &.description-container
                >.description-positioner
                  border-radius: 5px 19px 0px 0px
              &.icons-container
                >.option-positioner
                  border-radius: 0px

      &.editing
        >.main-container
          >.main-positioner
            >.option-container
              >.option-positioner
                >.option
                  &.value
                    >.value-container
                      >.value-positioner
                        border-radius: 0px 0px 19px 19px
              &.title-container
                .title-positioner
                  border: 19px 19px 0px 0px
              &.description-container
                .description-positioner
                  border: 19px 19px 0px 0px
                  

    &:last-child
      &:not(:first-child)
        >.main-container
          >.main-positioner
            >.option-container
              &.icons-container
                border-bottom-left-radius: 19px
                border-bottom-right-radius: 19px
            >b:first-of-type
              &+.option-container
                >.option-positioner
                  border-radius: 0px 0px 19px 19px
            >b:last-of-type
              &:not(b:first-child)
                &+.option-container
                  >.option-positioner
                    border-radius: 0px 0px 19px 19px
        &.show-options,
          >.main-container
            // background: $grey
            border-top-left-radius: 0px
            >.main-positioner
              >.option-container
                >.option-positioner
                  &:last-child
                &.title-container
                  .title-positioner
                    border-radius: 0px
                &.description-container
                  .description-positioner
                    border-radius: 0px
                &.icons-container
                  &.vis
                    &:last-child
                      .option-positioner
                        border-bottom-left-radius: 19px
                        border-bottom-right-radius: 19px
                        

          &.editing
            >.main-container
              background: rgba($grey, 0)
              >.main-positioner
                >.option-container
                  >.option-positioner
                    >.option
                      &.value
                        .value-container
                          .value-positioner
                            border-radius: 0px
                            
        &.editing
          >.main-container
            >.main-positioner
              >.option-container
                >.option-positioner
                  >.value-render-container
                    .value-render-positioner
                      border-radius: 0px 0px 0px 5px
                      .value-render
                &.value-container
                  .option-positioner
                    border-radius: 0px 0px 19px 19px
                    overflow: hidden


          &.show-options
            >.main-container
              >.main-positioner
                >.option-container
                  &.value-container
                    >.option-positioner
                      border-radius: 0px
        &:hover
          >.main-container
            >.main-positioner        
              >.option-container
                >.option-positioner
                &.icons-container
                  display: flex !important
              >b:last-of-type
                &+.option-container
                  >.option-positioner
                    border-radius: 0px

    &:first-child:last-child,
    &:only-child
      >.main-container
        border-radius: 0px
        >.main-positioner
          >.option-container
            &.icons-container
              border-bottom-left-radius: 19px
              border-bottom-right-radius: 19px
          >b:first-of-type:last-of-type
            &+.option-container
              >.option-positioner
                border-radius: 5px 19px 19px 19px
                
          >b:last-of-type
            &+.option-container
              >.option-positioner
                // border-radius: 5px 19px 19px 19px
                
      &.property
        >.main-container
          >.main-positioner
            >.option-container
              >.option-positioner
      &.show-options,
        >.main-container
          // background: rgba($grey, 1)
          // border-top-left-radius: 19px
          // border-top-right-radius: 19px
          >.main-positioner
            >.option-container
              &.icons-container
              

      &.editing
        >.main-container
          >.main-positioner
            >.option-container
              >.option-positioner
                >.option
                  &.value
                    .value-container
                      .value-positioner
              &.title-container
                .title-positioner
                  border-radius: 19px 19px 0px 0px
              &.description-container
                .description-positioner
                  border-radius: 19px 19px 0px 0px
        
        &.show-options
          >.main-container
            >.main-positioner
              >.option-container
                >.option-positioner
                  >.option
                    &.value
                      >.value-container
                        >.value-positioner
                          border-radius: 0px
      &:hover
        >.main-container
          border-radius: 0px
          >.main-positioner
            >.option-container
              &.icons-container
                border-bottom-left-radius: 19px
                border-bottom-right-radius: 19px
            >b:first-of-type:last-of-type
              &+.option-container
                >.option-positioner
                  border-radius: 5px 19px 0px 0px
                &.icons-container
                  border-bottom-left-radius: 19px
                  border-bottom-right-radius: 19px
            >b:last-of-type
              &+.option-container
                >.option-positioner
                  // border-radius: 5px 19px 19px 19px
                    
  &.a-lopu-root
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
            >.option
              background: rgba($grey, 0)
              &.indented-container
                padding: 0px
  
  
  &.holo-mode
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
            background: rgba($grey, 0)

          &.properties-container
            >.option-positioner
              background: rgba($green, .7)

    &.inventory-mode
      >.main-container
        >.main-positioner
          >.option-container
            &.name-container
              >.option-positioner
                background: rgba($grey, 0)
  // classes
  .toggle 
    position: absolute
    top: 50%
    left: 50%
    width: 60px
    height: 40px
    border-radius: 100px
    background-color: #ddd
    margin: -20px -40px
    overflow: hidden
    box-shadow: inset 0 0 2px 1px rgba(0,0,0,.05)
    .b
      display: block
    .check 
      position: absolute
      display: block
      // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
      top: 0
      left: 0
      width: 100%
      height: 100%
      opacity: 0
      z-index: 6
    

      .check:checked ~ .track 
        box-shadow: inset 0 0 0 20px #4bd863
      

      .check:checked ~ .switch 
        right: 2px
        left: 22px
        transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860)
        transition-property: left, right
        transition-delay: .05s, 0s
      

    .switch 
      position: absolute
      left: 2px
      top: 2px
      bottom: 2px
      right: 22px
      background-color: #fff
      border-radius: 36px
      z-index: 1
      transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860)
      transition-property: left, right
      transition-delay: 0s, .05s
      box-shadow: 0 1px 2px rgba(0,0,0,.2)
    

    .track 
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      transition: .35s cubic-bezier(0.785, 0.135, 0.150, 0.860)
      box-shadow: inset 0 0 0 2px rgba(0,0,0,.05)
      border-radius: 40px
                  
  // Animations
  .options-enter-active,
  .inventory-enter-active,
  .properties-enter-active,
    transition: max-height 1ms ease
  .options-leave-active,
  .inventory-leave-active
  .properties-leave-active
    transition: max-height 1ms ease
  .options-enter,
  .options-leave-to,
  .inventory-enter,
  .inventory-leave-to
  .properties-enter,
  .properties-leave-to
    overflow: hidden
    max-height: 0px
  @keyframes anim
    0%
      display: none;
      opacity: 0;
    1%
      display: block;
      opacity: 0;
      // transform: scaleY(0);
    100%
      opacity: 1;
      max-height: 100%
      // transform: scaleY(1);

</style>
<style lang="sass">
  @import 'src/styles/vars'
  .thing
    a
      color: $green
      border-bottom: 1px dotted rgba($green, .5)
    .medium-editor-element
      min-width: 1px
      text-align: left
      outline: none
      width: 100%
      box-sizing: border-box
      min-height: auto
      line-break: normal
      // display: flex
      // align-items: flex-start
      // justify-content: flex-start
      // flex-direction: column
      // &[contenteditable=true]:empty:before
      //   content: attr(placeholder)
      //   display: block
      // hyphens: auto
      >*
        // order: 2
      &.medium-editor-placeholder:after
        margin-top: 0px
        margin-bottom: 0px
        padding: 0px
        max-width: 100%
        white-space: normal
        word-wrap: break-word
        position: relative
        // top: auto
        // left: auto
        &:first-child
          // font-size: 1.5rem
          // border-bottom: 1px solid darken($grey, 5)
      
      
    >.main-container
      >.main-positioner
        >.option-container
          >.option-positioner
            .option
              &.realms,
              &.url,
              &.thingType,
              &.thingNames,
              &.contract,
              &.postas,
              &.privacy
                .v-select
                  $font-size: 1rem
                  font-size: $font-size
                  line-height: $font-size
                  height: 100%
                  max-width: 100%
                  // background: $white
                  // border-radius: 7px
                  // border-top-right-radius: 7px
                  // border-bottom-right-radius: 7px
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
                    // overflow-x: scroll
                    // overflow-y: hidden
                    width: auto
                    max-width: 250px
                    &:after
                      display: none
                    .input-container
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

                .price
                  .v-select
                    &.currency-select
                      min-width: 90px
                      max-width: 90px
                    &.ammount-select
                      min-width: 90px
                      max-width: 90px
                    &.multiplier-select
                      min-width: 90px
                      max-width: 90px
                    &.unit-select
                      min-width: 100px
                      max-width: 100px
                    .form-control
                      text-align: center
                &.pill
                  .v-select
                    // display: none
                    .dropdown-toggle
                      flex-direction: column
                      flex-wrap: nowrap
                      .form-control
                        // background: $green
                        background: $white
                        border: 1px solid $green
                        border-radius: 8px
                        padding: 1px 5px
                        // margin-top: 3px
                        // margin-bottom: 4px
                      .selected-tag-list
                        .selected-tag
                          border-radius: 8px
                          // overflow: hidden
                          margin: 0px
                          padding: 4px 9px
                          background: $green
                          color: $white
                          margin-top: 5px
                          margin-right: 4px

          &.location-container
            >.option-positioner
              .mapboxgl-map
                width: 100%
                height: 600px
                text-align: left
                .marker
                  width: 56px
                  height: 56px
                  border: none
                  // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
                  img
                    width: 56px
                    height: 56px
                    border: none
                    // cursor: url(statics/cursors/ms/aero_link1.cur), pointer
          // &.inventory-container
          //   width: 100%
          //   padding: 0px
        
        
          
    .v-select
      $font-size: 1rem
      font-size: $font-size
      line-height: $font-size
      height: 100%
      max-width: 100%
      // background: $white
      // border-radius: 7px
      // border-top-right-radius: 7px
      // border-bottom-right-radius: 7px
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
        // overflow-x: scroll
        // overflow-y: hidden
        width: auto
        max-width: 250px
        &:after
          display: none
        .input-container
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
    
    &.inventory-mode
      &.editing
        .medium-editor-element
          text-align: center
          *
            text-align: center
    &.editing
      >.main-container
        >.main-positioner
          >.option-container
            >.option-positioner
            &.name-container
              a
                color: $white
                border-bottom: 1px dotted rgba($white, .5)
                  
            &.title-container
              >.option-positioner
                >.type-container
                  >.type-positioner
                    >.type
                      &.v-select
                        >.dropdown-toggle
                          >.input-container
                            >.form-control
                              font-size: inherit
                              padding-left: 0px
                            >.open-indicator
                              height: 12px
      .medium-editor-element
        a
          color: $white


    &.shallow
      .medium-editor-element
        margin-top: 4px
        margin-bottom: 4px
  
              // border-bottom-left-radius: 15px
              // border-bottom-right-radius: 15px


</style>
