Page({
  data: {
    demoText1: 'https://dimg04.c-ctrip.com/images/1mc1z12000b7coyqi4C50_W_1080_808_R5_D.jpg',
    demoText2: 'https://dimg04.c-ctrip.com/images/1mc0v12000b2yp9sj245D_W_1080_808_R5_D.jpg',
    demoText3: 'https://dimg04.c-ctrip.com/images/1mc2l12000bhwaqg6F7A9_W_1080_808_R5_D.jpg',
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
    // loveImage: "../../static/love.png",
    isLiked: false,
    // text: "1490¥",
    // text1: "1575¥",
    // text2: "1866¥",
    // text3: "1648¥",
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
      { label: '选项2', value: 'page2' },
      { label: '选项3', value: 'page3' }
    ],
    items: [
      {
        id: 1,
        hotelImage:'https://dimg04.c-ctrip.com/images/1mc1w12000enmdcwd8C74_R_600_400_R5_D.jpg',
        hotelIntroduction:'TRIP MALAYSIA',
        hotelPrice: "1490¥",
        hotelReview:'4.8',
        hotelstarRating:'/static/stars.png',
        hotelfiveStars:"/static/fivestar.png",
        loveImage: "../../static/love.png",
        hotellocationImage:"../../static/location.png",
        hotelDescription:'北京朝阳区华贸中心建国路83号, 100025',
        isLiked: false,
      },
      {
        id: 2,
        hotelImage:'https://dimg04.c-ctrip.com/images/1mc2l12000bhwaqg6F7A9_W_1080_808_R5_D.jpg',
        hotelIntroduction:'北京JW万豪酒店',
        hotelPrice: "1575¥",
        hotelReview:'4.9',
        hotelstarRating:'/static/stars.png',
        hotelfiveStars:"/static/fivestar.png",
        loveImage: "../../static/love.png",
        hotellocationImage:"../../static/location.png",
        hotelDescription:'北京东城区长安街1号东方广场, 100738',
        isLiked: false,
      },
      {
        id: 3,
        hotelImage:'https://dimg04.c-ctrip.com/images/02061120008ha36jg518F_R_600_400_R5_D.jpg',
        hotelIntroduction:'北京丽思卡尔顿酒店',
        hotelPrice: "1866¥",
        hotelReview:'5.0',
        hotelstarRating:'/static/stars.png',
        hotelfiveStars:"/static/fivestar.png",
        loveImage: "../../static/love.png",
        hotellocationImage:"../../static/location.png",
        hotelDescription:'北京朝阳区华贸中心建国路83号, 100025',
        isLiked: false,
      },
      {
        id: 4,
        hotelImage:'https://dimg04.c-ctrip.com/images/02018120008xpt3jmF4C3_W_1080_808_R5_D.jpg',
        hotelIntroduction:'北京JW万豪酒店',
        hotelPrice: "1648¥",
        hotelReview:'4.5',
        hotelstarRating:'/static/stars.png',
        hotelfiveStars:"/static/fivestar.png",
        loveImage: "../../static/love.png",
        hotellocationImage:"../../static/location.png",
        hotelDescription:'北京朝阳区亮马桥路中心路48号, 100125',
        isLiked: false,
      },
    ],
  },

  // Method to navigate to the link
  navigateToLink(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/webpagetripMY/webpagetripMY?url=${encodeURIComponent(url)}`, 
      fail: (err) => {
        console.error('Navigation failed:', err);
      }
    });
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

