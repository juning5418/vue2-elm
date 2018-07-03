<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <!--@click="editThing"-->
    <!--<section class="address">-->

    <div class="row">
      <div class="col s12">
        <div class="cart-box">


          <div class="cart-item" v-for="(item,index) in removeAddress">
            <div  >
              <p>{{item.address}}</p>
              <p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
            </div>
            <div class="ci-price" >
              <span @click="deleteSite(index, item)">x</span>
            </div>
          </div>



          <div class="row">
            <div class="file-field input-field col s12 m12 l12">
              <router-link :to="{path:'addAddressProfile'}">
                <div class="btn">
                  <span>新增地址</span>
                </div>
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapMutations, mapState,mapActions} from 'vuex'

  import headTop from 'src/components/header/head'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {getImgPath} from 'src/components/common/mixin'
  import {imgBaseUrl} from 'src/config/env'
  import {getAddressList, deleteAddress} from 'src/service/getData'

  export default {
    data() {
      return{
        deletesite:false, //是否编辑状态
        editText:'编辑',
        adressList:[], //地址列表
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

      this.initData();

    },


    components: {
      headTop,
      left,
      right
    },
    mixins: [getImgPath],
    computed:{
      ...mapState([
        'userInfo', 'removeAddress'
      ]),
    },
    methods: {
      ...mapActions([
        'saveAddress'
      ]),
      //初始化信息
      initData(){
        if (this.userInfo && this.userInfo.user_id) {
          this.saveAddress();
        }
      },
      //编辑
      editThing(){
        if(this.editText == '编辑'){
          this.editText='完成';
          this.deletesite=true;
        }else{
          this.editText='编辑';
          this.deletesite=false;
        }
      },
      //删除地址
      async deleteSite(index, item){
        if (this.userInfo && this.userInfo.user_id) {
          await deleteAddress(this.userInfo.user_id, item.id);
          this.removeAddress.splice(index, 1);
        }
      }

    },
    watch: {
      userInfo: function (value) {
        if (value && value.user_id) {
          this.initData();
        }
      }
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

