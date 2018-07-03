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
          <!--<span class="cart-item">4</span>-->
        </a>
      </div>

      <div class="header-icon-menu" >
        <a href="#" data-activates="nav-mobile-account" class="button-collapse" id="button-collapse-account"><i class="far fa-user-circle"></i></a>
      </div>





    </div>
  </header>




</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        mounted(){
            //获取用户信息
            this.getUserInfo();

        },
        props: ['signinUp', 'headTitle', 'goBack'],
        computed: {
            ...mapState([
                'userInfo'
            ]),
        },
        methods: {
            ...mapActions([
                'getUserInfo'
            ]),
        },

    }

</script>

