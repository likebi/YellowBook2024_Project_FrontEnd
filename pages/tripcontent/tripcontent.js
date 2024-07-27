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
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        isLiked: false,
        tripImage:'https://dimg04.c-ctrip.com/images/100e080000003j0ju8D3A_R_1600_10000.jpg',
        fivestarImage:"/static/fivestar.png",
        locationImage:"../../static/location.png",
        tripName:'八达岭长城',
        tripLocation:'北京市延庆区G6京藏高速',
        tripRating:'5.0',
        tripreviewStar:'/static/stars.png',
        tripPrice: '120¥',
      },
      {
        id: 2,
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        isLiked: false,
        tripImage:'http://djclub.cdn.bcebos.com/uploads/images/pageimg/20230325/64-23032521024M.jpeg',
        fivestarImage:"/static/fivestar.png",
        locationImage:"../../static/location.png",
        tripName:'故宫',
        tripLocation:'北京市延庆区G6京藏高速',
        tripRating:'4.9',
        tripreviewStar:'/static/stars.png',
        tripPrice: '170¥',
      },
      {
        id: 3,
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        isLiked: false,
        tripImage:'https://tse2-mm.cn.bing.net/th/id/OIP-C.x-6vPCUZYjEl725Z5IWx5gHaEk?rs=1&pid=ImgDetMain',
        fivestarImage:"/static/fivestar.png",
        locationImage:"../../static/location.png",
        tripName:'颐和园',
        tripLocation:'北京市延庆区G6京藏高速',
        tripRating:'5.0',
        tripreviewStar:'/static/stars.png',
        tripPrice: '100¥',
      },
      {
        id: 4,
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        isLiked: false,
        tripImage:'https://tse1-mm.cn.bing.net/th/id/OIP-C.MdbWbIBifnwTED-1XcKmcgHaES?rs=1&pid=ImgDetMain',
        fivestarImage:"/static/fivestar.png",
        locationImage:"../../static/location.png",
        tripName:'鸟巢',
        tripLocation:'北京市延庆区G6京藏高速',
        tripRating:'4.5',
        tripreviewStar:'/static/stars.png',
        tripPrice: '50¥',
      },
      
    ],
  },

  // Method to navigate to the link
  navigateToLink(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/webpagebeijingtrip/webpagebeijingtrip?url=${encodeURIComponent(url)}`, 
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