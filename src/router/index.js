import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Class from '@/components/class/Class'
import Questions from '@/components/questions/Questions'
import Answer from '@/components/answer/Answer'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/class',
      children: [
        {
          path: '/class',
          component: Class,
          redirect: '/questions/1',
          children: [
            { path: '/questions/:classId', component: Questions },
            { name: 'Answer', path: '/answer', component: Answer }
          ]
        }
      ]
    }
  ]
})
