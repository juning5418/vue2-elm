import App from '../App'



const msite = r => require.ensure([], () => r(require('../page/msite/msite3')), 'msite')
const productDetail = r => require.ensure([], () => r(require('../page/product/productDetail')), 'productDetail')
const productList = r => require.ensure([], () => r(require('../page/product/productList')), 'productList')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const regist = r => require.ensure([], () => r(require('../page/login/regist')), 'regist')
const headProfile = r => require.ensure([], () => r(require('../page/profile/headProfile')), 'headProfile')
const passwordProfile = r => require.ensure([], () => r(require('../page/profile/passwordProfile')), 'passwordProfile')
const addressProfile = r => require.ensure([], () => r(require('../page/profile/addressProfile')), 'addressProfile')
const addAddressProfile = r => require.ensure([], () => r(require('../page/profile/addAddressProfile')), 'addAddressProfile')
const addAddressDetail = r => require.ensure([], () => r(require('../page/profile/addAddressDetail')), 'addAddressDetail')

const shoppingCart = r => require.ensure([], () => r(require('../page/cart/shoppingCart')), 'shoppingCart')

const orderList = r => require.ensure([], () => r(require('../page/order/orderList')), 'orderList')
const orderDetail = r => require.ensure([], () => r(require('../page/order/orderDetail')), 'orderDetail')
const checkOut = r => require.ensure([], () => r(require('../page/cart/checkOut')), 'checkOut')

// const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
// const setusername = r => require.ensure([], () => r(require('../page/profile/children/children/setusername')), 'setusername')
// const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
// const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
// const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')


// const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
// const search = r => require.ensure([], () => r(require('../page/search/searchMain')), 'search')
// const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
// const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
// const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
// const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
// const vipcard = r => require.ensure([], () => r(require('../page/vipcard/vipcard')), 'vipcard')
// const invoiceRecord = r => require.ensure([], () => r(require('../page/vipcard/children/invoiceRecord')), 'invoiceRecord')
// const useCart = r => require.ensure([], () => r(require('../page/vipcard/children/useCart')), 'useCart')
// const vipDescription = r => require.ensure([], () => r(require('../page/vipcard/children/vipDescription')), 'vipDescription')
// const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
// const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
// const remark = r => require.ensure([], () => r(require('../page/confirmOrder/children/remark')), 'remark')
// const payment = r => require.ensure([], () => r(require('../page/confirmOrder/children/payment')), 'payment')
// const userValidation = r => require.ensure([], () => r(require('../page/confirmOrder/children/userValidation')), 'userValidation')
// const invoice = r => require.ensure([], () => r(require('../page/confirmOrder/children/invoice')), 'invoice')
// const chooseAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/chooseAddress')), 'chooseAddress')
// const addAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/addAddress')), 'addAddress')
// const searchAddress = r => require.ensure([], () => r(require('../page/confirmOrder/children/children/children/searchAddress')), 'searchAddress')
// const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
// const itemDetail = r => require.ensure([], () => r(require('../page/shop/children/itemDetail')), 'itemDetail')
// const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
// const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')


// const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance')
// const balanceDetail = r => require.ensure([], () => r(require('../page/balance/children/detail')), 'balanceDetail')
// const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit')
// const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon')
// const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription')
// const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory')
// const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange')
// const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend')
// const points = r => require.ensure([], () => r(require('../page/points/points')), 'points')
// const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/detail')), 'pointsDetail')
// const service = r => require.ensure([], () => r(require('../page/service/service')), 'service')
// const questionDetail = r => require.ensure([], () => r(require('../page/service/children/questionDetail')), 'questionDetail')
// const find = r => require.ensure([], () => r(require('../page/find/find')), 'find')
// const download = r => require.ensure([], () => r(require('../page/download/download')), 'download')
//
//


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/msite'
        },

        // //首页城市列表页
        // {
        //     path: '/home',
        //     component: home
        // },
        // //当前选择城市页
        // {
        //     path: '/city/:cityid',
        //     component: city
        // },

      {
        path: '/shoppingCart',
        component: shoppingCart,
        meta: { keepAlive: true },
      },

      {
        path: '/orderList',
        component: orderList,
        meta: { keepAlive: true },
      },

      {
        path:'/checkOut',
        component: checkOut,
        meta: { keepAlive: true },
      },
      {
        path: '/orderDetail',
        component: orderDetail,
        meta: { keepAlive: true },
      },

        //所有商铺列表页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true },
        },
        // //特色商铺列表页
        // {
        //     path: '/food',
        //     component: food
        // },
        // //搜索页
        // {
        //     path: '/search/:geohash',
        //     component: search
        // },



        //商品详情
        {
          path: '/productDetail/:itemId/:shopId',
          component: productDetail,
          meta: { keepAlive: true },

        },

        //商品列表
        {
          path: '/productList',
          component: productList,
          meta: { keepAlive: true },

        },
        //登录页
        {
          path: '/login',
          component: login,
          meta: { keepAlive: true },
        },
        //注册
        {
          path: '/regist',
          component: regist,
          meta: { keepAlive: true },
        },



        // //商铺详情页
        // {
        //     path: '/shop',
        //     component: shop,
        //     children: [{
        //         path: 'foodDetail', //食品详情页
        //         component: foodDetail,
        //     }, {
        //         path: 'shopDetail', //商铺详情页
        //         component: shopDetail,
        //         children: [{
        //             path: 'shopSafe', //商铺安全认证页
        //             component: shopSafe,
        //         }, ]
        //     }]
        // },
        // //确认订单页
        // {
        //     path: '/confirmOrder',
        //     component: confirmOrder,
        //     children: [{
        //         path: 'remark', //订单备注
        //         component: remark,
        //     }, {
        //         path: 'invoice', //发票抬头
        //         component: invoice,
        //     }, {
        //         path: 'payment', //付款页面
        //         component: payment,
        //     }, {
        //         path: 'userValidation', //用户验证
        //         component: userValidation,
        //     }, {
        //         path: 'chooseAddress', //选择地址
        //         component: chooseAddress,
        //         children: [{
        //             path: 'addAddress', //添加地址
        //             component: addAddress,
        //             children: [{
        //                 path: 'searchAddress', //搜索地址
        //                 component: searchAddress,
        //             }]
        //         }, ]
        //     }, ]
        // },

        //个人信息页
        {
            path: '/headProfile',
            component: headProfile,
            meta: { keepAlive: true },

            // children: [{
            //     path: 'info', //个人信息详情页
            //     component: info,
            //     children: [{
            //         path: 'setusername',
            //         component: setusername,
            //     },{
            //         path: 'address',
            //         component: address,     //编辑地址
            //         children:[{
            //             path:'add',
            //             component:add,
            //             children:[{
            //                 path:'addDetail',
            //                 component:addDetail
            //             }]
            //         }]
            //     }]
            // },
            // ]
        },

      //密码
      {
        path: '/passwordProfile',
        component: passwordProfile,
        meta: { keepAlive: true },
      },
      //地址
      {
        path: '/addressProfile',
        component: addressProfile,
        meta: { keepAlive: true },
      },
      //地址
      {
        path: '/addAddressProfile',
        component: addAddressProfile,
        meta: { keepAlive: true },
      },
      //地址
      {
        path: '/addAddressDetail',
        component: addAddressDetail,
        meta: { keepAlive: true },
      },





        // //修改密码页
        // {
        //     path: '/forget',
        //     component: forget
        // },

    ]
}]
