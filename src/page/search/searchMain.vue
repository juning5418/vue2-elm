<template>
  	<div class="paddingTop search_page">
        <head-top head-title="发现" goBack="true"></head-top>
        <!--<form class="search_form">-->
            <!--<input type="search" name="search" placeholder="名称" class="search_input" v-model="searchValue" @input="checkInput">-->
            <!--<input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">-->
        <!--</form>-->
        <!--<section v-if="restaurantList.length">-->
            <!--<h4 class="title_restaurant">商品列表</h4>-->
            <!--<ul class="list_container">-->
                <!--<router-link :to="{path:'/shop', query:{id:item.id}}" tag="li" v-for="item in restaurantList" :key="item.id" class="list_li">-->
                    <!--<section class="item_left">-->
                        <!--<img :src="imgBaseUrl + item.image_path" class="restaurant_img">-->
                    <!--</section>-->
                    <!--<section class="item_right">-->
                        <!--<div class="item_right_text">-->
                            <!--<p>-->
                                <!--<span>{{item.name}}</span>-->
                                <!--<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">-->
                                    <!--<polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />-->
                                    <!--<line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>-->
                                    <!--<text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>-->
                                <!--</svg>-->
                            <!--</p>-->
                            <!--&lt;!&ndash;<p>月售 {{item.month_sales||item.recent_order_num}} 单</p>&ndash;&gt;-->
                            <!--&lt;!&ndash;<p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>&ndash;&gt;-->
                        <!--</div>-->
                        <!--<ul class="item_right_detail">-->
                            <!--<li v-for="activities in item.restaurant_activity" :key="activities.id">-->
                                <!--<span :style="{backgroundColor: '#' + activities.icon_color}" class="activities_icon">{{activities.icon_name}}</span>-->
                                <!--<span>{{activities.name}}</span>-->
                                <!--&lt;!&ndash;<span class="only_phone">(手机客户端专享)</span>&ndash;&gt;-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</section>-->
                <!--</router-link>-->
            <!--</ul>-->
        <!--</section>-->
        <!--<section class="search_history" v-if="searchHistory.length&&showHistory">-->
            <!--<h4 class="title_restaurant">搜索历史</h4>-->
            <!--<ul>-->
                <!--<li v-for="(item, index) in searchHistory" :key="index" class="history_list">-->
                    <!--<span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>-->
                    <!--<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">-->
                        <!--<line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />-->
                        <!--<line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />-->
                    <!--</svg>-->
                <!--</li>-->
            <!--</ul>-->
            <!--<footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>-->
        <!--</section>-->
        <!--<div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>-->


        <section class="menu_container" v-if="true">
          <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
            <ul>
              <li v-for="(item,index) in menuList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                <span>{{item.name}}</span>
                <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
              </li>
            </ul>
          </section>
          <section class="menu_right" ref="menuFoodList">
            <ul>
              <li v-for="(item,index) in menuList" :key="index">
                <!--<header class="menu_detail_header">-->
                  <!--<section class="menu_detail_header_left">-->
                    <!--<strong class="menu_item_title">{{item.name}}</strong>-->
                    <!--<span class="menu_item_description">{{item.description}}</span>-->
                  <!--</section>-->
                  <!--<span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>-->
                  <!--<p class="description_tip" v-if="index == TitleDetailIndex">-->
                    <!--<span>{{item.name}}</span>-->
                    <!--{{item.description}}-->
                  <!--</p>-->
                <!--</header>-->

                <section v-for="(foods,foodindex) in item.foods" :key="foodindex" v-if="menuIndex==index" class="menu_detail_list">

                    <router-link :to="{path: '/itemDetail', query:{shopId:1,geohash,price:foods.specfoods[0].price,item_id:foods.item_id,image_path:foods.image_path,
                     description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count,
                     satisfy_rate: foods.satisfy_rate, goods: foods}}"  tag='div' class="menu_detail_link">

                    <section class="menu_food_img">
                      <img :src="imgBaseUrl + foods.image_path">
                    </section>
                    <section class="menu_food_description">
                      <h3 class="food_description_head">
                        <strong class="description_foodname">{{foods.name}}</strong>

                      </h3>
                      <p class="food_description_content">{{foods.description}}</p>
                      <p class="food_description_sale_rating">
                      </p>
                      <p v-if="foods.activity" class="food_activity">
                        <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                      </p>
                    </section>
                  </router-link>
                </section>

              </li>
            </ul>
          </section>
        </section>


        <foot-guide></foot-guide>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footGuide'
import {searchRestaurant,foodMenu} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {getStore, setStore} from '../../config/mUtils'
import {loadMore, getImgPath} from 'src/components/common/mixin'

export default {
	data(){
        return {
            geohash: '', // msite页面传递过来的地址信息
            searchValue: '', // 搜索内容
            restaurantList: [], // 搜索返回的结果
            imgBaseUrl, // 图片域名地址
            searchHistory: [], // 搜索历史记录
            showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
            emptyResult: false, // 搜索结果为空时显示,
            shopId:1,
            menuList:[],
            categoryNum: [], //商品类型右上角已加入购物车的数量
            menuIndex: 0, //已选菜单索引值，默认为0
            menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
          TitleDetailIndex: null, //点击展示列表头部详情

        }
    },
    created(){

    },
    mounted(){
        this.geohash = this.$route.params.geohash;
        //获取搜索历史记录
        if (getStore('searchHistory')) {
            this.searchHistory = JSON.parse(getStore('searchHistory'));
        }
        this.initData();
    },

  mixins: [loadMore, getImgPath],

  components:{
        headTop,
        footGuide,
    },
    methods:{


        //初始化时获取基本数据
        async initData(){

          //获取列表
          this.menuList = await foodMenu(this.shopId);

        },

        //点击提交按钮，搜索结果并显示，同时将搜索内容存入历史记录
        async searchTarget(historyValue){
            if (historyValue) {
                this.searchValue = historyValue;
            }else if (!this.searchValue) {
                return
            }
            //隐藏历史记录
            this.showHistory = false;
            //获取搜索结果
            this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
            this.emptyResult = !this.restaurantList.length;
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            let history = getStore('searchHistory');
            if (history) {
                let checkrepeat = false;
                this.searchHistory = JSON.parse(history);
                this.searchHistory.forEach(item => {
                    if (item == this.searchValue) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    this.searchHistory.push(this.searchValue)
                }
            }else {
                this.searchHistory.push(this.searchValue)
            }
            setStore('searchHistory',this.searchHistory)
        },
        //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
        checkInput(){
            if (this.searchValue === '') {
                this.showHistory = true; //显示历史记录
                this.restaurantList = []; //清空搜索结果
                this.emptyResult = false; //隐藏搜索为空提示
            }
        },
        //点击删除按钮，删除当前历史记录
        deleteHistory(index){
            this.searchHistory.splice(index, 1);
            setStore('searchHistory',this.searchHistory);
        },
        //清除所有历史记录
        clearAllHistory(){
            this.searchHistory = [];
            setStore('searchHistory',this.searchHistory);
        },


        //当滑动列表时，监听其scrollTop值来设置对应的食品列表标题的样式
        listenScroll(element){
          this.foodScroll = new BScroll(element, {
            probeType: 3,
            deceleration: 0.001,
            bounce: false,
            swipeTime: 2000,
            click: true,
          });

          const wrapperMenu = new BScroll('#wrapper_menu', {
            click: true,
          });

          const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight;
          this.foodScroll.on('scroll', (pos) => {
            if (!this.$refs.wrapperMenu) {
              return
            }
            this.shopListTop.forEach((item, index) => {
              if (this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item) {
                this.menuIndex = index;
                const menuList=this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
                const el = menuList[0];
                wrapperMenu.scrollToElement(el, 800, 0, -(wrapMenuHeight/2 - 50));
              }
            })
          })
        },

      //点击左侧食品列表标题，相应列表移动到最顶层
      chooseMenu(index){
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        // this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
        // this.foodScroll.on('scrollEnd', () => {
        //   this.menuIndexChange = true;
        // })
      },

    }
}

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
        background-color: #fff;
        padding: 0.5rem;
        display: flex;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            border: 0.025rem solid $bc;
            @include sc(0.65rem, #333);
            border-radius: 0.125rem;
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 0 0.25rem;
        }
        .search_submit{
            flex: 1;
            border: 0.025rem solid $blue;
            margin-left: .2rem;
            @include sc(0.65rem, #fff);
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            padding: 0 0.25rem;
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        line-height: 2rem;
        text-indent: 0.5rem;
        font-weight: bold;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: 'center';
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        font-size: .5rem;
                        vertical-align: middle;
                        display: inline-block;
                        margin-bottom: 0.2rem;
                    }
                    .activities_icon{
                        @include sc(.5rem, #fff);
                        font-weight: bold;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        margin-right: 0.125rem;
                    }
                    .only_phone{
                        color: #FF6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_list{
            background-color: #fff;
            border-bottom: 0.025rem solid $bc;
            @include font(0.7rem, 2rem);
            padding: 0 0.3rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .history_text{
                display: inline-block;
                width: 80%;
            }
            .delete_icon{
                @include wh(1rem, 1rem);
            }
        }
        .clear_history{
            background-color: #fff;
            color: $blue;
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
        }
    }
    .search_none{
        margin: 0 auto;
        @include font(0.65rem, 1.75rem);
        color: #333;
        background-color: #fff;
        text-align: center;
        margin-top: 0.125rem;
    }

    .menu_container{
      display: flex;
      flex: 1;
      overflow-y: hidden;
      position: relative;
      .menu_left{
        width: 3.8rem;
        .menu_left_li{
          padding: .7rem .3rem;
          border-bottom: 0.025rem solid #ededed;
          box-sizing: border-box;
          border-left: 0.15rem solid #f8f8f8;
          position: relative;
          img{
            @include wh(.5rem, .6rem);
          }
          span{
            @include sc(.6rem, #666);
          }
          .category_num{
            position: absolute;
            top: .1rem;
            right: .1rem;
            background-color: #ff461d;
            line-height: .6rem;
            text-align: center;
            border-radius: 50%;
            border: 0.025rem solid #ff461d;
            min-width: .6rem;
            height: .6rem;
            @include sc(.5rem, #fff);
            font-family: Helvetica Neue,Tahoma,Arial;
          }
        }
        .activity_menu{
          border-left: 0.15rem solid #3190e8;
          background-color: #fff;
          span:nth-of-type(1){
            font-weight: bold;
          }
        }
      }
      .menu_right{
        flex: 4;
        overflow-y: auto;
        .menu_detail_header{
          width: 100%;
          padding: .4rem;
          position: relative;
          @include fj;
          align-items: center;
          .menu_detail_header_left{
            width: 11rem;
            white-space: nowrap;
            overflow: hidden;
            .menu_item_title{
              @include sc(.7rem, #666);
              font-weight: bold;
            }
            .menu_item_description{
              @include sc(.5rem, #999);
              width: 30%;
              overflow: hidden;
            }
          }
          .menu_detail_header_right{
            @include wh(.5rem, 1rem);
            display: block;
            @include bis('../../images/icon_point.png');
            background-size: 100% .4rem;
            background-position: left center;
          }
          .description_tip{
            background-color: #39373a;
            opacity: 0.95;
            @include sc(.5rem, #fff);
            position: absolute;
            top: 1.5rem;
            z-index: 14;
            width: 8rem;
            right: .2rem;
            padding: .5rem .4rem;
            border: 1px;
            border-radius: .2rem;
            span{
              color: #fff;
              line-height: .6rem;
              font-size: .55rem;
            }
          }
          .description_tip::after{
            content: '';
            position: absolute;
            @include wh(.4rem, .4rem);
            background-color: #39373a;
            top: -.5rem;
            right: .7rem;
            transform: rotate(-45deg) translateY(.41rem);
          }
        }
        .menu_detail_list{
          background-color: #fff;
          padding: .6rem .4rem;
          border-bottom: 1px solid #f8f8f8;
          position: relative;
          overflow: hidden;
          .menu_detail_link{
            display:flex;
            .menu_food_img{
              margin-right: .4rem;
              img{
                @include wh(2rem, 2rem);
                display: block;
              }
            }
            .menu_food_description{
              width: 100%;
              .food_description_head{
                @include fj;
                margin-bottom: .2rem;
                .description_foodname{
                  @include sc(.7rem, #333);
                }
                .attributes_ul{
                  display: flex;
                  li{
                    font-size: .3rem;
                    height: .6rem;
                    line-height: .35rem;
                    padding: .1rem;
                    border: 1px solid #666;
                    border-radius: 0.3rem;
                    margin-right: .1rem;
                    transform: scale(.8);
                    p{
                      white-space: nowrap;
                    }
                  }
                  .attribute_new{
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: #4cd964;
                    @include wh(2rem, 2rem);
                    display: flex;
                    align-items: flex-end;
                    transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                    border: none;
                    border-radius: 0;
                    p{
                      @include sc(.4rem, #fff);
                      text-align: center;
                      flex: 1;
                    }
                  }
                }
              }
              .food_description_content{
                @include sc(.5rem, #999);
                line-height: .6rem;
              }
              .food_description_sale_rating{
                line-height: .8rem;
                span{
                  @include sc(.5rem, #333);
                }
              }
              .food_activity{
                line-height: .4rem;
                span{
                  font-size: .3rem;
                  border: 1px solid currentColor;
                  border-radius: 0.3rem;
                  padding: .08rem;
                  display: inline-block;
                  transform: scale(.8);
                  margin-left: -0.35rem;

                }
              }
            }
          }
          .menu_detail_footer{
            margin-left: 2.4rem;
            font-size: 0;
            margin-top: .3rem;
            @include fj;
            .food_price{
              span{
                font-family: 'Helvetica Neue',Tahoma,Arial;
              }
              span:nth-of-type(1){
                @include sc(.5rem, #f60);
                margin-right: .05rem;
              }
              span:nth-of-type(2){
                @include sc(.7rem, #f60);
                font-weight: bold;
                margin-right: .3rem;
              }
              span:nth-of-type(3){
                @include sc(.5rem, #666);
              }
            }
          }
        }
      }
    }
</style>
