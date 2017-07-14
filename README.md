### Vue for DYWEDDING
大豫新娘帮PC端

##运行方式  
npm install  
npm run dev

##开发说明  
*  开发目录在src目录下  
*  静态图片文件在static目录下(需要引用的第三方资源都放在该目录下)   
* 入口在App.vue  
>该项目页面page目录下：  
* 商家首页 （index.vue）展示商家的信息
* 套餐页面 （meal.vue）展示套餐的信息

>>页面的详情页分别在（components/meal)和（components/business）
* 商家详情页 （）展示商家的详细信息
* 套餐详情页 （）展示套餐的详细信息
* 套餐列表页 （）展示某个商家的所有套餐的列表信息
* 官方案例页 （）展示某个商家的所有官方案例的信息
* 摄影师页 （）展示某个商家的某个摄影师的信息
* 化妆师页 （）展示某个商家的某个化妆师的信息

>该项目组件：
* 商家筛选框 （components/meal/mealTag.vue）用于筛选商家信息
* 套餐筛选框 （components/business/busTag.vue）用于筛选套餐信息
* 条件查询 （）用于根据不同条件进行查询
* 分页器 （）用于分页查询
* 返回顶部按钮 （）用于返回顶部
* 查看地图 （） 用于查看地理位置等信息

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


