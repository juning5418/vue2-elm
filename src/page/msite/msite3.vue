<template>
    <div>
    	<head-top signin-up='msite'>
    		<router-link :to="'/search/geohash'" class="link_search" slot="search">
	    		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
    		</router-link>
        <router-link to="/home" slot="msite-title" class="msite_title">
          <span class="title_text ellipsis">{{msiteTitle}}</span>
        </router-link>
    	</head-top>

    	<nav class="msite_nav">
    		<div class="swiper-container" v-if="banners.length">
		        <div class="swiper-wrapper">
		            <div class="swiper-slide" v-for="banner in banners" >
                  <img :src="banner" alt="" width="100%" >
		            </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
		    <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else>
      </nav>

      <div class="image-type">
        <img src="http://localhost:8000/img/163c98254843.png" width="32%"/>
        <img src="http://localhost:8000/img/163c98254843.png" width="32%"/>
        <img src="http://localhost:8000/img/163c98254843.png" width="32%"/>
      </div>


    	<div class="shop_list_container">
	    	<header class="shop_header">
	    		<svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    		<span class="shop_header_title">商品</span>
	    	</header>
	    	<good-list v-if="hasGetData" :geohash="geohash"></good-list>
    	</div>

    	<foot-guide></foot-guide>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/footGuide'
import goodList from 'src/components/common/goodlist'
import {msiteAddress, cityGuess} from 'src/service/getData'
import 'src/plugins/swiper.min.js'
import 'src/style/swiper.min.css'

export default {
	data(){
        return {
        	geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msite页面头部标题
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://image.woarehere.com', //图片域名地址
            banners: ['http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30318.jpg',
            'http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30318.jpg',
              'http://imgs-qn.iliangcang.com/ware/sowhatimg/ware/orig/2/30/30318.jpg']
        }
    },
    async beforeMount(){
      if (!this.$route.query.geohash) {
        const address = await cityGuess();
        this.geohash = address.latitude + ',' + address.longitude;
      }else{
        this.geohash = this.$route.query.geohash
      }
      //保存geohash 到vuex
      this.SAVE_GEOHASH(this.geohash);
      //获取位置信息
      let res = await msiteAddress(this.geohash);
      this.msiteTitle = res.name;
      // 记录当前经度纬度
      this.RECORD_ADDRESS(res);

      this.hasGetData = true;
    },
    mounted(){

    },
    components: {
    	headTop,
      goodList,
    	footGuide,
    },
    computed: {

    },
    methods: {
    	...mapMutations([
    		'RECORD_ADDRESS', 'SAVE_GEOHASH'
    	]),
    	// 解码url地址，求去restaurant_category_id值
    	getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    	}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
        width: 50%;
        color: #fff;
        text-align: center;
        margin-left: -0.5rem;
        .title_text{
            @include sc(0.8rem, #fff);
            text-align: center;
            display: block;
        }
	}
	.msite_nav{
		padding-top: 2.1rem;
		background-color: #fff;
		border-bottom: 0.025rem solid $bc;
		height: 10.6rem;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.6rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}

  .image-type{
    margin-top: 1.4rem;
    display:block;
    margin-bottom:fill ;
  }

	.shop_list_container{
		margin-top: 0.2rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}

</style>
