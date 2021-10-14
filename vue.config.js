'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// const path = require('path');
// const resolve = (dir) => path.resolve(__dirname, dir);
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const cdn = {
  // 忽略打包的第三方库
  externals: {
    'vue': 'Vue',
    'element-ui': 'ElementUI',
    'axios': 'axios',
    'qs': 'Qs',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
  },

  // 通过cdn方式使用
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/qs/6.9.4/qs.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/index.min.js',
    'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js'
  ],
  css: [
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.0/theme-chalk/index.min.css',
    'https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css',
    'https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
    'https://cdn.bootcdn.net/ajax/libs/animate.css/3.6.2/animate.min.css'
  ],
};

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? './'
    //   : '/' ,
    // 基本路径
    publicPath: '/',//默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
    // 构建时的输出目录
    outputDir: 'dist',
    // 放置静态资源的目录
    assetsDir:'static',
    // html 的输出路径
    indexPath:'index.html',
    // 文件名哈希
    //filenameHashing: true,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 是否使用带有浏览器内编译器的完整构建版本
    //runtimeCompiler: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    chainWebpack: (config) => {
       // npm run prod (发布模式)
      config.when(process.env.NODE_ENV === 'production', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main-prod.js')
          // 移除 prefetch 插件
        config.plugins.delete('prefetch-index');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload-index');
        // 通过externals加载外部CDN资源----1
        config.set('externals', cdn.externals)
        // 发布模式的isProd为true
        config.plugin('html').tap(args => {
          args[0].cdn = cdn
          return args
        })
      })
      // npm run dev (开发模式)
      config.when(process.env.NODE_ENV === 'development', config => {
        config
          .entry('app')
          .clear()
          .add('./src/main.js')
        // 通过externals加载外部CDN资源----1
        config.set('externals', cdn.externals)
        // 发布模式的isProd为true
        config.plugin('html').tap(args => {
          args[0].cdn = cdn
          return args
        })
      })
    },
     // 这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  configureWebpack: (config) => {
    // 忽略打包配置
    config.externals = cdn.externals;
    // 生产环境相关配置
    if (isProduction) {
      //gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
      // 公共代码抽离
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        },
      };
    }
  },
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
    },
    // webpack-dev-server 相关配置
    devServer: {
      overlay: {
        warnings: false,
        errors: false,
      },
        open: false,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
        host: 'localhost',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
        port: 8080,
        https: false,
        hot: true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
        hotOnly: false,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        proxy: {
          '/api': {
             target:'http://47.98.37.45:8080', // 你请求的第三方接口
             changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
             ws:false,
             secure: false, // 如果是https接口，需要配置这个参数
             pathRewrite:{  // 路径重写，
              '^/api': 'http://47.98.37.45:8080'  // 替换target中的请求地址，也就是说以后你在请求http://这个地址的时候直接写成/api即可。
             }
          }
       },
    }
};