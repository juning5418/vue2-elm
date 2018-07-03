<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>


    <div class="rating_page">
      <head-top head-title="搜索地址" go-back='true'></head-top>
      <section>
        <div class="add-detail">
          <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress">
          <input type="button" class="btn" @click="inputThing" value="确认">
        </div>
      </section>
      <section class="poisearch-container" v-show="adressList">
        <ul>
          <li v-for="(item, index) in adressList" @click="listClick(index)">
            <p>{{item.name}}</p>
            <p>{{item.address}}</p>
          </li>
        </ul>
      </section>
    </div>



  </div>
</template>


<script>
  import {mapMutations, mapState,mapActions} from 'vuex'
  import {searchNearby} from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {getImgPath} from 'src/components/common/mixin'

  export default {
    data() {
      return{
        warning:true,
        inputAdress:'',
        adressList:[],			//地址列表
      }
    },

    created(){
      this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress

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

      // this.initData();

    },


    components: {
      headTop,
      left,
      right


    },
    mixins: [getImgPath],
    computed:{
      ...mapState([
        'addAddress'
      ]),
    },
    methods: {

      ...mapMutations([
        'SAVE_ADDDETAIL'
      ]),
      //搜索地址
      inputThing(){
        searchNearby(this.inputAdress).then(res => {
          this.adressList=res;
          this.warning=true;
          if(this.adressList.length > 0){
            this.warning=false;
            if(this.inputAdress == ''){
              this.adressList=[];
              this.warning=true;
            }
          }
        });
      },
      //选择地址
      listClick(index){
        this.SAVE_ADDDETAIL(this.adressList[index].name);
        this.$router.push("addAddressProfile");
        // this.$router.go(-1);
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

