import Vue from 'vue'
import VueRouter from 'vue-router'
import el from "element-ui/src/locale/lang/el";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',

  },
  {
    path: '/login',
    component: ()=>import('../views/login/login'),
    meta: {
      title: '首页'
    },
    children: [  {
      path: 'hello',
      component: ()=> import('../views/login/hello')
    },]
  },
  {path: '/editpage/:pid/:name',
    component: ()=>import('../views/login/editpage')

  },
  {
    path: '/finishstatus',
    component: () => import('../views/login/finishstatus')

  },

  {
    path: '/TeacherView/:id',
    component: ()=>import('../views/login/TeacherView'),
    children: [{
      path: "hello",
      component: () => import("../views/login/hello")
    }]
  },
  {
    path: '/paper',
    component: ()=>import('../views/login/paper'),
    children: [{
      path: '',
      redirect: 'pp'
    },
      {
        path: 'pp',
        component: ()=>import('../views/login/pp')
      }
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) => {


 next()

})

export default router
