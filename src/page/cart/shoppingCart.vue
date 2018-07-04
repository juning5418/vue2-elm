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
      <div class="cart-page">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">购物</span> 车
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="cart-box" v-for="(item, index) in cartFoodList ">
                <!-- item-->
                <div class="cart-item">
                  <div class="ci-img">
                    <img class="ci-img-product" :src="imgBaseUrl+item.image_path">
                    <!--<div class="ci-img-product" style="background-image: url(img/cabbage_PNG8821.jpg);">-->
                    <!--</div>-->
                  </div>
                  <div class="ci-name">
                    <div class="cin-top">
                      <div class="cin-title">{{item.name}}</div>
                      <div class="cin-price">￥{{item.price}}</div>
                    </div>
                  </div>
                  <div class="ci-price">
                    <div class="qty-total-price">
                      <div class="qty-prc">
                        <div class="quantity">
                          <input type="number" min="0" max="9999" step="1" v-model="item.number"></div>
                      </div>
                    </div>
                  </div>
                  <div style="clear: both"></div>
                </div>
                <!-- end item-->
              </div>
              <div class="checkout-payable">
                <div class="cart-cp cart-total">
                  <div class="cp-left">总价</div>
                  <div class="cp-right">￥ {{this.totalPrice}}</div>
                </div>
                <div class="cart-cp cart-discount">
                  <div class="cp-left">折扣</div>
                  <div class="cp-right">- ￥ 0.00</div>
                </div>
                <!--<div class="cart-cp cart-coupon-discount">-->
                  <!--<div class="cp-left">Coupon discount</div>-->
                  <!--<div class="cp-right">-->
                    <!--<a href="#">Apply coupon</a>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="cart-cp cart-delivery">-->
                  <!--<div class="cp-left">运费</div>-->
                  <!--<div class="cp-right">$ 2.00</div>-->
                <!--</div>-->
                <div class="cart-cp cart-total-payable">
                  <div class="cp-left">付款价格</div>
                  <div class="cp-right">￥ {{this.totalPrice}}</div>
                </div>
              </div>
              <button class="btn button-add-cart checkout-button">结算 <i class="fas fa-arrow-circle-right"></i></button>

              <!--<button class="btn button-add-cart checkout-button ">结算</button>-->
            </div>
          </div>
        </div>
      </div>
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
  import {getFoodDetal} from 'src/service/getData'
  import {imgBaseUrl} from 'src/config/env'

  export default {
    data() {
      return{
        imgBaseUrl,
        totalPrice: 0, //总共价格
        cartFoodList: [], //购物车商品列表
      }
    },


    mounted() {
      this.shopId =1;
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

      this.INIT_BUYCART();
      this.initData();

    },
    // created(){
    //   this.initData();
    // },
    // activated(){
    //   this.initData();
    // },


    components: {
      headTop,
      footGuide,
      left,
      right
    },


    computed: {
      ...mapState(
        ['cartList']
      )

      ,
      //当前商店购物信息
      shopCart: function (){
        return {...this.cartList[this.shopId]};
      },
    },
    methods: {
      ...mapMutations([
        'INIT_BUYCART'
      ]),

      async initData(){
        let newArr = [];
        let cartFoodNum = 0;
        this.totalPrice = 0;
        this.cartFoodList = [];
        let cartKeys = [];
        let itemKeys = [];


        if (this.shopCart) {
          cartKeys = Object.keys(this.shopCart);
          let num = 0;

          for(var i = 0 ;i <cartKeys.length ; i++){
            var item = this.shopCart[cartKeys[i]];
            // itemKeys = Object.keys(forItem);
            //   for(var j = 0 ;j <itemKeys.length ; j++) {
            //     var item = this.shopCart[cartKeys[i]][itemKeys[j]];
                num += item.number;
                this.totalPrice += item.number*item.price;
                this.cartFoodList[cartFoodNum] = {};
                this.cartFoodList[cartFoodNum].item_id = item.item_id;
                this.cartFoodList[cartFoodNum].number = item.number;
                this.cartFoodList[cartFoodNum].price = item.price;
                this.cartFoodList[cartFoodNum].name = item.name;
                this.cartFoodList[cartFoodNum].image_path= item.image_path;
                cartFoodNum ++;

              // }
            }
            newArr[i] = num;

          }else{
          newArr[0] = 0;
        }

        this.totalPrice = this.totalPrice.toFixed(2);
        // this.categoryNum = [...newArr];
      },

    },
    watch: {

    }


  }
</script>


<style>

  /*==================================================
  8. CART
  ==================================================*/
  .cart-page {
    padding: 20px 0px 30px; }

  .cart-box {
    margin-bottom: 20px; }

  .cart-box .cart-item {
    width: 100%;
    position: relative;
    min-height: 70px;
    border-bottom: 1px solid #f2f2f2; }

  .cart-box .cart-item .ci-img {
    width: 70px;
    position: absolute;
    left: 0px;
    top: 0px; }

  .cart-box .cart-item .ci-img .ci-img-product {
    width: 100%;
    height: 70px;
    position: relative;
    background-size: 70% auto;
    background-position: center center;
    background-repeat: no-repeat; }

  .cart-box .cart-item .ci-img .ci-qty {
    height: 30px; }

  .cart-box .cart-item .ci-name {
    padding-left: 70px;
    height: 100%;
    padding-right: 105px; }

  .cart-box .cart-item .ci-name .cin-top {
    padding: 15px 10px; }

  .cart-box .cart-item .ci-name .cin-title {
    font-weight: 600; }

  .cart-box .cart-item .ci-name .cin-price {
    color: #d71149; }

  .cart-box .cart-item .ci-price {
    width: 105px;
    position: absolute;
    right: 0px;
    text-align: right;
    top: 0px; }

  .cart-box .cart-item .qty-total-price {
    background: transparent;
    padding: 14px 10px 0px 0px; }

  .cart-box .cart-item .qty-total-price .quantity input {
    border-top: 0px solid #d8d8d8;
    border-bottom: 0px solid #d8d8d8;
    height: 25px;
    padding: 0px 0px;
    text-align: center; }

  .cart-box .cart-item .qty-total-price .quantity-button {
    -webkit-border-radius: 90px;
    -moz-border-radius: 90px;
    border-radius: 90px;
    height: 25px;
    width: 25px;
    padding: 2px 0px;
    line-height: normal;
    font-size: 14px;
    border: 1px solid #d71149; }

  .checkout-payable {
    margin: 20px 0px;
    background-color: #f9f9f9;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    padding: 15px; }

  .checkout-payable .cart-cp {
    position: relative; }

  .checkout-payable .cp-left {
    padding-right: 140px;
    padding-bottom: 5px; }

  .checkout-payable .cp-right {
    position: absolute;
    right: 0px;
    width: 140px;
    text-align: right;
    top: 0px; }

  .checkout-payable .cart-coupon-discount .cp-right {
    color: #d71149;
    font-style: italic;
    font-size: 12px; }

  .checkout-payable .cart-total-payable {
    margin-top: 10px;
    padding-top: 15px;
    border-top: 1px solid #e1e1e1; }

  .checkout-payable .cart-total-payable .cp-right {
    font-weight: 600;
    color: #d71149;
    padding-top: 15px; }

  .checkout-payable .cart-total-payable .cp-left {
    font-weight: 600;
    color: #d71149; }

  .button-add-cart {
    margin: 30px auto 0px;
    width: 150px;
    display: block;
    font-weight: 600;
    position: relative;
    text-align: left;
    padding: 0px 40px 0px 23px;
    -webkit-border-radius: 90px;
    -moz-border-radius: 90px;
    border-radius: 90px; }

  .button-add-cart .fa,
  .button-add-cart .fas,
  .button-add-cart .far,
  .button-add-cart .fal,
  .button-add-cart .fab {
    position: absolute;
    top: 0px;
    right: 17px; }


</style>
