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
    name: 'planetExpress',
    component: planetExpress,
    // props: true
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
