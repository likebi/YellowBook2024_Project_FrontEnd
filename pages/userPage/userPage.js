const app = getApp();
Page({

  data: {
    ContentUserAvatar: '',
    ContentNickName: '',
    backgroundImage: "https://youimg1.c-ctrip.com/target/0101c1200061ynv4356C0_D_10000_1200.jpg?proc=autoorient",
    ContentUid: '', // 修改为默认空字符串
    follow_num: '0',
    fans_num: '0',
    like_num: '0',
    currentTab: 0,
    activeTagWidth: 64,
    activeTagLeft: 0,
    tabPositions: [22, 136, 250],
    intro_user: '将用户的头像、昵称、用户 ID 和背最新的信息。的作用是将当前用户的相关信息',
  },

  onLoad: function (options) {
  console.log('Options received in onLoad:', options); // 调试信息
  const ContentUid = options.ContentUid;
  console.log('获得的uid:', ContentUid); // 调试信息
  if (ContentUid) {
    this.setData({
      ContentUid: ContentUid
    });
  }
  this.sendUserInfo(ContentUid)
  this.getUserInfo();
  this.setData({
    activeTagLeft: this.data.tabPositions[this.data.currentTab]
  });
},

  onShow() {
    this.getUserInfo();
  },

  sendUserInfo(ContentUid){
    const token = wx.getStorageSync('userToken');
    wx.request({
      url: 'http://localhost:3000/ContentUserPage/getContentUserUid',
      method: 'POST',
      header: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      data: { ContentUid: ContentUid }, // 发送数据格式调整为对象
      success: (res) => {  // 使用箭头函数
        console.log('发送成功', res.data)
        this.setData({
          ContentUserAvatar: res.data.userAvatar,
          ContentNickName: res.data.nickName
        })
      },
      fail: (err) => {  // 使用箭头函数
        console.log('发送失败', err)
      }
    })    
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

  getUserInfo() {
    this.setData({
      ContentUserAvatar: this.data.ContentUserAvatar,
      ContentNickName: this.data.ContentNickName,
      ContentUid: this.data.ContentUid,
      backgroundImage: this.data.backgroundImage,
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



});