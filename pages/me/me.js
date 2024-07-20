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

    items: [
      {
        id: 1,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1xIwmlF2qTdBieTBW7pkFAHaE8?rs=1&pid=ImgDetMain',
        intro: 'SOTO BETAWI 印度尼西亚黄椰汤cdscsdvsvsvsvrvervsrfvsev srvsvsrevs',
        text: "Agus",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        itemImage: 'https://video.cgtn.com/news/2022-09-29/Shanghai-s-Huangpu-River-boosts-economy-in-Yangtze-River-Delta-1dIM1NhfZKM/video/5f46a45b50c2455bbd175b1056c5122f/5f46a45b50c2455bbd175b1056c5122f.jpeg',
        intro: '我的城市',
        text: "真的的上海人",
        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.iACihbLRXkucP2AK7dhGfgHaEK?rs=1&pid=ImgDetMain',
        intro: '北海道冬天温泉市',
        text: "北海道666",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.jXEJdOp1OOMAMi3qB8FpPAHaE8?rs=1&pid=ImgDetMain',
        intro: '马来西亚椰浆饭',
        text: "马来西亚better then SG",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro: '联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.iACihbLRXkucP2AK7dhGfgHaEK?rs=1&pid=ImgDetMain',
        intro: '北海道冬天温泉市',
        text: "北海道666",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.jXEJdOp1OOMAMi3qB8FpPAHaE8?rs=1&pid=ImgDetMain',
        intro: '马来西亚椰浆饭',
        text: "马来西亚better then SG",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro: '联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
    ],
  },

  onLoad: function () {
    this.getUserInfo();
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