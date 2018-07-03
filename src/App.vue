<template>
	<div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
		<svg-icon></svg-icon>
    </div>
</template>

<script>
	import svgIcon from './components/common/svg';

  export default {
    components:{
          svgIcon
      },
  }



</script>



<style lang="css" scoped>


  @import "lib/font-awesome/web-fonts-with-css/css/fontawesome-all.css";
  @import "lib/owlcarousel/assets/owl.carousel.min.css";
  @import "lib/owlcarousel/assets/owl.theme.default.min.css";
  @import "lib/slick/slick/slick.css";
  @import "lib/slick/slick/slick-theme.css";
  @import "lib/Magnific-Popup-master/dist/magnific-popup.css";

  @import "style/style/red/css/normalize.css";
  @import "style/style/red/css/style.css";


</style>


<style lang="scss">
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
