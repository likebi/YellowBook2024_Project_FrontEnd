Page({
  data: {
    demoText1: 'https://dimg04.c-ctrip.com/images/100a0g00000087qb8E7CE_C_1180_462.jpg',
    demoText2: 'https://dimg04.c-ctrip.com/images/0106j120008y7o3hcC541_R_1600_10000.jpg',
    demoText3: 'https://dimg04.c-ctrip.com/images/0100j1200046x94ebB936_R_1600_10000.jpg',
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 500,
    userImage: '/static/me.png',
    nickname: 'wechat_user',
    current: 0,
    Arrow1: "<",
    Arrow2: ">",
    namePosition: "北京",
    dropdownVisible: false,
    fivestarImage:"/static/fivestar.png",
    loveImage: "../../static/love.png",
    locationImage:"../../static/location.png",
    isLiked: false,
    text: "55¥",
    text1: "959¥",
    text2: "120¥",
    text3: "150¥",
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
      { label: '选项2', value: 'page2' },
      { label: '选项3', value: 'page3' }
    ],
    items: [
      {
        id: 1,
        // text: "1490¥",
        // loveImage: "../../static/love.png",
        // locationImage:"../../static/location.png",
        // isLiked: false,
      },
      // {
      //   id: 2,
      //   text: "另一项内容",
      //   loveImage: "../../static/love.png",
      //   isLiked: false,
      // }
    ],
  },


  onOptionSelect(e) {
    const value = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: value
    });
    this.setData({
      dropdownVisible: false
    });
  },
  
  onLoad: function () {
    this.setData({
      background: [this.data.demoText1, this.data.demoText2, this.data.demoText3]
    });
    this.getUserInfo();
  },

  nextImage: function () {
    let currentPageIndex = (this.data.current + 1) % this.data.background.length;
    this.setData({ current: currentPageIndex });
  },

  prevImage: function () {
    let currentPageIndex = (this.data.current - 1 + this.data.background.length) % this.data.background.length;
    this.setData({ current: currentPageIndex });
  },

  like_post: function (e) {
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    items[index].isLiked = !items[index].isLiked;
    items[index].loveImage = items[index].isLiked ? '../../static/love.png' : '../../static/love2.png';

    this.setData({ items });
  },



  getUserInfo() {
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.setData({
          userImage: res.data.userImage,
          nickname: res.data.nickname
        });
      },
      fail: () => {
        console.log('获取用户信息失败');
      }
    });
  },

  saveUserInfo() {
    wx.setStorage({
      key: 'userInfo',
      data: {
        userImage: this.data.userImage,
        nickname: this.data.nickname
      }
    });
  },

  toggleDropdown() {
    this.setData({ dropdownVisible: !this.data.dropdownVisible });
  },

  onOptionSelect(e) {
    const value = e.currentTarget.dataset.value;
    wx.navigateTo({ url: value });
    this.setData({ dropdownVisible: false });
  },
});

