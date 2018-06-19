 <template>
	<div class="rating_page">
        <head-top :head-title="name" go-back='true'></head-top>
        <section class="header_img">
            <img :src="imgBaseUrl + image_path" class="food_img">
            <div class="cover"></div>
        </section>
        <p class="description">{{description}}</p>
        <section class="detail_container">
            <section class="detail_left">
                <p>{{name}}</p>
                <p>
                  <span>月售 {{month_sales}}单</span>
                  <span>售价 ¥{{price}}</span>

                </p>
                <p>
                  <span>评论数 {{rating_count}}</span>
                  <span>好评率 {{satisfy_rate}}%</span>
                </p>
            </section>

        </section>

        <section class="buy_cart_container">
          <section @click="toggleCartList" class="cart_icon_num">
            <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0, move_in_cart:receiveInCart}" ref="cartContainer">
                                    <span v-if="totalNum" class="cart_list_length">
                                        {{totalNum}}
                                    </span>
              <svg class="cart_icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
              </svg>
            </div>
            <div class="cart_num">
              <div>¥ {{totalPrice}}</div>
            </div>
          </section>
          <section class="gotopay" >
            <router-link :class="{gotopay_acitvity:true}" :to="{path:'/order'}" class="gotopay_button_style"  v-if="cartFoodList.length<=0" >去结算</router-link>
            <router-link :class="{gotopay_acitvity:true}" :to="{path:'/confirmOrder', query:{geohash, shopId,image_path}}" class="gotopay_button_style"  v-else >去结算</router-link>
            <div  @click="addSpecs()" :class="{cart_acitvity:true}"  class="addto_cart_button_style"  >加入购物车</div>
          </section>

          <transition name="toggle-cart">
            <section class="cart_food_list" v-show="showCartList&&cartFoodList.length">
              <header>
                <h4>购物车</h4>
                <div @click="clearCart">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
                  </svg>
                  <span class="clear_cart">清空</span>
                </div>
              </header>
              <section class="cart_food_details" id="cartFood">
                <ul>
                  <li v-for="(item, index) in cartFoodList" :key="index" class="cart_food_li">
                    <div class="cart_list_num">
                      <p class="ellipsis">{{item.name}}</p>
                      <p class="ellipsis">{{item.specs}}</p>
                    </div>
                    <div class="cart_list_price">
                      <span>¥</span>
                      <span>{{item.price}}</span>
                    </div>
                    <section class="cart_list_control">
                                            <span @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                                <svg>
                                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                                                </svg>
                                            </span>
                      <span class="cart_num">{{item.num}}</span>
                      <svg class="cart_add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                      </svg>
                    </section>
                  </li>
                </ul>
              </section>
            </section>
          </transition>
          <transition name="fade">
            <div class="screen_cover" v-show="showCartList&&cartFoodList.length" @click="toggleCartList"></div>
          </transition>


        </section>

    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {msiteAddress, shopDetails,getFoodDetal} from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import {getImgPath} from 'src/components/common/mixin'
  import buyItemCart from 'src/components/common/buyItemCart'
  import {imgBaseUrl} from 'src/config/env'

    export default {
    	data(){
            return{
                geohash: '', //geohash位置信息
                image_path: null,
                description: null,
                month_sales: null,
                name: null,
                rating: null,
                rating_count: null,
                satisfy_rate: null,
                item_id: null,
                goods: null,
                shopId: null,
                price:null,
                imgBaseUrl,
                shopDetailData: null, //商铺详情
                menuList: [], //食品列表
                good:[],
                totalPrice: 0, //总共价格
                cartFoodList: [], //购物车商品列表
                showCartList: false,//显示购物车列表
                receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
                showMoveDot: [], //控制下落的小圆点显示隐藏
                choosedFoods: null, //当前选中视频数据
                showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
                showSpecs: false,//控制显示食品规格
                specsIndex: 0, //当前选中的规格索引值
                windowHeight: null, //屏幕的高度
                elLeft: 0, //当前点击加按钮在网页中的绝对top值
                elBottom: 0, //当前点击加按钮在网页中的绝对left值


            }
        },



        mounted(){
          this.initData();
          this.windowHeight = window.innerHeight;
        },
        created(){
        	  this.image_path = this.$route.query.image_path;
            this.description = this.$route.query.description;
            this.month_sales = this.$route.query.month_sales;
            this.name = this.$route.query.name;
            this.rating = this.$route.query.rating;
            this.rating_count = this.$route.query.rating_count;
            this.satisfy_rate = this.$route.query.satisfy_rate;
            this.goods = this.$route.query.goods;
            this.shopId = this.$route.query.shopId;
            this.geohash = this.$route.query.geohash;
            this.item_id = this.$route.query.item_id;
            this.price = this.$route.query.price;
            this.INIT_BUYCART();
        },
        mixins: [getImgPath],
        components: {
        	headTop,
          buyItemCart
        },
        props:[],


        computed: {
          ...mapState([
            'latitude','longitude','cartList'
          ]),
          promotionInfo: function (){
            return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
          },
          //配送费
          deliveryFee: function () {
            if (this.shopDetailData) {
              return this.shopDetailData.float_delivery_fee;
            }else{
              return null;
            }
          },
          //还差多少元起送，为负数时显示去结算按钮
          minimumOrderAmount: function () {
            if (this.shopDetailData) {
              return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
            }else{
              return null;
            }
          },
          //当前商店购物信息
          shopCart: function (){
            return {...this.cartList[this.shopId]};
          },
          //购物车中总共商品的数量
          totalNum: function (){
            let num = 0;
            this.cartFoodList.forEach(item => {
              num += item.num
            })
            return num
          },
        },

        methods: {
          ...mapMutations([
            'RECORD_ADDRESS','ADD_CART','ADD_CART_BOX','REDUCE_CART','INIT_BUYCART','CLEAR_CART','RECORD_SHOPDETAIL'
          ]),

          //初始化时获取基本数据
          async initData(){
            if (!this.latitude) {
              //获取位置信息
              let res = await msiteAddress(this.geohash);
              //记录当前经度纬度进入vuex
              this.RECORD_ADDRESS(res);
            }
            //获取商铺信息
            this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
            //获取商铺食品列表
            // this.menuList = await foodMenu(1);

            this.good = await getFoodDetal(this.shopId,this.item_id);
            if(this.good){
              this.goods = this.good[0];
            }

            this.RECORD_SHOPDETAIL(this.shopDetailData)

            //隐藏加载动画
            this.hideLoading();
          },

          //加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
          addToCart(category_id, item_id, food_id, name, price, specs){
            this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
          },
          //移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
          removeOutCart(category_id, item_id, food_id, name, price, specs){
            this.REDUCE_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs});
          },

          //多规格商品加入购物车
          addSpecs(){



            var category_id = this.goods.category_id;
            var item_id = this.goods.specfoods[0].item_id;

            var food_id = this.goods.specfoods[0].food_id;
            var name =  this.goods.specfoods[0].name;
            var price =  this.goods.specfoods[0].price;
            var specs = "";
            if( this.goods.specifications.length>0){
              specs = this.goods.specifications[0].values[0];
            }

            var packing_fee =  this.goods.specfoods[0].packing_fee;
            var sku_id =  this.goods.specfoods[0].sku_id;
            var stock =  this.goods.specfoods[0].stock;
            var image_path = this.goods.image_path;

            this.ADD_CART({shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock,image_path});
            this.showChooseList();
          },

          /**
           * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，
           * 整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
           */
          initCategoryNum(){
            let newArr = [];
            let cartFoodNum = 0;
            this.totalPrice = 0;
            this.cartFoodList = [];
            let categoryKeys = [];
            let itemKeys = [];
            let foodKeys = [];


            if (this.shopCart) {
                categoryKeys = Object.keys(this.shopCart);
                let num = 0;

                for(var i = 0 ;i <categoryKeys.length ; i++){
                  var forC = this.shopCart[categoryKeys[i]];
                  itemKeys = Object.keys(forC);
                  for(var j = 0 ;j <itemKeys.length ; j++) {
                    var forI = this.shopCart[categoryKeys[i]][itemKeys[j]];
                    foodKeys = Object.keys(forI);
                    for(var z = 0 ;z <foodKeys.length ; z++) {
                      var foodItem = this.shopCart[categoryKeys[i]][itemKeys[j]][foodKeys[z]];
                      num += foodItem.num;
                      this.totalPrice += foodItem.num*foodItem.price;
                      if (foodItem.num > 0) {
                        this.cartFoodList[cartFoodNum] = {};
                        this.cartFoodList[cartFoodNum].category_id = categoryKeys[i];
                        this.cartFoodList[cartFoodNum].item_id = itemKeys[j];
                        this.cartFoodList[cartFoodNum].food_id = foodKeys[z];
                        this.cartFoodList[cartFoodNum].num = foodItem.num;
                        this.cartFoodList[cartFoodNum].price = foodItem.price;
                        this.cartFoodList[cartFoodNum].name = foodItem.name;
                        this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                        this.cartFoodList[cartFoodNum].image_path= foodItem.image_path;
                        cartFoodNum ++;
                      }
                    }
                  }
                  newArr[i] = num;

                }
            }else{
                newArr[0] = 0;
            }

            this.totalPrice = this.totalPrice.toFixed(2);
            this.categoryNum = [...newArr];
          },


          //显示提示，无法减去商品
          showReduceTip(){
            this.showDeleteTip = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              clearTimeout(this.timer);
              this.showDeleteTip = false;
            }, 3000);
          },



          goback(){
            this.$router.go(-1);
          },

          //显示规格列表
          showChooseList(){
            // if (goods) {
            //   this.choosedFoods = goods;
            // }
            this.showSpecs = !this.showSpecs;
            this.specsIndex = 0;
          },

          //监听圆点是否进入购物车
          listenInCart(){
            if (!this.receiveInCart) {
              this.receiveInCart = true;
              this.$refs.cartContainer.addEventListener('animationend', () => {
                this.receiveInCart = false;
              })
              this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
                this.receiveInCart = false;
              })
            }
          },

          //隐藏动画
          hideLoading(){
            this.showLoading = false;
          },

          //控制购物列表是否显示
          toggleCartList(){
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
          },
          //清除购物车
          clearCart(){
            this.toggleCartList();
            this.CLEAR_CART(this.shopId);
          },
          //控制购物列表是否显示
          toggleCartList(){
            this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
          },
          //清除购物车
          clearCart(){
            this.toggleCartList();
            this.CLEAR_CART(this.shopId);
          }
        },
      watch: {
        shopCart: function (value){
          this.initCategoryNum();
        },
        //购物车列表发生变化，没有商铺时，隐藏
        cartFoodList: function (value){
          if(!value.length){
            this.showCartList = false;
          }
        },
      }


    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';

	.rating_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 12;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
    .header_img{
        position: relative;
        .food_img{
            width: 100%;
            display: block;
        }
        .cover{
            position: absolute;
            @include wh(100%, 100%);
            top: 0;
            left: 0;
        }
    }
    .description{
        @include sc(.6rem, #666);
        margin-top: .5rem;
        line-height: .8rem;
        bottom: .2rem;
        padding: 0 .4rem;
    }
    .detail_container{
        padding: .5rem;
        @include fj;
        align-items: center;
        .detail_left{
            p:nth-of-type(1){
                @include sc(.7rem, #333);
                margin-bottom: .2rem;
            }
            .rating_sale{
                display: flex;
                align-items: center;
                span:nth-of-type(1){
                   @include sc(.6rem, #666);
                   margin-right: .2rem;
                }
                span:nth-of-type(2){
                    @include sc(.55rem, #f60);
                    margin-left: .2rem;
                }
                span:nth-of-type(3){
                   @include sc(.6rem, #666);
                    margin-left: .4rem;
                }
            }
            p:nth-of-type(2){
                font-size: 0;
                margin-top: .3rem;
                span:nth-of-type(1){
                    @include sc(.6rem, #666);
                    margin-right: .4rem;
                }
                span:nth-of-type(2),span:nth-of-type(3){
                    @include sc(.6rem, #f60);
                    margin-right: .2rem;
                }
            }
            p:nth-of-type(3){
                span{
                    @include sc(.6rem, #666);
                }
            }
        }
    }
    .buy_cart_container{
      position: absolute;
      background-color: #3d3d3f;
      bottom: 0;
      left: 0;
      z-index: 13;
      display: flex;
      @include wh(100%, 2rem);
      .cart_icon_num{
        flex: 1;
        .cart_icon_container{
          display: flex;
          background-color: #3d3d3f;
          position: absolute;
          padding: .4rem;
          border: 0.18rem solid #444;
          border-radius: 50%;
          left: .5rem;
          top: -.7rem;
          .cart_icon{
            @include wh(1.2rem, 1.2rem);
          }
          .cart_list_length{
            position: absolute;
            top: -.25rem;
            right: -.25rem;
            background-color: #ff461d;
            line-height: .7rem;
            text-align: center;
            border-radius: 50%;
            border: 0.025rem solid #ff461d;
            min-width: .7rem;
            height: .7rem;
            @include sc(.5rem, #fff);
            font-family: Helvetica Neue,Tahoma,Arial;
          }
        }
        .move_in_cart{
          animation: mymove .5s ease-in-out;
        }
        .cart_icon_activity{
          background-color: #3190e8;
        }
        .cart_num{
          @include ct;
          left: 3.5rem;

          div{
            color: #fff;
          }
          div:nth-of-type(1){
            font-size: .8rem;
            font-weight: bold;
            margin-bottom: .1rem;
          }
          div:nth-of-type(2){
            font-size: .4rem;
          }
        }
      }
      .gotopay{
        position: absolute;
        right: 0;
        background-color: #535356;
        @include wh(5rem, 100%);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .gotopay_button_style{
          @include sc(.7rem, #fff);
          font-weight: bold;
        }
        .addto_cart_button_style{
          @include sc(.7rem, #fff);
          font-weight: bold;
        }
      }
      .gotopay_acitvity{
        background-color: #4cd964;
      }
      .cart_acitvity{
        background-color: #ff461d;
      }
    }

    .cart_food_list{
      position: fixed;
      width: 100%;
      padding-bottom: 2rem;
      z-index: 12;
      bottom: 0;
      left: 0;
      background-color: #fff;
      header{
        @include fj;
        align-items: center;
        padding: .3rem .6rem;
        background-color: #eceff1;
        svg{
          @include wh(.6rem,.6rem);
          vertical-align: middle;
        }
        h4{
          @include sc(.7rem, #666);
        }
        .clear_cart{
          @include sc(.6rem, #666);
        }
      }
      .cart_food_details{
        background-color: #fff;
        max-height: 20rem;
        overflow-y: auto;
        .cart_food_li{
          @include fj;
          padding: .6rem .5rem;
          .cart_list_num{
            width: 55%;
            p:nth-of-type(1){
              @include sc(.7rem, #666);
              font-weight: bold;
            }
            p:nth-of-type(2){
              @include sc(.4rem, #666);
            }
          }
          .cart_list_price{
            font-size: 0;
            span:nth-of-type(1){
              @include sc(.6rem, #f60);
              font-family: Helvetica Neue,Tahoma;

            }
            span:nth-of-type(2){
              @include sc(.7rem, #f60);
              font-family: Helvetica Neue,Tahoma;
              font-weight: bold;
            }
          }
          .cart_list_control{
            display: flex;
            align-items: center;
            span{
              display: flex;
              align-items: center;
              justify-content: center;
            }
            svg{
              @include wh(.9rem, .9rem);
              fill: #3190e8;
            }
            .specs_reduce_icon{
              fill: #999;
            }
            .cart_num{
              @include sc(.65rem, #666);
              min-width: 1rem;
              text-align: center;
              font-family: Helvetica Neue,Tahoma;
            }
          }
        }
      }
    }


    .screen_cover{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,.3);
      z-index: 11;
    }

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
    .fade-choose-enter-active, .fade-choose-leave-active {
      transition: opacity .5s;
    }
    .fade-choose-leave, .fade-choose-leave-active {
      display: none;
    }
    .fade-choose-enter, .fade-choose-leave-active {
      opacity: 0;
    }
    .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
    }
    .toggle-cart-enter-active, .toggle-cart-leave-active {
      transition: all .3s ease-out;
    }
    .toggle-cart-enter, .toggle-cart-leave-active {
      transform: translateY(100%);
    }

</style>
