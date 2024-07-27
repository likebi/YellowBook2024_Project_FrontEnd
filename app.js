App({
  onLaunch() {
    this.checkUserToken(this.fetchUserData);
  },

  globalData: {
    needRefresh: false
  },

  checkUserToken(callback) {
    let userToken = wx.getStorageSync('userToken');
    if (!userToken || this.isTokenExpired(userToken)) {
      this.userLogin(callback);
    } else {
      wx.checkSession({
        success: () => {
          if (callback) callback();
        },
        fail: () => {
          this.userLogin(callback);
        }
      });
    }
  },

  isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      const now = Date.now();
      return now > exp;
    } catch (e) {
      console.error('Token 解码失败:', e);
      return true; // 如果解码失败，假设 token 已过期
    }
  },

  userLogin(callback) {
    wx.login({
      success: res => {
        wx.request({
          url: 'http://localhost:3000/login?code=' + res.code,
          success: res => {
            let userToken = res.data.data.token;
            wx.setStorage({
              key: 'userToken',
              data: userToken,
              success: () => {
                this.getSessionAndUid(userToken, callback);
              }
            });
          }
        });
      }
    });
  },

  getSessionAndUid(token, callback) {
    wx.request({
      url: 'http://localhost:3000/getSessionAndUid',
      method: 'POST',
      header: {
        'Authorization': token
      },
      success: res => {
        let uid = res.data.data.uid;
        let nickName = res.data.data.nickName;
        let userImage = res.data.data.userImage;
        let intro_user=res.data.data.intro_user;
        wx.setStorage({
          key: 'Uid',
          data: uid
        });
        wx.setStorage({
          key: 'nickname',
          data: nickName
        });
        wx.setStorage({
          key: 'userImage',
          data: userImage
        });
        wx.setStorage({
          key: 'intro_user',
          data: intro_user
        });
        this.globalData.uid = uid;
        this.globalData.nickName = nickName;
        this.globalData.userImage = userImage;
        this.globalData.intro_user = intro_user;
        if (callback) callback();
      }
    });
  },
  
  fetchUserData(callback) {
    const token = wx.getStorageSync('userToken');
    if (!token) {
      console.error('未找到授权 token');
      if (callback) callback('No authorization token found', null);
    } else {
      wx.request({
        url: 'http://localhost:3000/firstPages/items',
        method: 'GET',
        header: {
          'Authorization': token
        },
        success: (res) => {
          if (res.data.code === 200) {
            if (callback) callback(null, res.data.data);
          } else {
            console.error('获取数据失败:', res.data.msg);
            if (callback) callback(res.data.msg, null);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
          if (callback) callback(err, null);
        }
      });
    }
  },

  globalData: {
    requestUrl: 'http://localhost:3000/',
    userInfo: null,
    userLocation: null,
    uid: null,
    userImage: null
  }
});
