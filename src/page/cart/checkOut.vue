<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <!-- CONTENT -->
    <div id="page-content" class="shipping-checkout-page">
      <div class="cart-page">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="section-title">确认订单</div>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="checkout-payable">
                <div class="cart-cp cart-total">
                  <div class="cp-left">总价</div>
                  <div class="cp-right">￥ {{this.totalPrice}}</div>
                </div>
                <div class="cart-cp cart-discount">
                  <div class="cp-left">折扣</div>
                  <div class="cp-right">- ￥ 00.00</div>
                </div>
                <!--<div class="cart-cp cart-delivery">-->
                  <!--<div class="cp-left"></div>-->
                  <!--<div class="cp-right">$ 2.00</div>-->
                <!--</div>-->
                <div class="cart-cp cart-total-payable">
                  <div class="cp-left">实付</div>
                  <div class="cp-right">￥ {{this.totalPrice}}</div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="row">
            <form class="col s12">
              <div class="payment-method-wrap ck-box">
                <div class="row">
                  <div class="input-field col s12 m12 l12 ">
                    <div class="payment-method-text">
                      <i class="far fa-credit-card"></i> 支付方式
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <div style="margin: 0px 0px 10px">选择你的支付方式 :</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 m12 l12 ">
                    <p>
                      <input class="with-gap" name="group1" type="radio" id="test1"/>
                      <label for="test1">支付宝</label>
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 m12 l12 ">
                    <p>
                      <input class="with-gap" name="group1" type="radio" id="test2"/>
                      <label for="test2">微信</label>
                    </p>
                  </div>
                </div>
              </div>
              <br>
              <br>
              <div class="row">
                <div class="input-field col s12 m12 l12 center">
                  <button class="btn theme-btn-rounded " @click="checkOut">提交</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTENT -->

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
  import {checkout} from 'src/service/getData'

  export default {
    data() {
      return{
        imgBaseUrl,
        totalPrice: 0, //总共价格
        cartFoodList: [], //购物车商品列表,
        min:1,
        max:999
      }
    },
    activated() {
      this.shopId =1;
      this.initData();
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

    },

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
        'INIT_BUYCART','ADD_CART','REDUCE_CART','CLEAR_CART'
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
            if(item){
              num += item.number;
              this.totalPrice += item.number*item.price;
              this.cartFoodList[cartFoodNum] = {};
              this.cartFoodList[cartFoodNum].item_id = item.item_id;
              this.cartFoodList[cartFoodNum].number = item.number;
              this.cartFoodList[cartFoodNum].price = item.price;
              this.cartFoodList[cartFoodNum].name = item.name;
              this.cartFoodList[cartFoodNum].image_path= item.image_path;
              cartFoodNum ++;
            }

          }
          newArr[i] = num;
          this.totalPrice = this.totalPrice.toFixed(2);

        }else{
          newArr[0] = 0;
        }

      },

      async checkOut() {
         await checkout(this.cartFoodList,this.shopId,0,1);
         this.CLEAR_CART({shopid: this.shopId})
         this.$router.push({ path: '/shoppingCart' })
      }

    },
    watch: {
      // shopCart:function () {
        // if (this.shopCart) {
        // }
      // }
    }


  }
</script>


<style>


  /*==================================================
  9. CHECKOUT
  ==================================================*/
  .shipping-checkout-page .checkout-payable {
    border: 1px solid #e0e0e0;
    margin: 0px 0px; }

  .shipping-checkout-page .payment-method-text {
    font-weight: 600;
    margin: 0px 0px 10px; }

  .shipping-checkout-page .payment-method-text .fa,
  .shipping-checkout-page .payment-method-text .fas,
  .shipping-checkout-page .payment-method-text .far,
  .shipping-checkout-page .payment-method-text .fal,
  .shipping-checkout-page .payment-method-text .fab {
    color: #d71149;
    margin-right: 5px; }

  .shipping-checkout-page .ck-box {
    padding: 10px 20px 20px;
    background: #fbfbfb;
    border: 1px solid #e0e0e0;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px; }

  .shipping-checkout-page .label-checkbox {
    padding-left: 30px; }

  .shipping-checkout-page [type="checkbox"].filled-in:not(:checked) + label:after,
  .shipping-checkout-page [type="checkbox"].filled-in:checked + label::after,
  [type="checkbox"].filled-in:checked + label::before {
    top: 5px; }
</style>
