import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [
    //登录
  {
    path:'/login',
    name:'Login',
    component: () =>import('@/views/Login/Login.vue'),
  },
    //主页
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect:'/home', //重定向
    children:[  //子路由
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/HomeView.vue'),
      },
      //--User--
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/user/User.vue'),
      },
      {
        path: 'addUser',
        name: 'AddUser',
        component: () => import('@/views/user/AddUser.vue'),
      },
      {
        path: 'editUser',
        name: 'EditUser',
        component: () => import('@/views/user/EditUser.vue'),
      },

      //--Admin--
      {
        path: 'adminList',
        name: 'AdminList',
        component: () => import('@/views/admin/List.vue'),
      },
      {
        path: 'addAdmin',
        name: 'AddAdmin',
        component: () => import('@/views/admin/Add.vue'),
      },
      {
        path: 'editAdmin',
        name: 'EditAdmin',
        component: () => import('@/views/admin/Edit.vue'),
      },

      //--Category--
      {
        path: 'categoryList',
        name: 'CategoryList',
        component: () => import('@/views/category/ListCategory.vue'),
      },
      {
        path: 'addCategory',
        name: 'AddCategory',
        component: () => import('@/views/category/AddCategory.vue'),
      },
      {
        path: 'editCategory',
        name: 'EditCategory',
        component: () => import('@/views/category/EditCategory.vue'),
      },

      //--Book--
      {
        path: 'bookList',
        name: 'BookList',
        component: () => import('@/views/book/ListBook.vue'),
      },
      {
        path: 'addBook',
        name: 'AddBook',
        component: () => import('@/views/book/AddBook.vue'),
      },
      {
        path: 'editBook',
        name: 'EditBook',
        component: () => import('@/views/book/EditBook.vue'),
      },

      //--Borrow--
      {
        path: 'borrowList',
        name: 'BorrowList',
        component: () => import('@/views/borrow/ListBorrow.vue'),
      },
      {
        path: 'addBorrow',
        name: 'AddBorrow',
        component: () => import('@/views/borrow/AddBorrow.vue'),
      },
      {
        path: 'editBorrow',
        name: 'EditBorrow',
        component: () => import('@/views/borrow/EditBorrow.vue'),
      },

      // --ReturnBook--
      {
        path: 'returList',
        name: 'returList',
        component: () => import('@/views/retur/ListReturnBook.vue'),
      }
    ]
  },

  {
    path: '*',
    component:() => import('@/views/404.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path ==='/login') next() //判断下一个路由
  const admin = Cookies.get('admin')
  if(!admin && to.path !== '/login') return next('/login') //强制退回登录界面
  next()
})

export default router
