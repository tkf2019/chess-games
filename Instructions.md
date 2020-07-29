# 配置说明

封装了run.bat和build.bat两个文件，分别对应后端运行和前端打包操作。为了方便开发，前端配置了跨域代理，在根据package.json文件中的依赖项配置好本地node_modules文件后就可以执行如下命令来运行前端程序。

```shell
npm install
npm run serve
```

后端程序则直接打开根目录并执行run.bat即可。

### 一、Vue

#### 1.配置webpack.config.js

使用path包动态获取当前绝对路径。在当前路径下执行npm init命令，并执行npm install进行绑定，执行npm install webpack@3.6.0 --save-dev在本地安装webpack。**注意**：-dev表示开发时依赖，最终运行程序不需要安装的内容。很明显，我们仅在对文件进行解析和打包时使用以下插件，所以需要加上-dev。

执行npm install --save-dev css-loader和npm install --save-dev style-loader对.css文件进行加载并将样式添加到DOM中。注意npm在执行use过程中是从右向左读取，根据插件之间的依赖关系，需要先绑定css-loader。类似地，我们可以安装less-loader，sass-loader等将.less、.scss文件先解析为css文件。

**注意**：执行npm install -g cnpm --registry=https://registry.npm.taobao.org安装淘宝镜像，并执行cnpm install node-sass --save-dev在本地安装node-sass(国外安装环境较差，会报一些路径错误包依赖错误等等乱七八糟的东西)，或者执行npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass修改node-sass安装源，之后根据peerDependency执行npm install sass-loader node-sass webpack --save-dev安装sass-loader。

某些插件会存在版本过高的问题，所以在install时应指定版本号。

为利用浏览器缓存提高渲染效率，可以将css模块和js模块分开打包，先执行npm install extract-text-webpack-plugin安装extract包，在webpack.config.js中配置ExtractTextPlugin对象，例如：

```js
const extractSass = new ExtractTextPlugin({
  filename: "css/[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development",
  allChunks: true
});
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'，
    publicPath: 'dist/'
  },
  module: {
  	rules: [{
	  test: /\.css$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }],
          fallback: 'style-loader'
        }) 
    }]
  },
  plugins: [
    extractSass
  ]
}
```

执行npm install url-loader --save-dev和npm install file-loader --save-dev安装url-loader和file-loader。url-loader对图片文件进行处理，应用base64对图片进行转码，转码前可以对图片的大小进行限制，图片大小如果超出限制，就使用file-loader对图片进行打包。file-loader在对图片进行打包后会默认放到dist文件夹中，可以在output中添加publicPath属性，声明所有url的默认前缀。

执行npm install --save-dev babel-loader@7 babel-core babel-preset-es2015安装babel插件将ES6语法自动转换为ES5语法。

#### 2.配置Vue环境

代码运行时依赖Vue，所以执行npm install vue --save。代码在打包的过程中会生成两个版本的代码，分别是runtime-only和runtime-compiler，runtime-only代码中不可以有template。在main.js创建的Vue实例中定义template，将准备放入index.html的内容写入template，编译时会自动对Vue：el管理的元素进行替换。

组件以js对象形式进行组织和使用也会造成代码的可读性变差，可以利用.vue文件对template，script，style三个板块进行封装和处理。这里需要执行npm install vue-loader vue-template-compiler --save-dev安装插件对.vue进行打包。vue-loader正常运行需要引入相关plugin，具体实现参考之后的webpack.config.js完整代码。

#### 3.使用相关Plugin

横幅插件，在代码开头添加版权信息，使用webpack.BannerPlugin。

打包html，执行npm install html-webpack-plugin@3.2.0 --save-dev安装HtmlWebpackPlugin。可以在dist文件夹中根据指定模板自动生成index.html文件，将打包的js文件，自动通过script标签插入到body中。**注意**：可能存在各个插件版本不兼容等问题，需要降低版本号。

对bundle.js进行压缩，执行npm install uglifyjs-webpack-plugin@1.1.1 --save-dev安装插件。

#### 4.本地服务器

webpack提供了一个可选的本地开发服务器。这个服务器基于node.js搭建，内部使用express框架，可以实现浏览器自动刷新修改后的结果。执行npm install webpack-dev-server@2.9.1 --save-dev安装devserver。同样地，我们在package.json中添加npm run的命令server，后面的webpack-dev-server就会指定自动在本地运行服务器。

#### 5.webpack配置分离

首先执行npm install webpack-merge --save-dev安装插件，对生成和开发时的公有配置进行提取，创建webpack.config.base.js文件，之后对生成和开发环境的配置分别进行调整，应用merge函数对配置文件进行合并。在package.json中执行npm run命令时，添加相关配置路径--config ./build/webpack.config.dev.js。

### 二、Vue CLI(Vue Command-Line Interface)

执行npm install -g @vue/cli安装vue-cli最新版本。由于存在某些项目仍有VueCLI2的需求，所以安装@vue/cli-init使用vue-cli2的命令。

#### 1.VueCLI2

执行vue init webpack <project name>，如果安装失败，可以将webpack下载到本地。

runtime-compiler和runtime-only的区别：runtime-only直接调用render函数，省去了对template的编译过程，避免进行解析生成抽象语法树，减少代码量，提高程序运行效率。

#### 2.VueCL3/VueCL4

可以直接通过可视化界面对项目进行管理。将webpack相关配置和插件依赖都封装起来。

### 三、配置django

安装完成anaconda后注意到root中的内容过于臃肿，可以自行配置conda虚拟环境，并安装需要的包，执行conda create -n <name>。可以执行conda list查看安装了哪些包，执行conda env list或者conda info -e查看当前存在哪些虚拟环境，执行activate <name>或者conda.bat activate <name>激活虚拟环境。可以执行conda remove移除虚拟环境。

执行conda install django安装相应版本，考虑到项目前后端分离，且端口不一致，vue是8080，django是8000，会存在找不到服务的问题，首先执行pip install django-cors headers并修改settings.py，执行pip install django-cors-headers安装django-cors-headers实现跨域。修改settings.js中DATABASES和TEMPATES将前端打包后的文件与后端接口进行绑定。

执行django_

### 四、配置MySQL

使用MySQL WorkBench可以通过UI管理数据表（就是将MySQL Client中支持的命令行操作与按钮和图形对应起来）。注意执行pip install pymysql配置MySQL环境。

........................................................
