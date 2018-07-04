<template>
  <header id="head_top">
    <div class="nav-wrapper container">
      <!--<slot name='logo'></slot>-->

      <!--<slot name='search'></slot>-->

      <!--<slot name='header-menu-button'></slot>-->

      <!--<slot name='header-icon-menu'></slot>-->



      <div class="header-logo" >
        <a href="#" class="nav-logo"><i class="fab fa-envira"></i> 量心生活馆</a>
      </div>

      <div class="header-menu-button" >
        <a href="#" data-activates="nav-mobile-category" class="button-collapse" id="button-collapse-category" >
          <div class="cst-btn-menu">
            <i class="fas fa-align-right"></i>
          </div>
        </a>
      </div>



      <div class="header-icon-menu cart-item-wrap" >
        <a href="#/shoppingCart">
          <i class="fas fa-shopping-cart"></i>
          <span class="cart-item" v-if="cartNumber>0">{{cartNumber}}</span>
        </a>
      </div>

      <div class="header-icon-menu" >
        <a href="#" data-activates="nav-mobile-account" class="button-collapse" id="button-collapse-account"><i class="far fa-user-circle"></i></a>
      </div>





    </div>
  </header>




</template>

<script>
    import {mapState, mapActions,mapMutations} from 'vuex'
    export default {
    	data(){
            return{
                  cartNumber:0,
                  shopId:1
            }
        },
        mounted(){
            //获取用户信息
            this.getUserInfo();
            this.INIT_BUYCART();


            if (this.shopCart) {
              let cartKeys = Object.keys(this.shopCart);
              this.cartNumber = cartKeys.length;

            }
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo','cartList'
            ]),

            //当前商店购物信息
            shopCart: function (){
              return {...this.cartList[this.shopId]};
            },
        },
        methods: {

            ...mapMutations([
              'ADD_CART','INIT_BUYCART'
            ]),
            ...mapActions([
                'getUserInfo'
            ]),
        },
        watch:{
          shopCart:function () {
            if (this.shopCart) {
              let cartKeys = Object.keys(this.shopCart);
              // this.cartNumber = cartKeys.length;
              this.cartNumber =0;

              for(var i = 0 ;i <cartKeys.length ; i++){
                var item = this.shopCart[cartKeys[i]];
                if(item){
                  this.cartNumber ++;

                }
              }
            }
          }
        }


    }

</script>

