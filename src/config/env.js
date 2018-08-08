/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
    imgBaseUrl = 'http://h5.heptalcc.com:8001/img/';
  // imgBaseUrl = 'http://localhost:8001/img/';


}else if(process.env.NODE_ENV == 'production'){
    baseUrl = '//h5.heptalcc.com';
    imgBaseUrl = '//h5.heptalcc.com:8001/img/';
  // baseUrl = '//localhost:8000';
  // imgBaseUrl = '//localhost:8001/img/';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
