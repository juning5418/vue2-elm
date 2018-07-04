<template>
    <!--<section id='foot_guide'>-->
      <!-- FOOTER  -->
      <footer id="footer">
        <div class="footer-info">
          <div class="container">
            <div class="col s12 center">
              <i class="fas fa-map-marker-alt"></i> 地址<br>
              <i class="fas fa-phone-square"></i> 电话 <br>
              <i class="fas fa-envelope"></i> 邮箱
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row row-footer-icon">
            <div class="col s12">
              <div class="footer-sosmed-icon ">
                <!--<div class="wrap-circle-sosmed ">-->
                  <!--<a href="#">-->
                    <!--<div class="circle-sosmed">-->
                      <!--<i class="fab fa-instagram"></i>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
                <!--<div class="wrap-circle-sosmed ">-->
                  <!--<a href="#">-->
                    <!--<div class="circle-sosmed">-->
                      <!--<i class="fab fa-linkedin-in"></i>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
                <!--<div class="wrap-circle-sosmed ">-->
                  <!--<a href="#">-->
                    <!--<div class="circle-sosmed">-->
                      <!--<i class="fab fa-twitter"></i>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
                <!--<div class="wrap-circle-sosmed ">-->
                  <!--<a href="#">-->
                    <!--<div class="circle-sosmed">-->
                      <!--<i class="fab fa-facebook-f"></i>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
              </div>
            </div>
          </div>
          <div class="row copyright">
            2018 <span>量心生活馆</span>, All rights reserved.
          </div>
        </div>
      </footer>
    <!--</section>-->
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{

            }
        },
        created(){

        },
        mounted(){
          /*=================== FOOTER ===================*/
          $('#page-content').css('min-height',$(document).height() - ($('#header').height() + $('#footer').height() )  );

        },
        computed: {
            ...mapState([

            ]),
        },
        methods: {

        },

    }

</script>



