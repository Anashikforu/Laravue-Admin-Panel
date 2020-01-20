import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import AdminComponent from './components/AdminComponent';
import RolesComponent from './components/RolesComponent';
Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        redirect: '/login',
    },
    {
        path:'/login',
        component: LoginComponent,
        name: 'Login',
    },
    {
        path:'/admin',
        component: AdminComponent,
        name: 'Admin',
        children: [
            {
                path: 'users',
                component: RolesComponent,
                name: 'User'
            },
            {
                path: 'pages',
                component: RolesComponent,
                name: 'Page'
            },
            {
                path: 'categories',
                component: RolesComponent,
                name: 'Category'
            },
            {
                path: 'posts',
                component: RolesComponent,
                name: 'Post'
            },
            {
                path: 'roles',
                component: RolesComponent,
                name: 'Roles'
            },
        ],
        // beforeEnter: (to, from, next) => {
        //     if (localStorage.getItem('token'))
        //     {
        //         next()
        //     }
        //     else{
        //         next('/login');
        //     }
        //   }
    }

]
const router = new VueRouter({routes})
router.beforeEach((to,from,next) => {
    const token = localStorage.getItem('token')||null;
    window.axios.defaults.headers['Authorization'] = 'Bearer '+ token;
    next();
})
export default router
