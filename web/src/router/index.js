import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 页面路由(独立页面)
export const pageRoutes = [
  {
    path: '/404',
    component: () => import('@/views/pages/404'),
    name: '404',
    meta: { title: '404未找到' },
    beforeEnter (to, from, next) {
      // 拦截处理特殊业务场景
      // 如果, 重定向路由包含__双下划线, 为临时添加路由
      if (/__.*/.test(to.redirectedFrom)) {
        return next(to.redirectedFrom.replace(/__.*/, ''))
      }
      next()
    }
  },
  { path: '/login', component: () => import('@/views/pages/login'), name: 'login', meta: { title: '登录' } }
]

// 模块路由(基于主入口布局页面)
export const moduleRoutes = {
  path: '/',
  component: () => import('@/views/main'),
  name: 'main',
  redirect: { name: 'sys-instance' },
  meta: { title: '主入口布局' },
  children: [
    { path: '/sys/instance', component: () => import('@/views/modules/sys/instance'), name: 'sys-instance', meta: { title: '实例管理', isTab: true } }
  ]
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: pageRoutes.concat(moduleRoutes)
})

const menuList = [{
  "menuId": 1,
  "name": "实例管理",
  "url": "sys/instance",
}, {
  "menuId": 2,
  "name": "备份计划",
  "url": "sys/job",
}, {
  "menuId": 3,
  "name": "任务历史",
  "url": "sys/task",
}, {
  "menuId": 4,
  "name": "系统日志",
  "url": "sys/log",
}
]
router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 已添加或者当前路由为页面路由, 可直接访问
  if (window.SITE_CONFIG['menuRoutesAdded'] || checkCurrentRouteIsPageRoute(to, pageRoutes)) {
    return next()
  }
  window.SITE_CONFIG['menuList'] = menuList
  addDynamicMenuRoutes(window.SITE_CONFIG['menuList'])
  next({ ...to, replace: true })
})

/**
 * 判断当前路由是否为页面路由
 * @param {*} route 当前路由
 * @param {*} pageRoutes 页面路由
 */
function checkCurrentRouteIsPageRoute (route, pageRoutes = []) {
  var temp = []
  for (var i = 0; i < pageRoutes.length; i++) {
    if (route.path === pageRoutes[i].path) {
      return true
    }
    if (pageRoutes[i].children && pageRoutes[i].children.length >= 1) {
      temp = temp.concat(pageRoutes[i].children)
    }
  }
  return temp.length >= 1 ? checkCurrentRouteIsPageRoute(route, temp) : false
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicMenuRoutes (menuList = [], routes = []) {
  for (var i = 0; i < menuList.length; i++) {
    // 组装路由
    var route = {
      path: '',
      component: null,
      name: '',
      meta: {
        ...window.SITE_CONFIG['contentTabDefault'],
        menuId: menuList[i].menuId,
        title: menuList[i].name
      }
    }
    // eslint-disable-next-line
    let URL = (menuList[i].url || '').replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)) // URL支持{{ window.xxx }}占位符变量
    URL = URL.replace(/^\//, '').replace(/_/g, '-')
    route['path'] = route['name'] = URL.replace(/\//g, '-')
    route['component'] = () => import(`@/views/modules/${URL}`)
    routes.push(route)
  }

  // 添加路由
  router.addRoutes([
    {
      ...moduleRoutes,
      name: 'main-dynamic-menu',
      children: routes
    },
    { path: '*', redirect: { name: '404' } }
  ])
  window.SITE_CONFIG['dynamicMenuRoutes'] = routes
  window.SITE_CONFIG['menuRoutesAdded'] = true
}

export default router
