import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import 'hammerjs'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import 'src/lib/slick/slick/slick.min.js'
import 'src/lib/owlcarousel/owl.carousel.min.js'
import 'src/lib/Magnific-Popup-master/dist/jquery.magnific-popup.js'
import 'src/lib/js/custom.js'




if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);

    }, false);
}


$(window).on('load',function() {
  $(".preloading").fadeOut("slow");
});


Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

