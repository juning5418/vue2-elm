<template>

  <ul id="nav-mobile-category" class="side-nav"  >

      <li class="sidenav-logo" >
        <i class="fa fa-leaf" aria-hidden="true"></i> 量心生活馆
      </li>

      <li >
        <div class="search-wrapper ">
          <input id="search"><i class="material-icons">search</i>
          <div class="search-results"></div>
        </div>
      </li>

      <li>
        <a href="#/productList"><i class="fas fa-plus"></i>全部商品</a>
      </li>

      <li v-for="menu in leftMenus">
        <a v-if="menu.menus.length==0" :href="menu.href"><i class="fas fa-plus"></i> {{menu.name}}</a>
        <ul v-else class="collapsible collapsible-accordion">
          <li>
            <div class="collapsible-header">
              <i class="fas fa-plus"></i>{{menu.name}} <span><i class="fas fa-caret-down"></i></span>
            </div>
            <div class="collapsible-body">
              <ul>
                <li v-for="cMenu in menu.menus">
                  <a class="waves-effect waves-blue" :href="cMenu.href"><i class="fas fa-angle-right"></i>{{cMenu.name}}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>

    </ul>

</template>

<script>

import {mapState} from 'vuex'

export default {


	data(){
		return {
        leftMenus:[
          {
            name: '文',
            description: '大家喜欢吃，才叫真好吃。',
            icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
            is_selected: true,
            type: 1,
            foods: [],
            href:'',
            menus:[

              {
                name: '文2',
                description: '大家喜欢吃，才叫真好吃。',
                icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
                is_selected: true,
                type: 1,
                foods: [],
                href:'',
                menus:[],

              }
            ]
          }, {
            name: '房',
            description: '美味又实惠, 大家快来抢!',
            icon_url: "4735c4342691749b8e1a531149a46117jpeg",
            type: 1,
            foods: [],
            href:'',
            menus:[]

          }, {
            name: '器',
            description: '美味又实惠, 大家快来抢!',
            icon_url: "4735c4342691749b8e1a531149a46117jpeg",
            type: 1,
            foods: [],
            href:'',
            menus:[]

          }, {
            name: '饰',
            description: '美味又实惠, 大家快来抢!',
            icon_url: "4735c4342691749b8e1a531149a46117jpeg",
            type: 1,
            foods: [],
            href:'',
            menus:[]

          }, {
            name: '食',
            description: '美味又实惠, 大家快来抢!',
            icon_url: "4735c4342691749b8e1a531149a46117jpeg",
            type: 1,
            foods: [],
            href:'',
            menus:[]

          }
          ]
		}
	},
	mounted(){




  },
	components: {

	},
	props: [],
	mixins: [],
	computed: {
		...mapState([
		]),
	},
	updated(){
	},
	methods: {


	},
	watch: {

	}
}
</script>




