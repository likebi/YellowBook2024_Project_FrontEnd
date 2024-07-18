Page({
  data: {
    demoText1: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00761-2342.jpg',
    demoText2: 'https://ts1.cn.mm.bing.net/th/id/R-C.eaa5039697cc5ebed12558271a48095d?rik=L9JhhdEYltN9Tg&riu=http%3a%2f%2fwww.ysbx.com%2fuploads%2fallimg%2f1605%2f1_160518203610_1.jpg&ehk=10xg3%2fM7UgmBtVtrWhUNDINGPBlejQoLJb4E9VtbBYI%3d&risl=&pid=ImgRaw&r=0',
    demoText3: 'https://img.zcool.cn/community/01437d5c968523a801208f8b8fb321.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100',
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
    text: "320¥",
    text1: "75¥",
    text2: "550¥",
    text3: "25¥",
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

