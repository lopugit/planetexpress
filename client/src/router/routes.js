import Vue from 'vue'
import Router from 'vue-router'
import home from 'src/components/home'
import realm from 'src/components/realm'
import realms from 'src/components/realms'
import thing from 'src/components/thing'
import register from 'src/components/register'
import self from 'src/components/self'
import trade from 'src/components/trade'
import logout from 'src/components/logout'
import ico from 'src/components/ico/ico'
import icoThings from 'src/components/ico/icoThings'
import icoThingsStyles from 'src/components/ico/icoThingsStyles'
import inventoryStyles from 'src/components/ico/inventoryStyles'
import icoThingsOptions from 'src/components/ico/icoThingsOptions'
import icoSandboxThing from 'src/components/ico/icoSandboxThing'
import icoManifestThing from 'src/components/ico/icoManifestThing'
import status from 'src/components/ico/status'
import alopu from 'src/components/alopu'
import object from 'src/components/object'
import array from 'src/components/array'
import planetExpress from 'src/components/planetExpress'

import test1 from 'src/components/test1'

export default [
  // {
  //   path: '/',
  //   name: 'test1',
  //   component: test1
  // },
  {
    path: '/(|home)',
    name: 'home',
    component: home
  },
  {
    path: '/realms',
    name: 'realms',
    component: realms
  },
  {
    path: '/realms/:realm',
    name: 'realm',
    component: realm,
    props: true
  },
  {
    path: '/planetexpress',
    name: 'planetExpress',
    component: planetExpress,
    props: true
  },
  {
    path: '/forum',
    name: 'forum',
    component: thing,
    props: {
      thing: {
        names: ['a lopu inventory generator'],
        // description: 'What is the composition of reality ?',
        properties: [
          {
            title: 'server-save',
            boolean: false
          },
          {
            title: 'realms to match',
            list: ['testing']
          },
          {
            title: 'limit',
            Number: 5
          },
          {
            title: 'broadly match realms',
            boolean: true
          },
          {
            title: 'broadly match description',
            boolean: true
          },
          {
            title: 'options',
            list: [
              'no options',
              'addable',
              'no context',
              'put-first',
              'feed',
              'show-children-comments',
              'put new things first',
              'addable with template',
              'dont load childrens children',
              'wide-adder'
              ]
          }
        ]
      }

    }
  },
  {
    path: '/market',
    name: 'market',
    component: thing,
    props: {
      thing: {
        realms: ['commerce', 'market'],
        properties: [
        {
          title: 'count',
          Number: 25
        },
        {
          title: 'broadly match realms',
          boolean: true
        },
        {
          title: 'options',
          list: [
            'addable', 
            'no context', 
            'feed',
            'put-first', 
            'put new things first', 
            'default-new-thing'
          ]
        }
        ]
      },
    }
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/logout',
    name: 'logout',
    component: logout
  },
  {
    path: '/self',
    name: 'self',
    component: self
  },
  {
    path: '/trade',
    name: 'trade',
    component: trade
  },
  {
    path: '/ico',
    name: 'ico',
    component: ico
  },
  {
    path: '/ico/things',
    name: 'icoThings',
    component: icoThings
  },
  {
    path: '/ico/things/styles',
    name: 'icoThingsStyles',
    component: icoThingsStyles
  },
  {
    path: '/ico/things/styles/inventories',
    name: 'inventoryStyles',
    component: inventoryStyles
  },
  {
    path: '/ico/things/options',
    name: 'icoThingsOptions',
    component: icoThingsOptions
  },
  {
    path: '/ico/things/sandbox',
    name: 'icoSandboxThing',
    component: icoSandboxThing
  },
  {
    path: '/ico/things/manifest',
    name: 'icoManifestThing',
    component: icoManifestThing
  },
  {
    path: '/ico/status',
    name: 'status',
    component: status
  },
  {
    path: '/ico/object',
    name: 'icoobject',
    component: object
  },
  {
    path: '/object',
    name: 'object',
    component: object
  },
  {
    path: '/ico/array',
    name: 'icoarray',
    component: array
  },
  {
    path: '/array',
    name: 'array',
    component: array
  },
  {
    path: '/ico/alopu',
    name: 'icoalopu',
    component: alopu
  },
  {
    path: '/alopu',
    name: 'alopu',
    component: alopu
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
