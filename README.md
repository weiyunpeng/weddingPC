### Vue for DYWEDDING
大豫新娘帮PC端

##运行方式  
npm install  
npm run dev

##开发说明  
*  开发目录在src目录下  
*  静态图片文件在static目录下(需要引用的第三方资源都放在该目录下)   
* 入口在App.vue  

*scss的开发和使用
目前scss统一放在./src/assets/css中  
每一个页面建立一个scss文件  
公共的样式用_&*.scss 如：_main.scss  
其他页面引用的时候只需要在当前scss文件的头部加上@import '' 如：@import './main';  
在页面中引用scss只需要在当前页面最底部加上  
style rel="stylesheet/scss" lang="scss">
@import "scss路径";
/style>  
如：  
style rel="stylesheet/scss" lang="scss">
@import "./../assets/css/header.scss";
</style


