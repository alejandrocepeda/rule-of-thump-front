import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({	
	mode: 'history',
	routes: [
		{
			path: '/',			
			component: () => import('@/layouts/app/_layout.vue'),
			redirect: {name:'home'},			
			children: [								
				{
					path: '/app/home',
					name: 'home',
					meta: {title: 'Home'},
					component: () => import('@/pages/app/home'),
				},
				{
					path: '/app/past-trials',
					name: 'past-trials',
					meta: {title: 'Past Trials'},
					component: () => import('@/pages/app/past-trials'),
				},
				{
					path: '/app/how-it-works',
					name: 'how-it-works',
					meta: {title: 'How it Works'},
					component: () => import('@/pages/app/how-it-works'),
				},
				{
					path: '/app/sign_in',
					name: 'sign_in',
					meta: {title: 'Sign In'},
					component: () => import('@/pages/app/auth'),
					
				}
			]
		}
  ]
})
