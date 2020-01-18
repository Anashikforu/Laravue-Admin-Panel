import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const bar={template: "<v-alert type='error'> I am confident </v-alert>"};
const foo={template: "<v-alert type='info'> I am honest </v-alert>"};
const user={template: "<v-alert type='success'> {{$route.params.name}} </v-alert>"};
const routes = [
    {
        path:'/bar',
        component: bar,
    },
    {
        path:'/foo',
        component: foo,
    },
    {
        path:'/user/:name',
        component: user,
    }

]
export default new VueRouter({routes})
