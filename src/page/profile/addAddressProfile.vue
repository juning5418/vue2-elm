<template>

  <div>
    <head-top signin-up='msite'>

    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <div class="rating_page">
      <head-top head-title="新增地址" go-back='true'></head-top>


        <form action="" v-on:submit.prevent>

        <!--<form class="col s12">-->
          <!--<div class="row">-->
            <!--<div class="input-field col s12 m12">-->
              <!--<input id="message" type="text"  v-model="message" class="validate" >-->
              <!--<label for="message">请填写你的姓名</label>-->
            <!--</div>-->
          <!--</div>-->

          <!--<router-link to='/addAddressDetail' class="add-detail">-->
            <!--<div class="col s12 m12">-->
              <!--<input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress" />-->
            <!--</div>-->
          <!--</router-link>-->


          <!--<div class="row">-->
            <!--<div class="input-field col s12 m12">-->
              <!--<input id="sendaddress" type="text"  v-model="sendaddress" class="validate" >-->
              <!--<label for="sendaddress">请填写详细送餐地址</label>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="row">-->
            <!--<div class="input-field col s12 m12">-->
              <!--<input id="telephone" type="text"  v-model="telephone" class="validate" >-->
              <!--<label for="telephone">请填写能够联系到您的手机号</label>-->
            <!--</div>-->
          <!--</div>-->

          <!--<button class="btn" @click="submitThing" value="新增地址"></button>-->




          <section class="ui-padding-block">
            <div class="input-new">
              <input type="text" placeholder="请填写你的姓名" :class="{verifies:verify}" v-model="message" @input="inputThing">
              <p v-if="verify">请填写您的姓名</p>
            </div>
            <router-link to='/addAddressDetail' class="add-detail">
              <div class="input-new">
                <input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress" />
              </div>
            </router-link>
            <div class="input-new">
              <input type="text" placeholder="请填写详细送餐地址" :class="{verifies:verifythree}" @input="inputThingthree" v-model="mesthree"/>
              <p v-if="verifythree">{{sendaddress}}</p>
            </div>
            <div class="input-new">
              <input type="text" placeholder="请填写能够联系到您的手机号" :class="{verifies:verifyfour}" v-model="telenum" @input="inputThingfour" />
              <p v-if="verifyfour">{{telephone}}</p>
            </div>
            <div class="input-new">
              <input type="text" placeholder="备用联系电话（选填）" v-model="standbytelenum" @input="inputThingfive" />
              <p v-if="verifyfive">{{standbytele}}</p>
            </div>
          </section>
          <section>
            <button :class="{butopacity:butpart}" @click.prevent="submitThing">新增地址</button>
          </section>
        </form>

    </div>

  </div>
</template>


<script>
  import {mapMutations, mapState} from 'vuex'
  import headTop from 'src/components/header/head'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {getImgPath} from 'src/components/common/mixin'
  import {postAddAddress} from 'src/service/getData'

  export default {
    data() {
      return{
        verify:false,			//姓名
        verifytwo:false,		//备注
        verifythree:false,		//地址
        verifyfour:false,		//电话
        verifyfive:false,		//备用电话
        butpart:false,			//新增地址按钮的透明度
        sendaddress:'',  //地址
        message:'', //信息
        mesthree:'', //送餐地址
        telenum:'', //手机号
        telephone:'', //手机号提示
        standbytele:'', //备用手机号提示
        standbytelenum:'', //备用手机号
        addSearch:false, //添加搜索地址
        showAlert: false, //弹出框
        alertText: null, //弹出信息
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
    },

    mixins: [getImgPath],

    components: {
      headTop,
      left,
      right
    },
    computed:{
      ...mapState([
        'userInfo', 'addAddress','removeAddress','newAddress', 'geohash'
      ]),
    },
    props:[],

    methods: {
      ...mapMutations([
        'ADD_ADDRESS'
      ]),
      inputThing(){
        (!this.message) ? this.verify=true : this.verify=false;
        this.bindThing()
      },
      //输入地址
      inputThingthree(){
        this.verifythree=true;
        if(this.mesthree.length == 0){
          this.sendaddress='请详细填写送餐地址';

        }else if(this.mesthree.length > 0 && this.mesthree.length <= 2){
          this.sendaddress='送餐地址太短了，不能辨识';
        }else{
          this.sendaddress='';
          this.verifythree=false;
        }
        this.bindThing()
      },
      //输入手机号
      inputThingfour(){
        this.verifyfour=true;
        if((/^[1][358][0-9]{9}$/).test(this.telenum)){
          this.verifyfour=false;
        }else if(this.telenum == ''){
          this.telephone="手机号不能为空"
        }else{
          this.telephone="请输入正确的手机号"
        }
        this.bindThing()
      },
      //输入备注手机号
      inputThingfive(){
        this.verifyfive=true;
        if((/^[1][358][0-9]{9}$/).test(this.standbytelenum) || this.standbytelenum == ''){
          this.verifyfive=false;
        }else{
          this.standbytele="请输入正确的手机号"
        }
        this.bindThing();
      },
      bindThing(){
        if(this.message && this.mesthree && !this.verifyfour){
          this.butpart=true;
        }else{
          this.butpart=false;
        }
      },
      //保存地址
      async submitThing(){
        let res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
        if (res.message) {
          this.showAlert = true;
          this.alertText = res.message;
        }else if(this.butpart){
          //保存的地址存入vuex
          this.ADD_ADDRESS({
            name: this.message,
            address: this.mesthree,
            address_detail: this.addAddress,
            geohash: 'wtw37r7cxep4',
            phone: this.telenum,
            phone_bk: this.standbytelenum,
            poi: this.addAddress,
            poi_type: 0,
          });
          this.$router.go(-1);
        }
      }

    },
    watch: {

    }


  }
</script>

<style>

  form .file-field.input-field .btn {
    padding: 0px 20px;
    line-height: normal;
    height: auto;
    -webkit-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    -moz-box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  }
</style>

