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
    isLiked: false,
    // text: "320¥",
    // text1: "75¥",
    // text2: "550¥",
    // text3: "25¥",
    options: [
      { label: '发布', value: '/pages/addpost/addpost' },
      { label: '选项2', value: 'page2' },
      { label: '选项3', value: 'page3' }
    ],
    items: [
      {
        id: 1,
        foodImage:'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1pQjoW.img?w=768&h=486&m=6',
        foodTitle:'方砖厂69号炸酱面',
        foodRating:'4.5',
        foodLocation:'北京东城区长安街1号东方广场',
        fivestarImage:"/static/fivestar.png",
        foodfiveStars:'/static/stars.png',
        text: "75¥",
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        fivestarImage:"/static/fivestar.png",
        isLiked: false,
      },
      {
        id: 2,
        foodImage:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F24d90baf-8ca9-4499-a6b4-0279a855a9d9%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1723773953&t=2c2f8443b504f30f3012ee6a15f5531f',
        foodTitle:'利群烤鸭店',
        foodRating:'4.9',
        foodLocation:'北京市东城区前门东大街11号',
        fivestarImage:"/static/fivestar.png",
        foodfiveStars:'/static/stars.png',
        text: "350¥",
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        fivestarImage:"/static/fivestar.png",
        isLiked: false,
      },
      {
        id: 3,
        foodImage:'https://ts1.cn.mm.bing.net/th/id/R-C.3a0f8edee03958a503f9add7422af7bc?rik=CxZj0ZTWOUGOYg&riu=http%3a%2f%2fimg.hanbaojm.com%2f2018%2f06%2f1645117C15B.png&ehk=mXv6E0PPBUEx%2fnJ0bOSIGo1VAJHSq%2bS2d2aB%2b0wiwdI%3d&risl=&pid=ImgRaw&r=0',
        foodTitle:'老皇帝，内蒙古涮锅',
        foodRating:'4.7',
        foodLocation:'北京市东城区前门东大11号',
        fivestarImage:"/static/fivestar.png",
        foodfiveStars:'/static/stars.png',
        text: "550¥",
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        fivestarImage:"/static/fivestar.png",
        isLiked: false,
      },
      {
        id: 4,
        foodImage:'https://youimg1.c-ctrip.com/target/100i090000003sgbe71EC.jpg',
        foodTitle:'吴裕泰',
        foodRating:'4.9',
        foodLocation:'北京市东城区前门东大街11号',
        fivestarImage:"/static/fivestar.png",
        foodfiveStars:'/static/stars.png',
        text: "45¥",
        loveImage: "../../static/love.png",
        locationImage:"../../static/location.png",
        fivestarImage:"/static/fivestar.png",
        isLiked: false,
      },
    ],
  },

  // Method to navigate to the link
  navigateToLink(event) {
    const url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: `/pages/webpagebeijingfood/webpagebeijingfood?url=${encodeURIComponent(url)}`, 
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

