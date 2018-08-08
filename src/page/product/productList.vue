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
      <div class="section product-item">
        <div class="container">
          <div class="row row-title">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">我们的</span> 产品
              </div>
            </div>
          </div>
          <div class="row row-no-margin">
            <!-- Product item-->
            <div v-for="(item, index) in foods">
              <div class="col s6 m4 l3 col-produc">
                <div class="box-product">
                  <div class="bp-top">
                    <div class="product-list-img">
                      <div class="pli-one">
                        <div class="pli-two">
                          <img :src="imgBaseUrl + 'food/'+ item.image_path" alt="img">
                        </div>
                      </div>
                    </div>
                    <h5><a href="">{{item.name}}</a></h5>
                    <!--<div class="item-info">{{item.description}}</div>-->
                    <div class="price">￥{{item.specfoods[0].price}}</div>
                    <div class="stock-item">{{item.stock}}</div>
                  </div>
                  <div class="bp-bottom">
                    <router-link :to="{path: '/productDetail/'+item.item_id+'/'+item.restaurant_id}" >
                      <button class="btn button-add-cart" >购买</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Product item-->
          </div>
        </div>
      </div>
      <!--<page></page>-->
    </div>
      <!-- END PAGINATION -->

    <foot-guide></foot-guide>

  </div>
</template>


<script>
  import {mapMutations} from 'vuex'


  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/foot'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import page from 'src/components/common/page'
  import {getFoods} from 'src/service/getData'
  import {imgBaseUrl} from 'src/config/env'

  export default {
    data() {
      return{
        imgBaseUrl,
        foods:[]
      }
    },


    mounted() {

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


      getFoods().then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        this.foods = resArr;
      }).then(() => {


      })


    },


    components: {
      headTop,
      footGuide,
      left,
      right,
      page

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


<style>



</style>
