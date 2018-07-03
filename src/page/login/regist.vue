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
      <div class="login-form">
        <div class="container">
          <div class="row">
            <div class="col s12">
              <div class="section-title">
                <span class="theme-secondary-color">注册</span>
              </div>
            </div>
          </div>
          <div class="row">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12 m12">
                  <input id="username" type="text"  v-model.lazy="userAccount" class="validate" >
                  <label for="username">用户名</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12 m12  ">
                  <input id="password" type="password" v-model="passWord" class="validate">
                  <label for="password">密码</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12 m12  ">
                  <input id="repassword" type="password" v-model="repassWord" class="validate">
                  <label for="repassword">确认密码</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s8 m8 l8 ">
                  <label for="codeNumber">验证码</label>
                  <input id="codeNumber" type="text"  maxlength="4" v-model="codeNumber">
                </div>
                <div class="input-field col s4 m4 l4 ">
                  <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg" @click="getCaptchaCode">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12 m12 l12  center">
                  <input class="waves-effect waves-light btn" value="注册" type="submit" @click="mobileLogin"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <foot-guide></foot-guide>

  </div>

</template>

<script>
    import headTop from 'src/components/header/head'
    import footGuide from 'src/components/footer/foot'
    import left from 'src/components/common/left'
    import right from 'src/components/common/right'
    // import alertTip from 'src/components/common/alertTip'
    import {localapi, proapi, imgBaseUrl} from 'src/config/env'
    import {mapState, mapMutations} from 'vuex'
    import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from 'src/service/getData'

    export default {
        data(){
            return {
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: null, //电话号码
                mobileCode: null, //短信验证码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                repassWord:null,
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        created(){
            this.getCaptchaCode();
        },

        mounted(){
          $(document).ready(function(){
            $('.carousel').carousel();
          });

          $('.collapsible').collapsible();

          $(document).ready(function() {
            Materialize.updateTextFields();
          });

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
            //判断手机号码
            rightPhoneNumber: function (){
                return /^1\d{10}$/gi.test(this.phoneNumber)
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
            ]),
            //改变登录方式
            changeLoginWay(){
                this.loginWay = !this.loginWay;
            },
            //是否显示密码
            changePassWordType(){
                this.showPassword = !this.showPassword;
            },
            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode(){
                let res = await getcaptchas();
                this.captchaCodeImg = res.code;
            },
            //获取短信验证码
            async getVerifyCode(){
                if (this.rightPhoneNumber) {
                    this.computedTime = 30;
                    this.timer = setInterval(() => {
                        this.computedTime --;
                        if (this.computedTime == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000)
                    //判读用户是否存在
                    let exsis = await checkExsis(this.phoneNumber, 'mobile');
                    if (exsis.message) {
                        this.showAlert = true;
                        this.alertText = exsis.message;
                        return
                    }else if(!exsis.is_exists) {
                        this.showAlert = true;
                        this.alertText = '您输入的手机号尚未绑定';
                        return
                    }
                    //发送短信验证码
                    let res = await mobileCode(this.phoneNumber);
                    if (res.message) {
                        this.showAlert = true;
                        this.alertText = res.message;
                        return
                    }
                    this.validate_token = res.validate_token;
                }
            },
            //发送登录信息
            async mobileLogin(){

                // if (this.loginWay) {
                //     if (!this.rightPhoneNumber) {
                //         this.showAlert = true;
                //         this.alertText = '手机号码不正确';
                //         return
                //     }else if(!(/^\d{6}$/gi.test(this.mobileCode))){
                //         this.showAlert = true;
                //         this.alertText = '短信验证码不正确';
                //         return
                //     }
                //     //手机号登录
                //     this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
                // }else{

                if (!this.userAccount) {
                    Materialize.toast('请输入手机号/邮箱/用户', 4000) // 4000 is the duration of the toast
                    return
                }else if(!this.passWord){
                    Materialize.toast('请输入密码', 4000) // 4000 is the duration of the toast
                    return
                }else if(!this.codeNumber){
                    Materialize.toast('请输入验证码', 4000) // 4000 is the duration of the toast
                    return
                }else if(this.passWord!=this.repassWord){
                  Materialize.toast('两次密码不一致', 4000) // 4000 is the duration of the toast
                  return
                }
                //用户名登录
                this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber,2);
                // }
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                    // this.showAlert = true;
                    Materialize.toast(this.userInfo.message, 4000) // 4000 is the duration of the toast

                    if (!this.loginWay) this.getCaptchaCode();
                }else{
                    this.RECORD_USERINFO(this.userInfo);
                    // this.$router.push({name: 'msite'});
                    this.$router.go(-1);

                }
            },
            closeTip(){
                this.showAlert = false;
            }
        }
    }


</script>

<style>
  .login-form .sign-in-sosmed .sign-in-icon.sii-weixin {
    background-color: #439057; }
</style>
