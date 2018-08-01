<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <!-- CONTENT -->
    <div id="page-content">
      <div class="wishlist-page">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">我的</span> 订单
              </div>
            </div>
          </div>
          <div class="box-wish-list" v-for="(item, index) in orders">
            <!-- item -->
            <div class="row wish-item">
              <div class="col s12">
                <div class="wish-box">
                  <div class="wi-img">
                    <img class="wi-img-product" :src="imgBaseUrl +'food/' +item.image_path"/>
                    <!--<div class="wi-img-product" style="background-image: url(img/cabbage_PNG8821.jpg);">-->
                    <!--</div>-->
                  </div>
                  <div class="wi-name">
                    <div class="win-top">
                      <div class="win-title">{{item.name}}</div>
                      <div class="win-price">￥ {{item.total_amount}}</div>
                      <div class="win-info"></div>
                    </div>
                  </div>
                  <div class="wi-remove">
                    <a href="#"><i class="far fa-times-circle"></i></a>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
            </div>
            <!-- end item --></div>
        </div>
        <!-- PAGINATION -->
        <!--<div class="container">-->
          <!--<div class="row">-->
            <!--<div class="col s12">-->
              <!--<ul class="pagination">-->
                <!--<li class="disabled">-->
                  <!--<a href="#!"><i class="material-icons">chevron_left</i></a>-->
                <!--</li>-->
                <!--<li class="active">-->
                  <!--<a href="#!">1</a>-->
                <!--</li>-->
                <!--<li class="waves-effect">-->
                  <!--<a href="#!">2</a>-->
                <!--</li>-->
                <!--<li class="waves-effect">-->
                  <!--<a href="#!">3</a>-->
                <!--</li>-->
                <!--<li class="waves-effect">-->
                  <!--<a href="#!">4</a>-->
                <!--</li>-->
                <!--<li class="waves-effect">-->
                  <!--<a href="#!">5</a>-->
                <!--</li>-->
                <!--<li class="waves-effect">-->
                  <!--<a href="#!"><i class="material-icons">chevron_right</i></a>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!-- END PAGINATION --></div>
    </div>

    <foot-guide></foot-guide>
  </div>
</template>


<script>


  import {mapState,mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/foot'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {imgBaseUrl} from 'src/config/env'
  import {getOrderList} from 'src/service/getData'


  export default {
    data() {
      return{
        imgBaseUrl,
        orders:[]
      }
    },


    activated(){
      this.shopId =1;
      this.initData();
    },
    mounted() {
      // this.shopId =1;
      // this.initData();

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



      async initData() {


        getOrderList().then(res => {
          let resLength = res.length;
          let resArr = [...res]; // 返回一个新的数组
          this.orders =resArr;
        }).then(() => {

        })

      }

    },
    watch: {

    }


  }
</script>


<style>


  /*==================================================
  10. WISH LIST
  ==================================================*/
  .wish-item {
    padding: 0px 0px 0px;
    margin: 0px 0px; }

  .wishlist-page {
    padding: 20px 0px 30px; }

  .box-wish-list {
    margin: 0px 0px; }

  .wish-item .wish-box {
    width: 100%;
    position: relative;
    min-height: 70px;
    border-bottom: 1px solid #f2f2f2; }

  .wish-item .wish-box .wi-img {
    width: 70px;
    position: absolute;
    left: 0px;
    top: 0px; }

  .wish-item .wish-box .wi-img .wi-img-product {
    width: 100%;
    height: 70px;
    position: relative;
    background-size: 70% auto;
    background-position: center center;
    background-repeat: no-repeat; }

  .wish-item .wish-box .wi-remove {
    width: 40px;
    position: absolute;
    right: 10px;
    text-align: right;
    top: 0px;
    padding: 20px 0px; }

  .wish-item .wish-box .wi-remove .fa,
  .wish-item .wish-box .wi-remove .fas,
  .wish-item .wish-box .wi-remove .far,
  .wish-item .wish-box .wi-remove .fal,
  .wish-item .wish-box .wi-remove .fab {
    font-size: 30px; }

  .wish-item .wish-box .wi-name {
    padding-left: 70px;
    height: 100%;
    padding-right: 40px; }

  .wish-item .wish-box .wi-name .win-top {
    padding: 15px 10px; }

  .wish-item .wish-box .wi-name .win-title {
    font-weight: 600; }

  .wish-item .wish-box .wi-name .win-price {
    color: #d71149; }

  .wish-item .wish-box .wi-name .win-info {
    font-size: 12px;
    line-height: 1.2; }


</style>
