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
      });
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs); 
  },

  userLogin() {
    wx.login({
      success: res => {
        // console.log(res);
        wx.request({
          url: 'http://localhost:3000/login?code=' + res.code,
          success: res => {
            console.log('后端code登录请求', res.data);
            let userToken = res.data.data.token;
            wx.setStorage({
              key: 'userToken',
              data: userToken
            });
            this.getSessionAndUid(userToken);
          }
        });
      }
    });
  },

  getSessionAndUid(token) {
    wx.request({
      url: 'http://localhost:3000/getSessionAndUid',
      method: 'POST',
      header: {
        'Authorization': token
      },
      success: res => {
        console.log('后端获取session_key和uid请求', res.data);
        let uid = res.data.data.uid;
        let nickName = res.data.data.nickName; // 注意这里nickName的路径
        wx.setStorage({
          key: 'Uid',
          data: uid
        });
        wx.setStorage({
          key: 'nickname',
          data: nickName
        });
        this.globalData.uid = uid;
        this.globalData.nickName = nickName;
      }
    });
  },
  
  onShow() {
    // 早于页面组件的onShow执行
  },

  // 全局属性
  globalData: {
    requestUrl: 'http://localhost:3000/',
    userInfo: null,
    userLocation: null,
    uid: null // 初始化全局 uid
  },

  // 全局方法
  globalMethod: {
    foo() {
      console.log('this is foo function');
    }
  }
});


