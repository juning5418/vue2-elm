<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <!-- CONTENT -->
    <div id="page-content" class="product-page">
      <div id="product-image" class="pg-product-image">
        <!-- image -->
        <div>
          <div class="pgp-wrap-img">
            <div class="pgp-wrap-img-in">
              <!--<div class="pgp-img" />-->
                <img  :src="imgBaseUrl + good.image_path" class="pgp-img" />

              <!--<div class="pgp-img" style="background-image: url(../../static/img/cabbage_PNG8821.jpg);">-->
              <!--</image>-->
            </div>
          </div>
        </div>

        <!-- end image --></div>
      <div class="add-wish-lish">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="awl-btn">
                <div class="awl-btn-icon">
                  <i class="far fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="name-price">
              <div class="pg-product-name">{{good.name}}</div>
              <div class="pg-product-price">￥{{good.specfoods[0].price}}</div>
              <div style="clear:both;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="desciption-product">
        <div class="container">
          <div class="row">
            <div class="col s12">
              {{good.description}}
            </div>
          </div>
        </div>
      </div>
      <div class="qty-total-price">
        <div class="container">
          <div class="row">
            <div class="col s3">
              <div class="qty-qty" >数量</div>
            </div>
            <div class="col s5">
              <div class="qty-prc">
                <div class="quantity">
                  <input type="number" min="1" max="9999" step="1" v-model="number">
                  <div class="quantity-button quantity-up"  >+</div>
                  <div class="quantity-button quantity-down" >-</div></div>
              </div>
            </div>
            <div class="col s4">
              <div class="qty-buy" >
                <button  class="btn button-add-cart" @click="buy" >购买</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>


<script>
  import {mapMutations} from 'vuex'
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
        number:1,
        backImageDetail:'url(' + require('../../images/red/cabbage_PNG8821.jpg') + ')',
        itemId:null,
        good:{
          name:null,
          specfoods:[
            {price:0}
          ],
          description:null,
          image_path:null
        },
        min:1,
        max:999
      }
    },

    created(){
      this.number=1;
    },

    mounted() {
      this.shopId =1;
      // this.number=1;
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
      this.itemId = this.$route.params.itemId;
      // this.itemId = this.$route.query.itemId;
      getFoodDetal(this.shopId,this.itemId).then(res => {
        let resLength = res.length;
        let resArr = [...res]; // 返回一个新的数组
        this.good =resArr[0];
      }).then(() => {

      })

      /*=================== QTY INPUT ===================*/
      // $('<div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div>').insertAfter('.quantity input');
      $('.quantity').each(function() {
          var spinner = jQuery(this),
          input = spinner.find('input[type="number"]'),
          btnUp = spinner.find('.quantity-up'),
          btnDown = spinner.find('.quantity-down'),
          min = input.attr('min'),
          max = input.attr('max');

        btnUp.on("click", function() {
          var oldValue = parseFloat(input.val());
          if (oldValue >= max) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue + 1;
          }
          this.number = newVal;
          // alert(this.number);
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
        });

        btnDown.on("click", function() {
          var oldValue = parseFloat(input.val());
          if (oldValue <= min) {
            var newVal = oldValue;
          } else {
            var newVal = oldValue - 1;
          }
          this.number = newVal;
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
        });

      });

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
        'ADD_CART','INIT_BUYCART'
      ]),

      buy:function () {

        $('.quantity').each(function() {
          var spinner = jQuery(this);
          var input = spinner.find('input[type="number"]');
          var numberValue = parseFloat(input.val());
          this.number = numberValue;

        });

        this.ADD_CART({shopid: this.shopId, item_id:this.itemId, name:this.good.name, price:this.good.specfoods[0].price, number:this.number,image_path:this.good.image_path});

        this.INIT_BUYCART();
      }

    },
    watch: {
      // number:function(val,oldval){
      //   console.log(this.number)
      // }
    }


  }
</script>


<style>


  /*==================================================
19. PRODUCT PAGE
==================================================*/
  .pg-product-image {
    overflow: hidden; }

  .pg-product-image .slick-slide {
    margin: 0 10px; }

  .pg-product-image .slick-list {
    margin: 0 -10px; }

  .pg-product-image .slick-dots {
    bottom: 0px; }

  .pg-product-image .slick-dots li button::before {
    font-size: 10px; }

  .pg-product-image .slick-dots li {
    margin: 0px 0px; }

  .pg-product-image {
    position: center;
    margin-bottom: 0px !important; }

  .pg-product-image {
    height: 200px;
    overflow: hidden; }

  .pg-product-image .pgp-wrap-img .pgp-wrap-img-in {
    height: 200px;
    width: 100%;
    background-color: #fff; }

  .pg-product-image .pgp-wrap-img .pgp-wrap-img-in .pgp-img {
    height: 100%;
    /*background-position: center center;*/
    /*background-size: auto 100%;*/
    /*background-repeat: no-repeat;*/


  }

  .add-wish-lish .awl-btn {
    width: 45px;
    height: 45px;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    display: table;
    background-color: #ffffff;
    border: 1px solid #f8f8f8;
    margin-top: -30px;
    position: relative;
    float: right;
    -webkit-box-shadow: 2px 2px 5px 0px rgba(50, 50, 50, 0.21);
    -moz-box-shadow: 2px 2px 5px 0px rgba(50, 50, 50, 0.21);
    box-shadow: 2px 2px 5px 0px rgba(50, 50, 50, 0.21);
    cursor: pointer; }

  .add-wish-lish .awl-btn:hover {
    background-color: #d71149;
    border: 1px solid #d71149; }

  .add-wish-lish .awl-btn:hover .awl-btn-icon {
    color: #ffffff; }

  .add-wish-lish .awl-btn .awl-btn-icon {
    display: table-cell;
    vertical-align: middle;
    font-size: 18px;
    text-align: center;
    color: #d71149; }

  .product-page .name-price {
    position: relative; }

  .product-page .pg-product-name {
    font-size: 20px;
    color: #d71149;
    width: 100%;
    padding-right: 100px; }

  .product-page .pg-product-price {
    font-size: 20px;
    font-weight: 600;
    color: #ff8700;
    float: right;
    width: 100px;
    text-align: right;
    padding-right: 5px;
    position: absolute;
    right: 0px;
    top: 0px; }

  .product-page .desciption-product {
    margin-bottom: 50px; }

  .qty-total-price .quantity {
    background: #ffffff;
    position: relative;
    height: 42px; }

  .qty-total-price input[type=number]::-webkit-inner-spin-button,
  .qty-total-price input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0; }

  .qty-total-price input[type=number] {
    -moz-appearance: textfield; }

  .qty-total-price {
    background-color: #f6f6f6;
    padding: 20px 0px; }

  .qty-total-price .quantity input {
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    height: 42px;
    line-height: 1.65;
    display: block;
    padding: 0;
    margin: 0;
    left: 25%;
    width: 50%;
    padding: 0px 10px;
    text-align: center;
    position: absolute;
    box-sizing: border-box; }

  .qty-total-price .row {
    margin-bottom: 0px; }

  .qty-total-price .quantity input:focus {
    outline: 0; }

  .qty-total-price .quantity-nav {
    float: left;
    position: relative;
    height: 42px; }

  .qty-total-price .quantity-button {
    position: absolute;
    padding: 5px 0px;
    cursor: pointer;
    width: 25%;
    text-align: center;
    color: #333;
    font-size: 18px;
    line-height: 1.7;
    border: 1px solid #d8d8d8;
    height: 42px;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none; }

  .qty-total-price .quantity-button.quantity-up {
    position: absolute;
    top: 0;
    right: -25%; }

  .qty-total-price .quantity-button.quantity-down {
    position: absolute;
    top: 0;
    left: 25%; }

  .qty-total-price .qty-qty {
    padding: 10px 5px 0px;
    color: #d71149; }

  .qty-total-price .button-add-cart {
    margin: 0px 0px;
    padding: 0px 0px;
    text-align: center;
    font-weight: 600;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0);
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0px 0px 0 rgba(0, 0, 0, 0), 0 0px 0px 0px rgba(0, 0, 0, 0); }



</style>
