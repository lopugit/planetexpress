import Vue from 'vue'
import Router from 'vue-router'
import register from 'src/components/register'
import self from 'src/components/self'
import logout from 'src/components/logout'
import planetExpress from 'src/components/planetExpress'
import currentLocationNav from 'src/components/current-location-nav'

export default [
  // {
  //   path: '/',
  //   name: 'test1',
  //   component: test1
  // },
  {
		path: '/(|home)',
		component: () => import('layouts/default'),
    children: [
      {
				name: 'planetExpress', 
				path: '', component: () => import('components/planetExpress') 
			},
			{
				path: '/logout',
				component: () => import('components/logout'),
				
			}
    ]
    // props: true
	},
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
