<template>
    <div>
    	<head-top signin-up='msite'>



      </head-top>

      <nav>
          <left></left>
          <right></right>
      </nav>


      <!-- MAIN SLIDER -->

      <div class="main-slider" data-indicators="true">
        <div class="carousel carousel-slider " data-indicators="true"  v-for="(item, index) in banners">
          <a class="carousel-item" >

            <img :src="imgBaseUrl + 'banner/'+ item.image" alt="slider">
            <!--<img src="../../images/red/slide2.jpg" alt="slider">-->
          </a>
        </div>
      </div>


      <!-- CATEGORY -->
      <div class="section home-category">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">产品</span> 活动
              </div>
            </div>
          </div>
          <div class="row icon-service" v-for="(item ,index) in indexTypes">

            <div class="col s4 m4 l4">
              <div class="content">
                <div class="in-content">
                  <div class="in-in-content">
                    <img :src="imgBaseUrl + 'indextype/' + item.image" alt="category">
                    <h5>{{item.name}}</h5>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <!--<div class="row icon-service" >-->


            <!--<div class="col s4 m4 l4">-->
              <!--<div class="content">-->
                <!--<div class="in-content">-->
                  <!--<div class="in-in-content">-->
                    <!--<img src="../../images/red/c-diet.png" alt="category">-->
                    <!--<h5>日常</h5>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->



            <!--<div class="col s4 m4 l4">-->
              <!--<div class="content">-->
                <!--<div class="in-content">-->
                  <!--<div class="in-in-content">-->
                    <!--<img src="../../images/red/c-groceries.png" alt="category">-->
                    <!--<h5>礼物</h5>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="col s4 m4 l4">-->
              <!--<div class="content">-->
                <!--<div class="in-content">-->
                  <!--<div class="in-in-content">-->
                    <!--<img src="../../images/red/c-apple.png" alt="category">-->
                    <!--<h5>活动</h5>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

          </div>
        </div>
      <!-- END CATEGORY -->
      <!-- POPULER SEARCH -->
      <div class="section populer-search">
        <div class="container">
          <div class="row row-title">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">热搜</span> 名词
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="list-tag-word"  v-for="(item, index) in keywords">
                <a class="tag-word">{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END POPULER SEARCH -->
      <!-- FEATURED PRODUCT -->
      <div class="section product-item si-featured">
        <div class="container">
          <div class="row row-title">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">特色</span> 产品
              </div>
            </div>
          </div>
          <div class="row slick-product">
            <div class="col s12">



              <div id="featured-product" class="featured-product">


                <div v-for="(item, index) in foods" >
                  <div class="col-slick-product" >
                    <div class="box-product">
                      <router-link :to="{path: '/productDetail/'+item.item_id}" >
                        <div class="bp-top">
                          <div class="product-list-img">
                            <div class="pli-one">
                              <div class="pli-two">

                                <img :src="imgBaseUrl + 'food/'+ item.image_path" alt="img">
                                <!--<img src="../../images/red/carrot_PNG4978.jpg" alt="img">-->
                              </div>
                            </div>
                          </div>
                          <h5><a href="">{{item.name}}</a></h5>
                          <!--<div class="item-info">{{item.description}}</div>-->
                          <div class="price">￥{{item.specfoods[0].price}}</div>
                          <div class="stock-item">{{item.stock}}</div>
                        </div>
                      </router-link>
                      <div class="bp-bottom">
                        <router-link :to="{path: '/productDetail/'+item.item_id}" >

                        <button class="btn button-add-cart">购买</button>
                          </router-link>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
              <div class="more-product-list">
                <a class="more-btn" href="#/productList">更多 ></a>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- SUBSCRIBE -->
      <div class="section subscribe">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <!--<div class="section-title">SUBSCRIBE</div>-->
              <!--<p class="center">Get Your Groceries delivered from local stores</p>-->
              <!--<div class="mail-subscribe-box">-->
                <!--<input class="form-control" name="user-email" placeholder="Enter email address" value="" type="email">-->
                <!--<i class="fa fa-angle-right"></i>-->
              <!--</div>-->
            </div>
          </div>
        </div>
        <div class="bg-subscribe" style="background-image: url(../../static/img/bg-profile.jpg);">
        </div>
      </div>
      <!-- END SUBSCRIBE -->

    	<foot-guide></foot-guide>
    </div>
</template>


<script>
import {mapMutations} from 'vuex'
import headTop from 'src/components/header/head'
import footGuide from 'src/components/footer/foot'
import left from 'src/components/common/left'
import right from 'src/components/common/right'
import {getBanners,getKeywords,getFoods,getIndexTypes} from 'src/service/getData'
import {imgBaseUrl} from 'src/config/env'



export default {
	data(){
        return {
          imgBaseUrl,
          geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msite页面头部标题
            hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
            // imgBaseUrl: 'https://image.woarehere.com', //图片域名地址
            banners:[],
          keywords:[],
          foods:[],
          indexTypes:[]
            // banners: ['http://h5.heptalcc.com/img/163c98254843.png',
            // 'http://h5.heptalcc.com/img/163c98254843.png'],
        }
    },



    mounted(){

      getIndexTypes().then(res => {
        let resLength = res.length;
        let resArr=[...res];


        let indexArr = [];
        for (let i = 0; i < resLength; i += 3) {
          indexArr[i] = resArr[i];
        }
        this.indexTypes = indexArr;

      })



      getBanners().then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        // let foodArr = [];
        // for (let i = 0, j = 0; i < resLength; i += 8, j++) {
        //   foodArr[j] = resArr.splice(0, 8);
        // }
        this.banners = resArr;
      }).then(() => {
        /*=================== CAROUSEL SLIDER  ===================*/
        $('.carousel.carousel-slider').carousel({fullWidth: true},setTimeout(autoplay, 4500));
        function autoplay() {
          $('.carousel').carousel('next');
          setTimeout(autoplay, 4500);
        }
      })

      getKeywords().then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        this.keywords = resArr;
      }).then(() => {

      })


      getFoods().then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        this.foods = resArr;
      }).then(() => {
        /*=================== SLICK CAROUSEL FEATURED PRODUCT ===================*/
        $("#featured-product").slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2
        });

        /*=================== SLICK CAROUSEL POPULER PRODUCT ===================*/
        $("#populer-product").slick({
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2
        });

        /*=================== SLICK CAROUSEL PRODUCT IMAGE ===================*/
        $("#product-image").slick({
          arrows: false,
          dots: true
        });

      })


      $(document).ready(function(){
        $('.carousel').carousel();
      });

      $('.collapsible').collapsible();





      /*=================== SIDENAV CATEGORY ===================*/
      $('#button-collapse-category').sideNav({
          menuWidth: 250,
          edge: 'left',
          closeOnClick: true,
          draggable: true,
          onOpen: function(el) {},
          onClose: function(el) {},
        }
      );
      /*=================== SIDENAV ACCOUNT ===================*/
      $('#button-collapse-account').sideNav({
          menuWidth: 250,
          edge: 'right',
          closeOnClick: true,
          draggable: true,
          onOpen: function(el) {},
          onClose: function(el) {},
        }
      );






    },
    components: {
    	headTop,
    	footGuide,
      left,
      right

    },
    computed: {

    },
    methods: {
    	...mapMutations([

    	]),

    },
    watch: {

    }

}

</script>






