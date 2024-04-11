const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    port:7070,
    open:true,
    proxy:{
      '/url':{
        target:'http://localhost:8080',
        ws:true,
        changeOrigin:true,
        pathRewrite:{
          '^/url':''
        }
      }
    
    }

  },

  

})
