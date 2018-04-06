import CPS from 'vuex-persistedstate'
import circularJSON from 'circular-json'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export default new Vuex.Store({
    // You can use it as state property
    state: {
        isAuthenticated: false,
        entity: {
            type: 'temporary',
            identity: 'anonymous',
            auth: false,
            username: undefined
        },
        authLogs: [],
        entityMessage: "welcome, <a href='/self'>" + (this.user ? this.user.username : 'anonymous') + "</a>",
        realms: ['all', 'public','free','philosophy'],
        pageHistory: [],
        thingTypes: [
            "object",
            "service",
            "inventory",
            "question",
            "answer",
            "moment",
        ],
        types: [
            "Array",
            "String",
            "Number",
            "Boolean",
            "Thing",
            "Array of Arrays",
            "Array of Booleans",
            "Array of Numbers",
            "Array of Things",
            "Array of Strings",
            "Thing of Arrays",
            "Thing of Booleans",
            "Thing of Numbers",
            "Thing of Things",
            "Thing of Strings",
            // Array,
            // Boolean,
            // Number,
            // Object,
            // ,
            // ,
            // ,
            // ,
            // ,
            // [String],
            // "Array",
            // "Boolean",
            // "Number",
            // "Object",
            // "String",
            // "[Array]",
            // "[Boolean]",
            // "[Number]",
            // "[Object]",
            // "[String]",
        ],
        thingNames: [
            "fork",
            "flashlight",
            "book",
            "food",
            "vegan lesagne",
            "sour strap",
            "wallet",
            "blanket",
            "mattress",
        ],
        priceUnits: [
            "purchase",
            "unit",
            "use",
            "click",
            "second",
            "minute",
            "hour",
            "day",
            "cm",
            "metre",
            "km",
            "mg",
            "g",
            "kg",
            "tonne",
        ],
        currencies: [
            "AUD",
            "USD",
            "EUR",
            "REN",
            "YEN",
            "RUP",
        ],
        sideBarOptions: [
            'closed'
        ],
        ico: {
            sandboxThing: {
                title: 'A lopu sandbox thing',
                description: "change as much as you want, the change's will still be here when you return",
                names: ['a lopu ico sandbox thing', 'thing'],
            },
            sandboxThingSchema: {
                title: 'A lopu sandbox thing',
                description: "change as much as you want, the change's will still be here when you return",
                names: ['a lopu ico sandbox thing', 'thing'],
            },
        },
        test: {
            woo: Boolean,
            woo1: Array,
            woo2: [Array],
            woo3: {Array: Array},
            woo4: {
                hmm: Boolean,
                hmm1: Array,
                hmm2: [Object],
                hmm3: {Array: Array}
            }
        }
    },
    getters: {
        isAuthenticated() {
            // return this.isAuthenticated
        },
        entityGetter(state) {
            return state.entity
        },
        getUsername(state) {
            return state.entity.username
        }
    },
    setters: {
        // sandboxThing(data){

        // }
    },
    // Mutation for when you use it as a state property
    mutations: {
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        },
        entitySet(state, entity) {
            state.entity = entity
            // update
        },
        navSet(state, nav) {
            state.nav = nav
            // update
        },
        sandboxThingSet(state, sandboxThing){
            state.ico.sandboxThing = sandboxThing
        },
        entityInventorySet(state, entityInventory) {
            state.entity.inventory = entityInventory
                // update
        },
        newAuthLog(state, log) {
            state.authLogs.push(log)
        },
        entityMessageUpdate(state, newMsg) {
            state.userMessage = newMsg
        },
        SetRealms(state, realms) {
            state.realms = realms
        },
        SetThingTypes(state, thingTypes) {
            state.thingTypes = thingTypes
        },
        addPage(state, page) {
            if (typeof page === 'string') {
                state.pageHistory.push(page)
            }
        },
        resetSandboxThing(state, iff){
            if(iff){
                var schema = circularJSON.parse(circularJSON.stringify(state.ico.sandboxThingSchema))
                state.ico.sandboxThing = schema
            }
        }
    },
    actions: {
        // Perform VueAuthenticate login using Vuex actions
        login(context, payload) {
            // vueAuth.login(payload.user, payload.requestOptions).then((response) => {
            //   context.commit('isAuthenticated', {
            //     isAuthenticated: vueAuth.isAuthenticated()
            //   })
            // })
        }
    },
    plugins: [
        CPS()
    ],
})