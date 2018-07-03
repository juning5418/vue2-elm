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
                <span class="theme-secondary-color">设置</span> 头像
              </div>
            </div>
          </div>

          <form>
            <div class="row">
              <div class="col s12 m12 l12 center ">
                <div class="sphoto-text">头像(直接保存)</div>
                <div class="setting-photo">
                  <img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" alt="avatar" >
                </div>
              </div>
            </div>
            <div class="row">
              <div class="file-field input-field col s12 m12 l12">
                <div class="btn">
                  <span>上传头像</span>
                  <input type="file" multiple id="profileinfopanel-upload" @change="uploadAvatar">
                </div>
              </div>
            </div>
          </form>
            <!--<div class="row">-->
              <!--<div class="input-field col s12 m12 l12 ">-->
                <!--<input  id="user-email" type="email" class="validate">-->
                <!--<label for="user-email">邮箱</label>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="row">-->
              <!--<div class="input-field col s12 m12 l12 ">-->
                <!--<input  id="user-phone" type="tel" class="validate">-->
                <!--<label for="user-phone">手机</label>-->
              <!--</div>-->
            <!--</div>-->

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
  import {signout} from 'src/service/getData'
  import {getImgPath} from 'src/components/common/mixin'
  import {imgBaseUrl} from 'src/config/env'
  import {removeStore} from 'src/config/mUtils'

  export default {
    data() {
      return{
        infotel:'',     //用户手机
        avatar:'',      //用户头像
        show:false,     //显示提示框
        isEnter:true,  //是否登录
        isLeave:false, //是否退出
        showAlert: false,
        alertText: null,
        imgBaseUrl,
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
    methods: {
      ...mapMutations([
        'OUT_LOGIN', 'SAVE_AVANDER'
      ]),

      async uploadAvatar(){
        //上传头像
        if (this.userInfo) {
          let input = document.querySelector('#profileinfopanel-upload')
          let data = new FormData();
          data.append('file', input.files[0]);
          try{
            let response = await fetch('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
              method: 'POST',
              credentials: 'include',
              body: data
            })
            let res = await response.json();
            if (res.status == 1) {
              this.userInfo.avatar = res.image_path;
            }
          }catch (error) {
            this.showAlert = true;
            this.alertText = '上传失败';
            throw new Error(error);
          }
        }
      }

    },
    watch: {
      userInfo: function (value) {
        if (value && value.user_id) {
          this.infotel = value.mobile;
          this.avatar = value.avatar;
        }
      }
    }


  }
</script>



