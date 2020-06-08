## 小程序

- 自定义编译可以自定义编译页面和一些参数

## uniapp

### 1. uniapp规范

- 页面文件遵循vue单文件组件（SFC）规范
- 组件标签靠近小程序规范
- 接口能力（JS API） 靠近微信小程序规范
- 数据绑定及事件处理同vue.js规范 
- 为兼容多端运行，建议使用flex布局进行开发
  - 不用考虑浏览器兼容性加前缀的问题，uniapp框架会处理这些兼容问题

### 2. uniapp特色

- 条件编译

  - 平台之间的差异性，如果通过if-else的形式去书写代码，那么会造成大量的冗余。

  - 而uniapp提供了条件编译的形式 减少了上述说的冗余性

    ```js
    #ifdef APP-PLUS 
    	需要条件编译的代码
    #endif
    // 仅出现在App平台下的代码
    # ifndef H5
    	需要条件编译的代码
    #endif
    // 除了H5平台，其他平台均存在的代码
    
    #ifdef H5 || MP-WEIXIN
    	需要条件编译的代码
    #endif
    // 在h5平台或微信小程序平台存在的代码(这里只有||， 不可能有&&，因为没有交集)
    
    ```

    

- App端的Nvue开发

NativeVue的简写，为了让app端做到原生的体验。

nvue内置了维克斯的渲染引擎，给App提供了原生的渲染能力，在nvue中既可以使用维克斯的组件和api，既可以使用维克斯的组件和api，又可以使用uniapp的组件和api，相当于nvue为维克斯补充了大量的uniapp的组件和api

- HTM5+

  HTM5+引擎可以帮助我们在app端直接调用原生的插件，一些比较复杂的功能纯前端很难去实现，那么就可以使用HTML+调用原生的插件去实现这些功能。而且h5+内置了几十万的api。

- nvue和h5+只能在app端使用，无法在web端和小程序使用



### 3. uniapp知识点

组件

​	自定义组件

​	基础组件

api

​	路由（页面切换）

生命周期

语法

布局样式



### 4. vue-cli创建项目

- vue create -p dcloudio/uni-preset-vue test-uniapp

## 5. uniapp语法速通

- 模板语法  和vue一样
- 数据绑定  和vue一样
- 条件判断  和vue一样
- 列表渲染  和vue一样
- 基础组件的使用  uniapp官方提供的组件， 比如scroll-view，input，picker等 
  - 这些组件提供了很多api，可以自己尝试。
- 自定义组件的使用(简单的使用)
  - 和vue定义组件一样
- 基础api的用法
  - 例如 uni.getSystemInfo({})
- 条件编译
  - 完全不编译不符合条件的代码
- 页面布局
  - 尺寸单位： px rpx(根据屏幕宽度自动适应变化的单位， 以750的屏幕为基准，屏幕放大，rpx单位量等比增大) rem vh vw
  - 样式导入 @import '路径'
  - 布局推荐使用flex



## 6. 生命周期

1. 应用(整个应用的)生命周期 ， 在App.vue中进行定义 -- 顺序就是代码的执行顺序

   ```js
   onLaunch // 应用初始化完成触发一次， 全局只触发一次，只能在App.vue中定义，在页面中定义无效果
   	可以做一些登录的事情，获取全局变量等事情
   onShow // 应用启动的时候，或者从后台进入前台就会触发
   onHide // 应用从前台进入后台就会触发
   ```

2. 页面生命周期， 在每个页面中去定义 -- 顺序就是代码的执行顺序

   ```js
   onLoad // 监听页面加载，在开始加载的时候触发，元素还未开始渲染 -- 页面只执行一次
   onShow // 监听页面显示，每次页面出现的时候，就会触发这个钩子。
   onReady // 监听页面渲染完成， 如果页面渲染速度快(元素太少)，会在页面翻页动画完成前就触发了 -- 页面只执行一次
   onHide // 监听页面隐藏，每次页面隐藏的时候，就会触发这个钩子。 
	正常跳转页面会触发onHide钩子
   onUnload // 监听页面卸载
   	正常跳转页面不会触发onUnload钩子
       重定向跳转页面会触发onUnload钩子，直接卸载页面，重新入进入时会重新执行页面生命周期
   ```
   
3. 组件的生命周期 （和vue组件中的生命周期一致）

   ```js
   beforeCreate
   created
   mounted
   // mounted 并不能确定
   .....
   destroyed
   	// 这里记录一下vue的destory，
   	// 官方解释 - 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
   	// 其实还有会 断掉虚拟dom和真实dom之间的联系
   	// 并没有删除已经渲染的dom元素， 而且这个组件$on的事件总线函数还是会被执行，没有被销毁
   	// 可以用v-if模拟组件销毁(dom销毁) 或调用$destory函数 destory这个组件
   ```

4. 上述三种生命周期在同一个页面当初始化时候的执行顺序

   ```js
   App Launch
   App Show
   page onLoad
   page onShow
   component beforeCreate
   component created
   component mounted
   page onReady
   //start 页面hide
   App Hide
   page onHide
   App Show
   page onShow
   //end hide
   // start 页面onUnload
   page onUnload
   component destory
    -- 重新进入
   component beforeCreate
   component created
   page onLoad
   page onShow
   component mounted
   page onReady
   // end onUnload
   ```

   

## 7. 目录结构概述

- components - 自定义组件的目录
- pages - 业务页面的存放目录
- static - 静态文件资源目录
  -  所有图片 和 字体放在static目录中
  - 因为static中的文件会被原样编译到项目中，不能放js文件。
- unpackage  - 编译后的文件存放目录 (不管编译什么模式下)
- utils -  公用的工具类
- common - 公用的文件
- App.vue -  页面的入口
  - onLaunch 用户登录 项目初始化
- main.js -  应用入口  和vue-cli的main.js功能一致
- mainifest.json -  项目配置
- pages.json   - 页面配置 
  - pages数组：每一项是页面的配置
  - globalStyle：所有页面公用的配置
- uni.scss  定义了样式变量

## 8. tabBar

- 关于iconPath， 其值为tabBar的图片。有一些规定
  - 本地图片， 最大40kb， 尺寸  建议81*81px
- tabbar的页面切换时会被缓存， onLoad不会重复执行
- tabbar 点击跳转页面的时候会触发到 页面的一个onTabItemTap钩子。
  - 可以在这个钩子进行一些重新渲染的钩子



## 9. uniCloud

- 是为uniapp的开发者提供的基于serverless模式和js编程的云开发平台

### 9.1 uniCloud的价值

- 用JavaScript开发前后台整体业务
- 开发成本大幅下降
- 只需要专注于你的业务
- 如果不发布h5的情况下，免域名使用服务器
- 对于敏捷性业务，不需要前后端分离（只需要对业务进行分工）
- 于微信/支付宝的云开发在底层上相同

### 9.2 uniCloud构成

- 云函数

  - 运行在定制过的nodejs环境中，有良好的性能和强大的功能，可以执行强大的运算，读取nosql的数据，读写存储，操作网络。给前端返回数据
  - 顾名思义： 运行在云端(服务端) 的函数， 和写代码的方式和正常的js函数没什么区别，只是调用的时候，是在node环境中运行并调用的。

  ```js
  
  ```

  

- 云数据库

  - 可以在云函数中读写基于nosql的json数据库。

- 云存储和cdn

### 9.3 使用

- 创建项目的时候选择uniCloud

- 云数据库添加记录的每一条记录都是一个标准的json格式。

  - 对云数据库的操作只能在云函数中进行调用，不能在客户端直接对数据库进行操作

- 云函数中对数据库的操作

  1. 创建数据库的引用  

     `const db = uniCloud.database()`

  2. 获取指定集合(表)

     `const collection = db.collection('user')`
	   
  3. 向表中添加记录 - 添加列

        `let res = collection.add({name: 'uni-app'})`
  
  4. 向表中添加多条记录
  
     ```js
     const res = await collection.add([
         {
             name: 'react',
             type: 'facebook'
         },
         {
             name: 'ng'
         }
     ])
     ```
  
  5. 查找一条记录并删除
  
     ```js
     const res = await collection.doc('5ed21e2af97e82004ced5fd2').remove()
     // 注: .doc是查找到一条记录的引用， .remove方法是将这条记录删除
     ```
  
  6. 查找一条记录并更新
  
     ```js
     const res = await collection.doc('5ed21eb215bcf2004dcf34d8').update({
     		name: 'vvue'
     })
     ```
  
     或
  
     ```js
     const res = await collection.doc('5ed21eb215bcf2004dcf34d8').set({
         name: 'vvue'
     })
     ```
  
     那么这update 和 set有什么区别呢
  
     如果更新一条不存在id的记录，update更新失败，但是set会新增这条不存在的。
  
     update只能更新存在的记录， 而set如果存在就更新，如果不存在就添加
  
  7. 查找一条记录的信息
  
     会返回这条记录的详细信息
  
     `const res = await collection.doc('5ed21eb215bcf2004dcf34d8').get()`

- doc只能应用于id，不能应用于其他的字段

- 使用where的查询关键字可以使用其他条件去查询

  8. 使用其他条件去查询一条记录的信息

     ```js
     const res= await collection.where({
         name: 'vvue'
     }).get()
     console.log(res)
     ```

     

# 10. 项目开始

## 10.1 项目初始化

1. 创建uniapp项目，选择uniCloud

2. 创建云服务空间

3. 在cloudfunctions下引入db_init.json

   1. 在文件中右击初始化数据库

4. 在static下引入tabbar的icon

5. 创建tabbar文件夹，里面三个路由文件

   `index follow my`

6. 在packjson中配置tabBar

## 10.2 自定义导航栏的实现

- h5与小程序/app 有一个区别就是 h5没有状态栏(电池，wifi，运营商). 而小程序和app有

- uniapp中注册组件并不需要import 然后 在components中注册才能使用。

  - uniapp中有一个easyCom的概念， 只要我们要使用的组件的路径是 components/组件名/组件名.vue,  uniapp会帮我们自动引入。并不是全局引入才会有这种效果，只有使用了这个组件，uniapp才会去编译并引入这个组件

- 新建components文件夹，新建navBar组件(自定义导航栏)

- 在packjson中页面的style属性中配置 `navigationStyle: 'custom'`   就可以去掉导航栏了.

- 对自定义导航栏进行适配的办法统一化，进行完美匹配

  ```js
  // 获取手机系统信息
  const info = uni.getSystemInfoSync()
  // 获取状态栏的高度
  const { statusBarHeight } = info
  this.statusBarHeight = statusBarHeight
  // #ifndef H5 || APP-PLUS || MP-ALIPAY
  // 获取胶囊按钮的位置
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
  // 得到导航栏的高度  （胶囊按钮的高度 + 胶囊按钮距离上下的高度）
  // (bottom - 状态栏的高度) + (top-状态栏的高度)
  const { top, bottom, height,left } = menuButtonInfo
  const navbarHeight = (bottom-statusBarHeight) + (top-statusBarHeight) 
  this.navbarHeight = navbarHeight
  this.windowWidth = left
  // #endif
  ```

  

##10.3 字体图标的使用

1. 使用阿里图标库
  2. 插件市场使用icons插件

## 10.4 tab栏

  - 这里可以和阿面的tab栏进行对比，总结两种方案

  ```js
  // scroll-view下的box盒子 -- 核心代码
  .tab-scroll_box {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      height: 45px;
      box-sizing: border-box;
      .tab-scroll_item {
          flex-shrink: 0;
          padding: 0 10px;
          font-size: 14px;
          color: #333;
      }
  }
  // tab右侧的设置icon --
  .tab {
  		display: flex;
  		width: 100%;
          .tab-scroll {
  			flex: 1;
  			overflow: hidden;
  			box-sizing: border-box;
              .tab-icons {
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                width: 45px;
  ```

## 10.5 封装api请求

  - 以一个基础的模板进行封装http请求  http.js
  
    ```js
    const $http = options => {
    	const {url, data} = options
    	return new Promise((resovle, reject) => {
    		uniCloud.callFunction({
    			name: url,
    			data
    		}).then(data => {
    			const { result } = data
    			if(result.code === 200 ) {
    				resovle(result.data)
    			} else {
    				reject(result.data)
    			}
    		}).catch((err) => {
    			reject(err)
    		})
    	})
    }
    
    ```

  export default $http
    ```

  - 在每一个模块下（比如文章模块）以上述http请求为根，封装业务所需要的一个个的http请求 api/list.js
  
    ```js
    export const get_label = data => {
    	return $http({
    				url: 'get_label',
    				data: {}
    			})
    }
    ```

  - 真正在业务中使用的this.$api.xxx， 将模块需要在聚合一层， api/index.js

    如果使用这种方式引入每个函数
  
    ```js
    // import { get_label, get_list } from './list.js'
    
    // export default {
    // 	get_label,
    // 	get_list
    // }
    ```

    那么代码的可维护性就降低了很多，引入添加函数时，都要去 index.js中导入函数，然后导出

    所以我们使用这种具有可扩展性的方式
  
    ```js
    // 中间多走了一层，代码结构清晰
    // 批量导出文件
    const requireApi = require.context(
    	// 当前目录是api目录, 需要批量获取的文件 相对于当前是目录是 '.'
    	'.',
    	// 是否查询子目录
    	false,
    	// 查询文件的后缀名
    	/.js$/
    )
    let module = {}
    requireApi.keys().forEach(item => {
    	if(item==='./index.js') return 
    	Object.assign(module, requireApi(item))
    })
    // console.log(module)
    export default module
    ```


##10.6 navbar

  - 在使用scroll-view的时候，最好只有一个根子集元素，将需要滚动的元素包裹。
      - 防止一些意外的bug发生。



### 10.7 tab栏和下面的swiper是如何联动的

- 点击tab和swiper onchange的时候都向其公共的index.vue中发射一个事件，改变index.vue中的tabIndex，将tabIndex传递给tab和swiper，分别在组件内部对tabIndex的不同进行处理。
  - 记住：swiper滑动会触发滚动事件，其:current属性值的变化也会触发滚动事件。

### 10.8 整理下结构

- 接口部分：定义了基础工具http.js， 需要传递{ url, data }这种类型的对象过去。为了再http.js中进行解析调用， api中定义index.js， 通过node读取文件的方式，将该目录下定义的所有的.js文件的方法整合到一个对象中,  在main.js中进行挂载到vue的原型下。
- 组件部分： tab组件是页面的完整的tab栏
  - navBar是整体的搜索框
  - list-scroll是可滚动区域封装的组件，有slot插槽
  - list-card是每篇文章，有基础卡片模式，多图模式，大图模式
  - list-item是每个tab下的很多的文章的list集合
  - list 是所有的tab下的文章的的集合
    - 也就是说list是一种二维数组形式的集合，其中的每一维都是一个tab下面的集合。而每一个tab下对应的也是一个个的集合。
  - 用swipper模拟页面的滑动。



### 10.9 切换选项卡懒加载数据

- 如果发送请求的参数需要 props中的数据， 可以用watch进行监听。

- 如果是同一页面的可以用await了。但是也可以用watch。。

- 切换的时候，闪烁的问题

  ```js
  // 在未处理以前，每次tabIndex改变，页面都会闪烁一下，
  // 因为 每次拿接口数据和渲染到dom上(渲染dom的时间可以忽略)都需要时间，而切换的动作发生的时候，没拿到数据之前，页面显示的是原来的值，
  // 拿到值之后，再去渲染成新的值。
  // this.list = data // 原来的
  				
  // 解决方案： 
  /*
     定义一个缓存数据的对象，给list-item的时候，给 缓存对象的所对应的下标的值，这样如果缓存对象中没有的话，就显示空，如果有的话，就显示缓存对象中的数据,而且不用担心数据被缓存无法拿到最新的数据的问题，因为每次都是请求的新的数据，除非新的数据与旧的数据非常不一致的情况，可能会出现闪烁的情况。每个组件中的数据都不同的(根据index和listCatchData的缘故)， 所以滑动的时候会显示原先的.如果粗暴的this.list = data, 那么每一个组件的list数据都是相同的，所以会出现滑动的过程看到上一页或者下一页还是当前的。
    说白了就是要保证，每个组件中的数据是不同的
  */
  // console.log(data)
  this.$set(this.listCatchData, index, data)
  
  // template 中
  <!-- 原来的 -->
  <!-- <list-item :list="list"></list-item> -->
  <!-- 根据index保证了每一个组件中都是不同的数据 -->
  <list-item :list="listCatchData[index]"></list-item>
  ```
```
  



## 11. 上拉加载

### 11.1 处理tab栏和内容区的一些遗留问题

- 初次打开的时候，显示全部数据
- 当我们切换tab或者滑动内容区的时候，如果有已经存在过的，则不需要再去显示了。

### 11.2 上拉加载

- 使用uniapp官方出品的loadmore插件.

  - 将其插件放在 与  渲染的内容区的卡片的下面

    ```js
    <list-scroll>
    <list-card :item="item" v-for="(item, index) in list" :key="index"></list-card>
    <uni-load-more status="noMore"></uni-load-more>
    </list-scroll>
```

  - 上拉加载自然要分页

  - 云函数做了分页

  - 和上面的数据一样，保证每个swiper-item的页数是不一样的，所以要做个对象存放每个内容区的item 和loading动画。

  - get_list接口数据请求回来的时候，定义变量叠加到listCatchData中

  - loading动画的显示，

    ```js
    <uni-load-more v-if="list.length === 0 || list.length>4" :status="load.loading" iconType="snow"></uni-load-more>
    ```

    - 也可以通过接口返回的数据的length  用数据对loading组件进行操作。但是显然这种更好一些。直接操作组件本身。如果是我做的话，或许就用数据去操作loading组件了。



## 12. 收藏按钮

- 该文章是否被收藏是文章item的一个字段， 点击收藏按钮时， 要在收藏按钮的click事件中改变item的数据， 这样`item.is_like = !item.is_like` 是不可以的。因为item是props中传递来的数据，vue无法监听当前组件改变的props中对象中的一个变量的改变。除非通过emit改变父组件中的数据，在子组件中用watch监听才可以。

  - 如果是上述这种情况的话，那么可以将item中的is_like字段存到一个变量中，然后将此变量发送给likes组件。切记，赋值的时候，要么在created中将item的is_like赋值给当前组件的like字段，要么watch立即监听一次监听item，然后将`this.like = newVal.is_like`

    ```js
    // 方式二： watch监听item, 给like赋值
    watch: {
        item: {
            handler(newVal) {
                // console.log(newVal, 'item')
                this.like = newVal.is_like
            },
            immediate: true
        }
    },
    // 方式一：这种created的方式最好
    created() {
    	this.like = this.item.is_like
    }
    // 点击收藏按钮
    likeTap(item) {
        this.like = !this.like
        this.setUpdateLikes()
    },
    <likes @click.native.stop="likeTap(item)" :isLike="like"></likes>
    ```



## 13. 搜索页面

### 13.1 搜索历史存放在vuex中

### 13.2 输入框数据对应搜索结果

- 在navbar组件上v-model，在input 的@input事件上emit input事件，将输入框的值传递给input，自然也就在home-list组件上获取到输入的数据了。
  - 其实想一想，没必要给navbar上加v-mode将@input就可以了，在@input对应的事件处理函数中请求数据，用v-model还需要watch keyword，但是如果从别的入口带过来搜索关键字参数的话，那么v-model的可扩展性更好一些(其实没必要)， 这里我还是选择了v-model
- 我发现   函数节流防抖都不会，真是暴露了一个可怕的事实
  - 必须找个时间恶补一下了
- 在监听keyword的时候，加个防抖函数，在防抖函数中请求getSearch接口
- 一个知识点： let timer = setTimeout...   在延时器执行之前，如果clearTimeout该定时器的话，那么该定时器将会被清除，其回调函数中的逻辑不在执行了。但是如果该定时器已经正在执行，再清理该定时器就无法清除了。其中的逻辑该怎么走就怎么走。
- 发现用watch不好，还是选择用@input的事件，事实证明，语法糖并非是绝对的好的。

### 13.3 总结搜索页面

- 搜索页面主要是数据传递的问题，业务方面处理的多一点，最后将数据存放到本地存储里面。关于搜索页面的样式和结构也是很值得关注的一点。



## 14. 详情页面

### 14.1 页面预加载

- 当我们进入文章详情页的时候，需要根据id发送数据拿到文章的信息，但是发送请求需要时间，会造成发起请求到页面渲染成功这一段时间的页面空白，我们可以 在点击文章详情的时候，将已经知道的信息(文章的标题，作者，时间，点赞数量等...)先渲染到页面上，其他不知道的数据用loading代替，然后发送请求重新对页面进行渲染。
- 获取路由传递过来的数据，在本页面中要使用onLoad事件， onLoad函数的参数就是路由传递过来的数据