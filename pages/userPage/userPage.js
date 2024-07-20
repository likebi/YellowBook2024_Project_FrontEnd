const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    userImage: '/static/me.png',
    nickname: 'wechat_user',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    Uid: app.globalData.uid,
    follow_num: '0',
    fans_num: '0',
    like_num: '0',
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 136, 250],
    intro_user: '将用户的头像、昵称、用户 ID 和背最新的信息。的作用是将当前用户的相关信息',
  },

  onLoad: function () {
    this.getUserInfo();
    this.setData({
      activeTagLeft: this.data.tabPositions[this.data.currentTab]
    });
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

  onChooseAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          userImage: res.tempFilePaths[0]
        });
        this.getUserInfo(); // 确保更新用户信息
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
      nickname: this.data.nickname,
      Uid: this.data.Uid,
    });
  },

  getUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userImage: userInfo.userImage || this.data.userImage,
      nickname: userInfo.nickname || this.data.nickname,
      Uid: userInfo.Uid || this.data.Uid,
      backgroundImage: userInfo.backgroundImage || this.data.backgroundImage,
    });
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
  }
})