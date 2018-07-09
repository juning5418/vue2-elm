<template>

  <div>
    <head-top signin-up='msite'>


    </head-top>

    <nav>
      <left></left>
      <right></right>
    </nav>



    <foot-guide></foot-guide>
  </div>
</template>


<script>


  import {mapState,mapMutations} from 'vuex'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/foot'
  import left from 'src/components/common/left'
  import right from 'src/components/common/right'
  import {imgBaseUrl} from 'src/config/env'

  export default {
    data() {
      return{
        imgBaseUrl
      }
    },


    mounted() {
      this.shopId =1;
      this.initData();

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


    computed: {

    },
    methods: {
      ...mapMutations([
      ]),



      async initData() {
      }

    },
    watch: {

    }


  }
</script>


<style>



</style>
