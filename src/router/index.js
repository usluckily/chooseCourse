import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'
import content from '@/components/content'
import studentlist from '@/components/studentlist'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/content/:id',
      name:'content',
      component:content
    },
    {
      path:'/studentlist/:id',
      name:'studentList',
      component:studentlist
    },
    {
      path:'/test/',
      name:'test',
      component:test
    }
  ]
})
