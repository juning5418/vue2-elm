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
      <div class="setting-page">
        <div class="container">
          <div class="row ">
            <div class="col s12 m12 l12 ">
              <div class="section-title">
                <span class="theme-secondary-color">设置</span> 密码
              </div>
            </div>
          </div>


            <form class="restForm">
              <section class="input_container phone_number">
                <input type="text" placeholder="账号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone">
                <!-- <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button> -->
              </section>
              <section class="input_container">
                <input type="text" placeholder="旧密码" name="oldPassWord" v-model="oldPassWord">
              </section>
              <section class="input_container">
                <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
              </section>
              <section class="input_container">
                <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
              </section>
              <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
                <div class="img_change_img">
                  <img v-show="captchaCodeImg" :src="captchaCodeImg" @click="getCaptchaCode">

                </div>
              </section>
            </form>

        </div>

        <div class="btn" @click="resetButton">
          <span>确认修改</span>
        </div>

      </div>


    </div>


    <foot-guide></foot-guide>

  </div>
</template>


<script>
  import {mapMutations, mapState} from 'vuex'

  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/foot'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {getImgPath} from 'src/components/common/mixin'
  import {imgBaseUrl} from 'src/config/env'
  import {removeStore} from 'src/config/mUtils'
  import {mobileCode, checkExsis, sendMobile, getcaptchas, changePassword} from 'src/service/getData'

  export default {
    data() {
      return{
        phoneNumber: null, //电话号码
        oldPassWord: null,
        newPassWord: null, //新密码
        rightPhoneNumber: false, //输入的手机号码是否符合要求
        confirmPassWord: null, //确认密码
        captchaCodeImg: null, //验证码地址
        mobileCode: null, //短信验证码
        computedTime: 0, //倒数记时
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        accountType: 'mobile',//注册方式
        captchaCodeImg: null,
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


    components: {
      headTop,
      footGuide,
      left,
      right

    },
    mixins: [getImgPath],
    computed:{
      ...mapState([
        'userInfo', 'imgPath'
      ]),
    },

    created(){
      this.getCaptchaCode()
    },
    methods: {
      //判断输入的电话号码
      inputPhone(){
        if(/.+/gi.test(this.phoneNumber)){
          this.rightPhoneNumber = true;
        }else{
          this.rightPhoneNumber = false;
        }
      },
      //获取验证吗
      async getVerifyCode(){
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          //倒计时
          this.timer = setInterval(() => {
            this.computedTime --;
            if (this.computedTime == 0) {
              clearInterval(this.timer)
            }
          }, 1000)
          //判断用户是否存在
          let res = await checkExsis(this.phoneNumber, this.accountType);
          //判断返回的信息是否正确，用户是否注册
          if (res.message) {
            this.showAlert = true;
            this.alertText = res.message;
            return
          }else if(!res.is_exists) {
            this.showAlert = true;
            this.alertText = '您输入的手机号尚未绑定';
            return
          }
          //获取验证信息
          let getCode = await mobileCode(this.phoneNumber);
          if (getCode.message) {
            this.showAlert = true;
            this.alertText = getCode.message;
            return
          }
          this.validate_token = getCode.validate_token;
        }
      },
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },
      //重置密码
      async resetButton(){
        if (!this.phoneNumber) {
          Materialize.toast('请输入正确的账号', 4000) // 4000 is the duration of the toast

          return
        }else if(!this.oldPassWord){
          Materialize.toast('请输入旧密码', 4000) // 4000 is the duration of the toast

          return
        }else if(!this.newPassWord){
          Materialize.toast('请输入新密码', 4000) // 4000 is the duration of the toast

          return
        }else if(!this.confirmPassWord){
          Materialize.toast('请输确认密码', 4000) // 4000 is the duration of the toast

          return
        }else if(this.newPassWord !== this.confirmPassWord){
          Materialize.toast('两次输入的密码不一致', 4000) // 4000 is the duration of the toast

          return
        }else if(!this.mobileCode){
          Materialize.toast('请输验证码', 4000) // 4000 is the duration of the toast

          return
        }
        // 发送重置信息
        let res = await changePassword(this.phoneNumber, this.oldPassWord, this.newPassWord, this.confirmPassWord, this.mobileCode);
        if (res.message) {
          Materialize.toast(res.message, 4000) // 4000 is the duration of the toast
          this.getCaptchaCode()
          return
        }else{
          Materialize.toast('密码修改成功', 4000) // 4000 is the duration of the toast

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

