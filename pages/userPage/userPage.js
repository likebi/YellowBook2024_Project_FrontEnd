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
    intro_user: '',

    item:[]
  },

  onLoad: function (options) {
    console.log('Options received in onLoad:', options);
    const ContentUid = options.ContentUid;
    console.log('获得的uid:', ContentUid);
    if (ContentUid) {
      this.setData({
        ContentUid: ContentUid
      });
      this.sendUserInfo(ContentUid);
      this.fetchUserData();
    }
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
          ContentNickName: res.data.nickName,
          intro_user: res.data.intro_user
        })
      },
      fail: (err) => {  // 使用箭头函数
        console.log('发送失败', err)
      }
    })    
},

// 使用 wx.request 发送请求
fetchUserData() {
  const token = wx.getStorageSync('userToken'); // 从本地存储中获取 token
  // let Uid = wx.getStorageSync('Uid');
  let Uid = this.data.ContentUid; // 硬编码的 Uid，用于调试或测试
  console.log(Uid);
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