# Donshi-Community-Mutual-Aid-Website
# step1 create gitHub(choose One)

### 1.GitKraken

```
Init gitHub responsity
```

### 2.GitHub

```
New responsity
```

---

## step2 create item

### 1.create the folder

```
web:前端網頁設計
  用途:會被瀏覽器搜尋到的頁面，手機端或電腦端
  前置作業:
  1. npx create-react-app {project-name}
  2. npm install -save react-router react-router-dom sass sass-loader
  3. 創立資料夾assets 然後assets底下創
                image
                scss
  4. 創立components、pages
```

---

## step3 上傳 gitHub

### 1.build 專案

```
  1.在package.json加 "homepage": "./"
  2.在要上傳的網頁 npm run build
  3.將build 好的的檔案 放入剛剛創建的reponsity
  4.git add .
    git commit -m "first commit"
    git remote add origin https://github.com/john87413/{project-name}.git
    git push -u origin master
```

### 2.設定 GitHub Page

```
    1.專案要是public
    2.在setting 將 github page設定master branch
```

---

## step4 前端工具樣式

### 1.sass-loader

```
  1.新增一個SCSS folder生出style.scss 還有 _variables.scss
  2.要用任何變量就可以直接這樣
    @import '../../assets/scss/variables.scss';
  3.在main.js improt style.scss
    import "./assets/scss/style.scss"
  4.記得每個樣式都要加點點!!!!!
```

### 2.樣式重製

```
  @import "./variables";

  全部的元素(*)
    1 .加個border-box
    2. 高亮消失(outline)

  html 定義
    1.找尋出現次數最多的字體大小(font-size)

  body 定義
    1.設margin 0
    2.設置行高
    3.設置常用字體
    4.可以順便設置background (看設計)

  a 定義
    1.更改默認顏色
    2.text-decoration: none (看情況)

  li 定義
    1.取消默認點點(list-style-type)
    2.float: left(看情況)
    3.cursor: pointer(看情況)

  button 定義
    1.取消默認方框
    2.border-radius: 0.5rem;(看情況)
```

### 3.定義常用 flex 工具

```
  1.定義 display
  2.定義direction
  3.定義flex-grow
  4.定義出變量 jc && ai
  5.將變量做each
```

### 4.定義常用 margin & padding

```
  1.定義出變量 type direction size base-size
  2.size的定義就0.5加上去或更大
  3.將變量做each 定義出 .m-1 .mx-1 .mt-1
```

### 5.定義常用 color

```
  1.定義出常用color
  2.將變量做each
```

### 6.定義常用 font size && text align

```
  1.定義出常用font-size
  2.將變量做each
  3.each 出 text 的 靠左靠右或置中
```

### 7.定義額外常用樣式

```
  1.寬高 100%
  2.flex 要不要自動換行
  3.字體加粗
```

---

## step5 分配 Router

### 1.創建頁面

1. 在 pages 底下創建頁面 並簡單寫 HTML
   map.js
   login.js
   home.js

   - info.js
   - need.js
   - setting.js
   - profile.js

2. App.js 分配 主要 route

```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

<Router>
  <div className="app">
    <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/map" component={Map}></Route>
      <Route path="/" render={() => <Redirect to="/home" />}></Route>
      <Route component={() => 404} />
    </Switch>
  </div>
</Router>;
```

3. home.js 分配嵌入 route

```javascript
import { Switch, Route, Redirect } from "react-router-dom";

<div className="home">
  <h1>Home Page</h1>
  <Switch>
    <Route path="/home/info" component={Info}></Route>
    <Route path="/home/Need" component={Need}></Route>
    <Route path="/home/profile" component={Profile}></Route>
    <Route path="/home/setting" component={Setting}></Route>
    <Route path="/home" render={() => <Redirect to="/home/info" />}></Route>
  </Switch>
</div>;
```

---

## step5 阿里巴巴 iconfont (如果需要)

### 1.介紹

```
1. https://www.iconfont.cn/
2. 下載完代碼後記得去main.js import iconfont.css
```

---

## step6 開始製作前端介面

### 1.更換 logo

```
  1.將製作好的Logo 加入public 資料夾裡
  2.將原本的icon 程式碼換成
    <link rel ="shortcut icon" type="image/x-icon" href="./self-logo.png">
```

<!-- ### 2.加入router
```
  1.vue add router
  2.將app.vue 改成 只有 <router-view/>
  2.創立main.vue (包含 header && routerView && footer)
    header && footer 正常是不會變的
  3.改router.js (自行查看)
    主要將main 加入並添加children
    之後視情況加入其他path
``` -->

### 3.製作 header(這邊只做 routerlink 介紹)

```
  1.先加入所需要的view(在view資料夾裡)
  2.在router.js做path添加(看要children 還是.....)
  3.在header 裡添加router-link
  4.用to="/" 之類的去更換router-view
  5.可以把title 和 menu 分開(程式碼優化)
```

### 4.製作 home 的 swiper

```
  1.npm install vue-awesome-swiper --save
  2.import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    Vue.use(VueAwesomeSwiper, /* { default global options } */)
  3.使用
  4.可以把swiper 和 menu 分開(程式碼優化)
```

### 5.製作 home 的 drinks

```
  1.<a> 標籤若要當成容器 可以將font-size設為0
    就不會多出一塊
```

---

## Deploy

### heroku

```
  1.server 端
    1.1 mkdir server
    1.2 npm init -y --> 初始化package.json (-y 可省略問答快速初始化)
    1.3 創建入口index.js
    1.4 npm install --save cors nodemon express
    1.5 自定義scripts -->
      "serve": "nodemon index.js",
      "start": "nodemon index.js" (heroku用)
    1.6 寫index.js (看一下)
  2.前端web
    1.1 寫vue.config.js(看一下)
    1.2 npm run build
  3.佈署到heroku
    1.1 記得一定要加  "start": "nodemon index.js"
    1.2 git init
        git add .
        git commit -m ""
    1.3 heroku login
        heroku create <name>
        git push heroku master
```

