import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import ('./views/Index.vue'),
      children:[
        {
          path:'',
          redirect:'/home'
        },
        {
          path: '/me',
          name: 'me',
          component: () => import ('./views/Me.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import ('./views/Order.vue')
        },
        {
          path: '/home',
          name: 'home',
          component: () => import ('./views/Home.vue')
        },
        {
          path:'/address',
          name:'address',
          component: () => import ('./views/Address.vue')
        },
        {
          path:'/city',
          name:'city',
          component: () => import ('./views/City.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('./views/Login.vue')
    },
    {
      path: '/seach',
      name: 'seach',
      component: () => import ('./views/Seach.vue')
    },
  ]
});
// 路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/Login') {
      next ()
  }else {
    isLogin ? next() : next('/Login')
  }
})

export default router;
