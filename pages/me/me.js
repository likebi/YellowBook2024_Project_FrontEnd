Page({

  /**
   * Page initial data
   */
  data: {
    userImage: '/static/me.png',
    nickname: 'wechat_user',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    Uid: "123456",
    follow_num: '0',
    fans_num: '0',
    like_num: '0',
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 136, 250],
    intro_user: '将用户的头像、昵称、用户 ID 和背景图存储到本地确保用户在不同页面的操作面可以获取到最新的信息。的作用是将当前用户的相关信息',

    items: [
      {
        id: 1,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.1xIwmlF2qTdBieTBW7pkFAHaE8?rs=1&pid=ImgDetMain',
        intro:'SOTO BETAWI 印度尼西亚黄椰汤',
        text: "Agus",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 2,
        itemImage: 'https://video.cgtn.com/news/2022-09-29/Shanghai-s-Huangpu-River-boosts-economy-in-Yangtze-River-Delta-1dIM1NhfZKM/video/5f46a45b50c2455bbd175b1056c5122f/5f46a45b50c2455bbd175b1056c5122f.jpeg',
        intro:'我的城市',
        text: "真的的上海人",
        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.iACihbLRXkucP2AK7dhGfgHaEK?rs=1&pid=ImgDetMain',
        intro:'北海道冬天温泉市',
        text: "北海道666",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.jXEJdOp1OOMAMi3qB8FpPAHaE8?rs=1&pid=ImgDetMain',
        intro:'马来西亚椰浆饭',
        text: "马来西亚better then SG",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
        text: "迷人的灰太狼",
        loveImage: "../../static/love.png",
        isLiked: false,
      },

      {
        id: 3,
        itemImage: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.iACihbLRXkucP2AK7dhGfgHaEK?rs=1&pid=ImgDetMain',
        intro:'北海道冬天温泉市',
        text: "北海道666",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 4,
        itemImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.jXEJdOp1OOMAMi3qB8FpPAHaE8?rs=1&pid=ImgDetMain',
        intro:'马来西亚椰浆饭',
        text: "马来西亚better then SG",
        loveImage: "../../static/love.png",
        isLiked: false,
      },
      {
        id: 5,
        itemImage: 'https://img14.360buyimg.com/mobilecms/s360x360_jfs/t1/100867/28/30156/133110/668275e8Fac838305/6f1ddab707bbfd08.jpg!q70.dpg.webp',
        intro:'联想（Lenovo）拯救者27英寸2K FastIPS 原生180Hz',
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
  },

  onShow() {
    this.getUserInfo();
  },


  back() {
    this.getUserInfo();
    wx.navigateBack();
  },

  // onChooseBackground: function () {
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: (res) => {
  //       this.setData({
  //         backgroundImage: res.tempFilePaths[0]
  //       });
  //       this.saveUserInfo();
  //     },
  //     fail: (err) => {
  //       console.error(err);
  //     }
  //   });
  // },

   // 获取用户头像
   onChooseAvatar(e) {
    console.log(e);
    this.setData({
      userImage: e.detail.userImage
    })
    this.saveUserInfo();
  },
  // 选择昵称
  onChooseNickname(e) {
    console.log(e);
    this.setData({
      nickname: e.detail.value
    })
    this.saveUserInfo();
  },
  // 存储用户信息
  saveUserInfo() {
    // userInfo
    wx.setStorage({
      key: 'userInfo',
      data: {
        userImage: this.data.userImage,
        nickname: this.data.nickname
      }
    })
  },
  // 获取用户信息
  getUserInfo() {
    console.log(this, '第一行');
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log(that, '函数内');
        that.setData({
          userImages: res.data.userImage,
          nickname: res.data.nickname
        })
      }
      // success: res => {
      //   this.setData({
      //     avatar_url: res.data.avatarUrl,
      //     nickname: res.data.nickName
      //   })
      // }
    })
  },
  

  // onChooseAvatar: function () {
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: (res) => {
  //       this.setData({
  //         userImage: res.tempFilePaths[0]
  //       });
  //       this.saveUserInfo();
  //       this.getUserInfo(); // 确保更新用户信息
  //     },
  //     fail: (err) => {
  //       console.error(err);
  //     }
  //   });
  // },

  // saveUserInfo() {
  //   wx.setStorageSync('userInfo', {
  //     userImage: this.data.userImage,
  //     backgroundImage: this.data.backgroundImage,
  //     nickname: this.data.nickname,
  //     Uid: this.data.Uid,
  //   });
  // },

  // getUserInfo() {
  //   const userInfo = wx.getStorageSync('userInfo') || {};
  //   this.setData({
  //     userImage: userInfo.userImage || this.data.userImage,
  //     nickname: userInfo.nickname || this.data.nickname,
  //     Uid: userInfo.Uid || this.data.Uid,
  //     backgroundImage: userInfo.backgroundImage || this.data.backgroundImage,
  //   });
  // },

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