import Vue from 'vue'
import VueRouter from 'vue-router'
import VueDetect from './components/vue-detect/index.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: VueDetect },
    ]
})