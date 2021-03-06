import Vue from 'vue'
import VueRouter from 'vue-router'
// import Hello from '@/components/hello/hello'
// import Home from '@/components/home/home'
import Homechild from '@/components/home-child/home-child'
import Nofind from '@/components/404/Nofind'


const Home = (resolve) => { //按需加载方式1
  import('@/components/home/home').then((module) => {
    resolve(module)
  })
}

const Nav = (resolve) => {
  import('@/base/nav/nav').then((module) => {
    resolve(module)
  })
}

Vue.use(VueRouter)
const routes = [//设置路由的页面
    {
        path: '/home',
        components: {
          default: Home,
          navbar: Nav
        },
        children: [
            {
              path: 'child/:data',
              component: Homechild
            }
          ]
    },
    {
        path: '/hello',
        title: '首页',
        name: 'Hello',
        component: resolve => require(['@/components/hello/hello'], resolve)//路由页面//按需加载方式2
        // component: Hello
    },
    {
        path: '*',
        name: '404',
        component: Nofind,          //--》 404页面
    },
    {
        path: '/',
        component: Home,          //--》  默认的路由页面没有hash默认跳转到home
    }
]


const router = new VueRouter({
  routes: routes,
  // redirect: '/Hello',
  linkActiveClass: 'active'//改变当前选中的路由的class
});

// router.push('/home');// 强制设置默认启动的路由页面


export default router
