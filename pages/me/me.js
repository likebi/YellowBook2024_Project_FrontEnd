// pages/me/me.js
Page({
  data: {
    userImage: '/static/me.png',
    nickname: 'wechat_user',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    acc_id:"小红书号:123456789",
    follow_num:'0',
    fans_num:'0',
    like_num:'0',
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 136, 250] // 每个标签的左偏移量，需要根据实际情况调整
  },

  onLoad: function() {
    this.getUserInfo(); // 在页面加载时获取用户信息
    this.setData({
      activeTagLeft: this.data.tabPositions[this.data.currentTab]
    });
  },

  onChooseBackground: function () {
    wx.chooseImage({
      count: 1, // 选择图片数量
      sizeType: ['original', 'compressed'], // 图片的尺寸
      sourceType: ['album', 'camera'], // 来源，可以选择相册或相机
      success: (res) => {
        this.setData({
          backgroundImage: res.tempFilePaths[0] // 设置选择的图片路径
        });
        this.saveUserInfo(); // 选择背景后也保存信息
      },
      fail: (err) => {
        console.error(err); // 错误处理
      }
    });
  },

  onChooseAvatar: function () {
    wx.chooseImage({
      count: 1, // 选择图片数量
      sizeType: ['original', 'compressed'], // 图片的尺寸
      sourceType: ['album', 'camera'], // 来源，可以选择相册或相机
      success: (res) => {
        this.setData({
          userImage: res.tempFilePaths[0] // 设置选择的图片路径
        });
        this.saveUserInfo(); // 选择背景后也保存信息
      },
      fail: (err) => {
        console.error(err); // 错误处理
      }
    });
  },


  onChooseNickname(e) {
    console.log(e);
    this.setData({
      nickname: e.detail.value
    });
    this.saveUserInfo();
  },

  saveUserInfo() {
    wx.setStorage({
      key: 'userInfo',
      data: {
        userImage: this.data.userImage,
        nickname: this.data.nickname,
        backgroundImage: this.data.backgroundImage // 也保存背景图片
      }
    });
  },

  getUserInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userImage: res.data.userImage || this.data.userImage, // 默认值
          nickname: res.data.nickname || this.data.nickname, // 默认值
          backgroundImage: res.data.backgroundImage || this.data.backgroundImage // 默认值
        });
      },
      fail: () => {
        console.log('没有找到用户信息');
      }
    });
  },
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    console.log("Switching to tab:", index);
    this.setData({
      currentTab: index,
      activeTagLeft: this.data.tabPositions[index]
    });
  },
  swiperChange(e) {
    const current = e.detail.current;
    console.log("Swiper changed to:", current);
    this.setData({
      currentTab: current,
      activeTagLeft: this.data.tabPositions[current]
    });
  }
});
