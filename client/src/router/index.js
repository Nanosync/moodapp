import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MoodLog from '@/components/MoodLog'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/moodlog',
      name: 'MoodLog',
      component: MoodLog
    }
  ]
})

export default router