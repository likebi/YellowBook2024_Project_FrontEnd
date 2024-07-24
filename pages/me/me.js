Page({
  "permission": {
    "scope.userInfo": {
      "desc": "获取你的昵称、头像、地区及性别"
    }
  },

  /**
   * Page initial data
   */
  data: {
    userImage: '/static/me.png',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    Uid: '',
    nickname: '',
    follow_num: '0',
    fans_num: '0',
    like_num: '0',
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 136, 250],
    intro_user: 'Bio',

    items: [],
  },

   // 使用 wx.request 发送请求
   fetchUserData() {
    const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
    // let Uid = wx.getStorageSync('Uid');
    let Uid = 9;
    console.log(Uid)
    if (!token) {
      console.error('未找到授权 token');
      return;
    }
      wx.request({
        url: `http://localhost:3000/notes/notes/${Uid}`, // 你的后端 API 地址
        method: 'GET',
        header: {
          'Authorization': token
        },
        success: (res) => {
          if (res.data.code === 200) {
            // 将返回的数据设置到 page 的 items 数据中
            this.setData({
              items: res.data.data
            });
          } else {
            console.error('获取数据失败:', res.data.msg);
          }
        },
        fail: (err) => {
          console.error('请求失败:', err);
        }
      });
    },

  onLoad: function () {
    this.getUserInfo();
    this.fetchUserData();
    this.setData({
      activeTagLeft: this.data.tabPositions[this.data.currentTab]
    });

    // 检查全局数据
    const app = getApp();
    if (app.globalData.uid) {
      this.setData({
        Uid: app.globalData.uid
      });
    } else {
      const uid = wx.getStorageSync('Uid');
      if (uid) {
        this.setData({
          Uid: uid
        });
      }
    }

    if (app.globalData.nickName) {
      this.setData({
        nickname: app.globalData.nickName
      })
    } else {
      const nickname = wx.getStorageSync('nickname');
      if (nickname) {
        this.setData({
          nickname: nickname // Ensure nickname is correctly set
        });
      }
    }
  },
  

  onShow() {
    this.getUserInfo();
  },


  back() {
    this.getUserInfo();
    wx.navigateBack();
  },

  onChooseBackground: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          backgroundImage: res.tempFilePaths[0]
        });
        this.saveUserInfo();
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },

  // 获取用户头像
  onChooseAvatar(e) {
    console.log(e);
    this.setData({
      userImage: e.detail.avatarUrl
    })
    this.saveUserInfo();
  },


  // 选择昵称
  onChooseNickname(e) {
    console.log(e);
    this.setData({
      nickname: e.detail.value
    });
    this.saveUserInfo();
    this.sendNicknameToServer(e.detail.value); // 调用函数发送昵称到服务器
  },

  // 发送昵称到服务器
  sendNicknameToServer(nickname) {
    wx.request({
      url: 'http://localhost:3000/saveNickname', // 替换为你的后端API地址
      method: 'POST',
      data: {
        nickname: nickname,
        Uid: this.data.Uid // 传递用户UID
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('token') // 需要传递的token
      },
      success(res) {
        console.log('Nickname saved successfully:', res);
      },
      fail(err) {
        console.error('Failed to save nickname:', err);
      }
    });
  },

  onChooseBackground: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          backgroundImage: res.tempFilePaths[0]
        });
        this.saveUserInfo();
      },
      fail: (err) => {
        console.error(err);
      }
    });
  },

  saveUserInfo() {
    wx.setStorageSync('userInfo', {
      userImage: this.data.userImage,
      backgroundImage: this.data.backgroundImage,
      nickname: String(this.data.nickname),
      Uid: String(this.data.Uid), // 确保这里的变量名一致
    });
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userImage: userInfo.userImage || this.data.userImage,
      nickname: String(userInfo.nickname || this.data.nickname),
      Uid: String(userInfo.Uid || this.data.Uid), // 修复这里的变量名
      backgroundImage: userInfo.backgroundImage || this.data.backgroundImage,
      intro_user: userInfo.Bio || this.data.intro_user
    });
  },

  navigateToContentPage: function(event) {
    const id = event.currentTarget.dataset.id; // 获取点击的发现内容的ID
  
    if (id) {
      console.log('点击');
      wx.navigateTo({
        url: `/pages/contentpage/contentpage?id=${id}` // 跳转到帖子页面，并传递帖子ID
      });
    } else {
      console.warn('No ID found for clicked discover item.');
    }
  },
  

  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index,
      activeTagLeft: this.data.tabPositions[index]
    });
  },

  swiperChange(e) {
    const current = e.detail.current;
    this.setData({
      currentTab: current,
      activeTagLeft: this.data.tabPositions[current]
    });
  },

  edit_Profile() {
    wx.navigateTo({
      url: '/pages/profile/clickProfile',
    });
  },

  like_post: function (e) {
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    items[index].isLiked = !items[index].isLiked;
    items[index].loveImage = items[index].isLiked ? '../../static/love.png' : '../../static/love2.png';
    this.setData({ items });
  },

})