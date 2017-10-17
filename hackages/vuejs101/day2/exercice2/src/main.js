import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const ReadPost = { 
	props: ['postId'],
	template : 
	   `
	   <div>
	   Contenu du post {{ postId }}
	   </div>
	   `}
const NotFound = { template : `<div>NotFound</div>`}


const router = new VueRouter({
	mode: 'history',
	routes: [
    	{ path: '/', redirect: '/' } ,
    	{ name: 'ReadPost', path: '/ReadPost/:postId', component: ReadPost, props:true } ,
    	{ path: '*', component: NotFound }    	 
	]
});



new Vue({
  el: '#app',
  render: h => h(App),
  router: router

})
