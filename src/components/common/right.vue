<template>

  <ul id="nav-mobile-account" class="side-nav">
    <li class="profile">
      <div class="li-profile-info">

        <img :src="imgBaseUrl + userInfo.avatar" alt="profile" v-if="userInfo&&userInfo.user_id">
        <div href="#/login" v-else><img src="../../images/red/profile.jpg"  alt="profile" ></div>
        <h2>{{username}}</h2>
        <!--<div class="emailprofile">{{mobile}}</div>-->

      </div>
      <div class="bg-profile-li" style="background-image: url(../../static/img/bg-profile.jpg);">
      </div>
    </li>
    <li>
      <a class="waves-effect waves-blue" href="/msite"><i class="fas fa-home"></i>首页</a>
    </li>
    <li>
      <a href="wish-list.html"><i class="fas fa-heart"></i>我的收藏</a>
    </li>


    <li>
      <ul class="collapsible collapsible-accordion">
        <li>
          <div class="collapsible-header">
            <i class="fas fa-cog"></i>设置 <span><i class="fas fa-caret-down"></i></span>
          </div>
          <div class="collapsible-body">
            <ul>
              <li>
                <a class="waves-effect waves-blue" href="#/headProfile"><i class="fas fa-angle-right"></i>头像设置</a>
              </li>
              <li>
                <a class="waves-effect waves-blue" href="#/passwordProfile"><i class="fas fa-angle-right"></i>修改密码</a>
              </li>
              <li>
                <a class="waves-effect waves-blue" href="#/addressProfile"><i class="fas fa-angle-right"></i>地址维护</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </li>
    <li>
      <a href="contact.html"><i class="fas fa-envelope"></i>联系我们</a>
    </li>

    <li v-if="userInfo&&userInfo.user_id" >
      <a href="#" @click="outLogin"><i class="fas fa-sign-out-alt"></i>离开</a>
    </li>
    <li v-else >
      <a href="#/login"><i class="fas fa-sign-in-alt"></i>登入</a>
    </li>

  </ul>

</template>

<script>

import {mapState,mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {signout} from 'src/service/getData'
import {removeStore} from 'src/config/mUtils'

export default {



	data(){
		return {
      backimage:'url(' + require('../../images/red/bg-profile.jpg') + ')',
      profiletitle: '我的',
      username: '',           //用户名
      resetname: '',
      mobile: '暂无绑定手机号',             //电话号码
      balance: 0,            //我的余额
      count : 0,             //优惠券个数
      pointNumber : 0,       //积分数
      avatar: '',             //头像地址
      imgBaseUrl,
    }
	},
	mounted(){

    this.initData();


  },
	components: {

	},
	props: [],
	mixins: [],
	computed: {
		...mapState([
      'userInfo'
		]),
	},
	updated(){
	},
	methods: {
    ...mapMutations([
      'OUT_LOGIN'
    ]),

    //退出登录
    async outLogin(){
      this.OUT_LOGIN();
      this.$router.go(-1);
      removeStore('user_id')
      await signout();
    },

    initData(){
      if (this.userInfo && this.userInfo.user_id) {
        this.avatar = this.userInfo.avatar;
        this.username = this.userInfo.username;
        this.mobile = this.userInfo.mobile || '暂无绑定手机号';
        this.balance = this.userInfo.balance;
        this.count = this.userInfo.gift_amount;
        this.pointNumber = this.userInfo.point;
      }else{
        this.username = '';
        this.mobile = '暂无绑定手机号';
      }
    }

	},
	watch: {
    userInfo: function (value){
      this.initData()
    }
	}
}
</script>




