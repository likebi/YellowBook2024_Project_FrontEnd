// app.js
App({
  onLaunch() {
    // 先判断缓存是否存在Token
    let userToken = wx.getStorageSync('userToken');
    if (!userToken) { // Token不存在
      this.userLogin();
    } else { // 缓存有Token
      wx.checkSession({
        fail: () => {
          this.userLogin();
        }
      })
    }
    
   // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs) 
  },
  userLogin() {
    wx.login({
      success: res => {
        // console.log(res);
        wx.request({
          url: 'http://localhost:3000/login?code=' + res.code,
          success: res => {
            console.log('后端code登录请求', res.data);
            let userToken = res.data.data;
            wx.setStorage({
              key:'token',
              data:userToken
            })
          }
        })
      }
    })
  },
  onShow() {
    // 早于页面组件的onShow执行
  },
  // 全局属性
  globalData: {
    requestUrl: 'http://localhost:3000/',
    userInfo: null,
    userLocation:null
  },
  // 全局方法
  globalMethod: {
    foo() {
      console.log('this is foo function');
    }
  }
}) 
